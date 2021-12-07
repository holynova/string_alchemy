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
const { saveToFile } = require("./saveToFile");

function cleanString(str) {
  if (typeof str === "string") {
    return str.replace(/\s+/g, "").replace(/笔画\d+/g, "");
  }
  return "";
}

function removeSame(arr) {
  return Array.from(new Set(arr));
}

function getUniqueCharList(str) {
  return removeSame(cleanString(str).split(""));
}

function makeOneDict(charArr = [], withTone = true) {
  let dict = {};
  let notFound = [];
  charArr.forEach((x) => {
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

function printDict(dict) {
  let str = Object.entries(dict)
    .map(([key, value]) => {
      return `"${key}":${JSON.stringify(value)}`;
    })
    .join(",");
  log(`module.exports = {${str}}`);
}

function makeAllDict() {
  const rawDict = { jin, mu, shui, huo, tu, shi, qi, elementPeriodicTable };

  Object.entries(rawDict).forEach(([key, value]) => {
    const fileName = `${key}.js`;
    const { dict, notFound } = makeOneDict(getUniqueCharList(value), true);
    saveToFile({ data: JSON.stringify(dict), fileName });
  });
}

makeAllDict();
