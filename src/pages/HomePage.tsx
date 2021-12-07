import React, {
  useState,
  useCallback,
  useEffect,
  useRef,
  useMemo,
} from "react";
import { Button, Input, Checkbox } from "antd";
import "./HomePage.scss";
import { convert, convertWithMultiDict } from "./main";
import DebugPanel from "../common/components/DebugPanel";
import { log } from "../common/utils/debug";

import elementPeriodicTable from "../common/tools/output/elementPeriodicTable";
import jin from "../common/tools/output/jin";
import mu from "../common/tools/output/mu";
import shui from "../common/tools/output/shui";
import huo from "../common/tools/output/huo";
import tu from "../common/tools/output/tu";
import shi from "../common/tools/output/shi";
import qi from "../common/tools/output/qi";
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

const findDict = (dictName: string) => {
  const nameMap = {
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

function getResult({ inputStr = "", dictNames = [] }) {
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
  const [dictNames, setDictNames] = useState(["elementPeriodicTable"]);

  const convert = useCallback(() => {
    log("convert");
    let res = getResult({ inputStr: input, dictNames });

    setOutput(res.map((x) => x[0]).join(""));
  }, [input, dictNames]);

  useEffect(() => {
    convert();
  }, [convert]);

  return (
    <div className="HomePage">
      <h3>HomePage</h3>
      <Checkbox.Group
        value={dictNames}
        options={options}
        onChange={(values) => setDictNames(values)}
      ></Checkbox.Group>

      <Input value={input} onChange={(e) => setInput(e.target.value)}></Input>
      <h3>{output}</h3>
      <Button type="primary">转换</Button>

      <DebugPanel data={{ input, output, dictNames }}></DebugPanel>
    </div>
  );
};

export default HomePage;
