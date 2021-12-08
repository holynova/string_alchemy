import { pinyin } from "pinyin-pro";

interface DictModel {
  [key: string]: string[];
}

export function mergeAllDict(dictList: DictModel[]) {
  return dictList.reduce((pre, cur) => {
    return { ...pre, ...cur };
  }, {});
}

export function convert(inputStr: string, dict: DictModel) {
  let charArr = inputStr.split("").map((x) => {
    let pinyinWithTone = pinyin(x, { toneType: "num" });
    // console.log({ inputStr, pinyinWithTone, dict });

    // 没有找到拼音
    if (pinyinWithTone === x) {
      return [x];
    }

    // 先从同音调的里面找
    if (pinyinWithTone in dict) {
      return dict[pinyinWithTone];
    } else {
      // 再从不同音调里面找
      let pinyin = pinyinWithTone.substr(0, pinyinWithTone.length - 1);
      let toneArr = "01234".split("").map((x) => `${pinyin}${x}`);
      let allMatch: string[] = [];
      toneArr.forEach((tone) => {
        if (tone in dict) {
          allMatch = allMatch.concat(dict[tone]);
        }
      });
      if (allMatch.length > 0) {
        return allMatch;
      } else {
        return [x];
      }
    }
  });

  return charArr;
}

export function convertWithMultiDict(
  inputStr: string,
  dictList: any[]
): string[][] {
  // console.log("convertWithMultiDict", arguments);
  return convert(inputStr, mergeAllDict(dictList));
}
