import React, {
  useState,
  useCallback,
  useEffect,
  useRef,
  useMemo,
} from "react";
// import { Button, Input, Checkbox } from "antd";
// import { List } from "antd-mobile";
import Input from "antd-mobile/es/components/input";
import Selector from "antd-mobile/es/components/selector";
import Button from "antd-mobile/es/components/button";
import List from "antd-mobile/es/components/list";

import * as rand from "../common/utils/rand";

import { convert, convertWithMultiDict } from "./main";
import DebugPanel from "../common/components/DebugPanel";
import { log } from "../common/utils/debug";

import "./HomePage.scss";

import {
  jin,
  mu,
  shui,
  huo,
  tu,
  shi,
  qi,
  elementPeriodicTable,
} from "../common/tools/output/index";

// import elementPeriodicTable from "../common/tools/output/elementPeriodicTable.js";
// import jin from "../common/tools/output/jin.js";
// import mu from "../common/tools/output/mu.js";
// import shui from "../common/tools/output/shui.js";
// import huo from "../common/tools/output/huo.js";
// import tu from "../common/tools/output/tu.js";
// import shi from "../common/tools/output/shi.js";
// import qi from "../common/tools/output/qi.js";

// import  {log} from ''
interface Props {}
const initWord = "刘庸干净又卫生";
const options = [
  { label: "元素周期表", value: "elementPeriodicTable" },
  { label: "金", value: "jin" },
  { label: "木", value: "mu" },
  { label: "水", value: "shui" },
  { label: "火", value: "huo" },
  { label: "土", value: "tu" },
  { label: "石", value: "shi" },
  { label: "气", value: "qi" },
];

const findDict = (dictName: string): object => {
  const nameMap: { [key: string]: string[] } = {
    elementPeriodicTable,
    jin,
    mu,
    shui,
    huo,
    tu,
    shi,
    qi,
  };
  return nameMap[dictName] || {};
};

const getResult = (inputStr: string, dictNames: string[]): string[][] => {
  return convertWithMultiDict(inputStr, dictNames.map(findDict));
};

function getResult1({ inputStr = "", dictNames = [] }) {
  return convertWithMultiDict(inputStr, dictNames.map(findDict));

  // let promiseList = dictNames.map(
  //   (name) => import("../common/tools/output/" + name + ".js")
  // );

  // return Promise.all(promiseList)
  //   .then((arr) => {
  //     // 合并
  //     return arr.reduce((pre, cur, index) => {
  //       return { ...pre, ...cur };
  //     }, {});
  //   })
  //   .then((fullDict) => {
  //     let res = convert(inputStr, fullDict);
  //     log("convert result", res);
  //   })
  //   .catch((e) => {
  //     console.log(e);
  //     // log("error", e);
  //   });
}

const HomePage: React.FC<Props> = (props) => {
  // const [loading, setLoading] = useState(false)
  const [input, setInput] = useState(initWord);
  const [output, setOutput] = useState("请输入");
  const [results, setResults] = useState(["请输入"]);
  const [dictNames, setDictNames] = useState<string[]>([
    "elementPeriodicTable",
  ]);

  const convert = useCallback(() => {
    let res = getResult(input, dictNames);
    let lengthList = res.map((x) => x.length);
    let solutionCount = lengthList.reduce((p, c) => p * c, 1);
    const pickOne = () => {
      return res
        .map((x) => {
          return rand.choose(x);
        })
        .join("");
    };
    let count = solutionCount > 5 ? 5 : solutionCount;
    let resultList = [];
    for (let i = 0; i < count; i++) {
      resultList.push(pickOne());
    }
    // let resultList = new Array(count).fill("").map((_) => pickOne());
    console.log("lengthList", lengthList);

    setOutput(res.map((x) => x[0]).join(""));
    setResults(resultList);
  }, [input, dictNames]);

  useEffect(() => {
    convert();
  }, [convert]);

  return (
    <div className="HomePage">
      <h1>弹幕附魔器</h1>
      <List
        style={{
          "--prefix-width": "6em",
        }}
      >
        <List.Item title="原文字">
          <Input
            placeholder="请输入内容"
            clearable
            value={input}
            onChange={setInput}
            // onChange={(e) => setInput(e.target.value)}
          ></Input>
        </List.Item>
        <List.Item title="魔法书">
          <Selector
            multiple
            value={dictNames}
            options={options}
            onChange={(values) => setDictNames(values as string[])}
          ></Selector>
        </List.Item>
        <List.Item title="转换后">{/* <h3>{output}</h3> */}</List.Item>
      </List>
      {/* <hr /> */}
      <List
        style={{
          "--prefix-width": "6em",
        }}
      >
        {results.map((x, i) => {
          return <List.Item key={i}>{x}</List.Item>;
        })}
      </List>

      {/* <Button type="primary">转换</Button> */}

      {/* <DebugPanel data={{ input, output, results }}></DebugPanel> */}
    </div>
  );
};

export default HomePage;
