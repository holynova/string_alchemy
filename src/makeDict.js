const {
  jin,
  mu,
  shui,
  huo,
  tu,
  shi,
  qi,
  elementPeriodicTable,
} = require("./raw");
const log = console.log.bind(console);

// const pinyin = require("ipinyinjs");
const { pinyin } = require("pinyin-pro");
// import { jin, mu, shui, huo, tu, shi, qi } from "./raw";

function cleanString(str) {
  if (typeof str === "string") {
    return str.replace(/\s+/g, "").replace(/笔画\d+/g, "");
  }
  return "";
}

function removeSame(arr) {
  return Array.from(new Set(arr));
}
function makeDict(raw) {
  // const raw = { jin, mu, shui, huo, tu, shi, qi, elementPeriodicTable };
  let all = Object.values(raw)
    .map((x) => cleanString(x))
    .join("")
    .split("");
  let allUnique = removeSame(all);

  // log({ l1: all.length, l2: allUnique.length });

  // const dict = {};
  // let notFound = [];

  function make(withTone = true) {
    let dict = {};
    let notFound = [];
    allUnique.forEach((x) => {
      let key = pinyin(x, { toneType: withTone ? "num" : "none" });
      if (key !== x) {
        if (key in dict) {
          dict[key].push(x);
        } else {
          dict[key] = [x];
        }
      } else {
        notFound.push(x);
      }
    });
    return { dict, notFound };
  }

  let { dict, notFound } = make(true);

  function printDict() {
    let str = Object.entries(dict)
      .map(([key, value]) => {
        return `"${key}":${JSON.stringify(value)}`;
      })
      .join(",");
    log(`module.exports = {${str}}`);
  }

  printDict();
}

// log(pinyin);
// makeDict({
//   jin,
//   mu,
//   shui,
//   huo,
//   tu,
//   shi,
//   qi,
//   elementPeriodicTable,
// });

makeDict({
  elementPeriodicTable,
});

// makeDict({
//   jin,
//   shi,
//   qi,
//   elementPeriodicTable,
// });
