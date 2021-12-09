import { pinyin } from "pinyin-pro";
import { log } from "../common/utils/debug";

export interface DictModel {
  [key: string]: string[];
}

export function mergeAllDict(dictList: DictModel[]) {
  return dictList.reduce((pre, cur) => {
    // 有两个相同的, 需要将value数组进行concat, 而不是暴力合并
    let res = { ...pre };
    Object.entries(cur).forEach(([key, value]) => {
      // 每个dict实际上是当作module引入进来的, 所以会有个的default的key
      if (key === "default") {
        return;
      }

      if (key in res) {
        res[key] = [...res[key], ...value];
      } else {
        res[key] = value;
      }
    });
    return res;
  }, {});
}

export function convert(inputStr: string, dict: DictModel) {
  let charArr = inputStr.split("").map((x) => {
    let pinyinWithTone = pinyin(x, { toneType: "num" });

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
  return convert(inputStr, mergeAllDict(dictList));
}

// 根据结果进行排列组合
export function getAllCombinations(arr: string[][]) {
  let res: string[] = [];
  let maxLevel = arr.length;
  function loop(str: string, level: number) {
    if (level === maxLevel) {
      res.push(str);
    } else {
      let newStrList = arr[level].map((x) => `${str}${x}`);
      newStrList.forEach((x) => {
        loop(x, level + 1);
      });
    }
  }
  loop("", 0);
  return res;
}
