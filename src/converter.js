const { pinyin } = require("pinyin-pro");
const fullDict = require("./dict/fullDict");
const elementDict = require("./dict/elementDict");
const simpleDict = require("./dict/simpleDict");

function convert(string, dict = {}) {
  let charArr = string.split("").map((x) => {
    let pinyinWithTone = pinyin(x, { toneType: "num" });
    // 没有找到拼音
    if (pinyinWithTone === x) {
      return x;
    }

    // 先从同音的里面找
    if (pinyinWithTone in dict) {
      let found = dict[pinyinWithTone];
      if (found.length === 1) {
        return found[0];
      } else {
        // 找到了多个
        return found;
        // return `(${found.join("|")})`;
      }
    } else {
      // 再从不同音里面找
      let pinyin = pinyinWithTone.substr(0, pinyinWithTone.length - 1);
      let toneArr = "01234".split("").map((x) => `${pinyin}${x}`);
      let allMatch = [];
      toneArr.forEach((tone) => {
        if (tone in dict) {
          allMatch = allMatch.concat(dict[tone]);
        }
      });
      if (allMatch.length > 0) {
        // return `(${allMatch.join("|")})`;
        return allMatch;
      } else {
        return x;
      }
    }
  });

  return charArr;
}

function test() {
  let input = "老小子, 芦荟汁, 玛莎拉, 干净又卫生";
  // console.log({ in: input, out: convert(input, fullDict) });
  console.log({ in: input, out: convert(input, simpleDict) });
  // console.log({ in: input, out: convert(input, elementDict) });
}

test();
