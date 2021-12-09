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
import Toast from "antd-mobile/es/components/toast";

// @ts-ignore
import { CopyToClipboard } from "react-copy-to-clipboard";

import * as rand from "../common/utils/rand";

import { convert, convertWithMultiDict, getAllCombinations } from "./main";
import DebugPanel from "../common/components/DebugPanel";
import { log } from "../common/utils/debug";

import "./HomePage.scss";

const dictModules = import.meta.glob("../common/dict/*.json");
export interface DictModel {
  [key: string]: string[];
}

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

const loadChosenDicts = (names: string[]) => {
  let pList = names.map((x) => {
    let fullName = `../common/dict/${x}.json`;
    return dictModules[fullName]();
  });
  return Promise.all(pList);
};

const HomePage: React.FC<Props> = (props) => {
  // const [loading, setLoading] = useState(false)
  const [input, setInput] = useState(initWord);
  const [output, setOutput] = useState("请输入");
  const [results, setResults] = useState(["请输入"]);
  const [dictNames, setDictNames] = useState<string[]>([
    "elementPeriodicTable",
    "jin",
    // "shi",
    "qi",
  ]);

  const convert = useCallback(() => {
    loadChosenDicts(dictNames)
      .then((dicts) => {
        let strArr = convertWithMultiDict(input, dicts);
        let solutions = getAllCombinations(strArr);
        let limit = 5;
        let limitSolutions = rand.shuffle(solutions).slice(0, limit);
        setResults(limitSolutions);
      })
      .catch((e) => {
        Toast.show("魔法书加载失败");
        console.log("魔法书加载失败", e);
      });
  }, [input, dictNames]);

  useEffect(() => {
    convert();
  }, [convert]);

  return (
    <div className="HomePage">
      <div className="main-title">弹幕附魔</div>
      <List
        style={{
          "--prefix-width": "6em",
        }}
      >
        <List.Item title="请输入">
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
            columns={3}
            multiple
            value={dictNames}
            options={options}
            onChange={(values) => setDictNames(values as string[])}
          ></Selector>
        </List.Item>
        <List.Item title="附魔后">{/* <h3>{output}</h3> */}</List.Item>
      </List>
      <Button block color="primary" onClick={convert}>
        重新附魔
      </Button>
      <List
        style={{
          "--prefix-width": "6em",
        }}
      >
        {results.map((x, i) => {
          return (
            <List.Item key={i}>
              <CopyToClipboard
                text={x}
                onCopy={() => {
                  Toast.show("已复制:" + x);
                }}
              >
                <div className="result-item">
                  {x}
                  <span className="copy-button">复制</span>
                </div>
              </CopyToClipboard>
            </List.Item>
          );
        })}
      </List>

      <div className="author">
        <p>作者: holynova</p>
        <a href="https://github.com/holynova/string_alchemy">
          <p>Fork me on Github</p>
        </a>
      </div>
      {/* <Button type="primary">转换</Button> */}

      {/* <DebugPanel data={{ input, output, results }}></DebugPanel> */}
    </div>
  );
};

export default HomePage;
