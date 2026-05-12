const fs = require("fs");
const superagent = require("superagent");

if (!fs.existsSync("./out")) fs.mkdirSync("out");

async function getGoogleKey() {
  const url = await new Promise((resolve, reject) => {
    superagent
      .get(
        "https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit"
      )
      .end((err, res) => {
        if (err) return reject(err);
        const startIdx = res.text.indexOf("_loadJs(");
        if (startIdx === -1) return reject(new Error("startIdx = -1"));
        const endIdx = res.text.indexOf(");", startIdx);
        if (endIdx === -1) return reject(new Error("endIdx = -1"));
        try {
          resolve(eval(res.text.slice(startIdx + "_loadJs(".length, endIdx)));
        } catch (e) {
          reject(e);
        }
      });
  });

  return await new Promise((resolve, reject) => {
    superagent.get(url).end((err, res) => {
      if (err) return reject(err);
      resolve(res.text.match(/(key:")(\w+)/)[2]);
    });
  });
}

async function getSupportedLanguages(lang, key) {
  return await new Promise((resolve, reject) => {
    const url = `https://translate-pa.googleapis.com/v1/supportedLanguages?client=te&display_language=${lang}&key=${key}&callback=callback`;
    superagent.get(url).end((err, res) => {
      function callback(langs) {
        resolve(langs);
      }
      if (err) return reject(err);
      resolve(eval(res.text));
    });
  });
}

async function getLanguages(lang, key) {
  const result = await getSupportedLanguages(lang, key);
  const langs = {};

  for (const entry of result.targetLanguages) {
    if (lang.split("-")[0] === "fr") {
      entry.name = entry.name.toLowerCase();
    }
    if (entry.language === "iw") {
      entry.language = "he";
    } else if (entry.language === "jw") {
      entry.language = "jv";
    } else if (entry.language === "fa-AF") {
      entry.language = "prs";
    }
    langs[entry.language] = entry.name;
  }

  return langs;
}

async function init() {
  const lang_codes = [
    "af", "ar", "bg", "bn", "ca", "cs", "da", "de", "el", "en",
    "es", "fa", "fi", "fr", "he", "hi", "hr", "hu", "is", "it",
    "ja", "kaa", "ko", "lv", "nl", "no", "pl", "pt-BR", "pt-PT",
    "ro", "ru", "sat", "sl", "sr", "sv", "ta", "th", "tr", "ug",
    "uk", "vi", "zh-CN", "zh-TW",
  ];

  if (process.argv[2] === "--google") {
    const langs = {};
    const key = await getGoogleKey();
    for (const code of lang_codes) {
      langs[code] = await getLanguages(code, key);
    }
    fs.writeFileSync(
      "./out/google.json",
      JSON.stringify(langs, null, 4),
      "utf-8"
    );
  }

  if (process.argv[2] === "--info") {
    const google = JSON.parse(fs.readFileSync("./out/google.json", "utf8"));
    const info = {};
    info.supportedLanguages = Object.keys(google["en"]);
    info.supportedCount = info.supportedLanguages.length;
    fs.writeFileSync(
      "./out/info.json",
      JSON.stringify(info, null, 2),
      "utf-8"
    );
  }

  if (process.argv[2] === "--final") {
    const google = JSON.parse(fs.readFileSync("./out/google.json", "utf8"));
    const final_result = {};
    lang_codes.forEach((ui_lang) => {
      final_result[ui_lang] = google[ui_lang];
    });
    fs.writeFileSync(
      "./out/final.json",
      JSON.stringify(final_result, null, 2),
      "utf-8"
    );
  }
}

init();
