import React, {
  useState,
  useCallback,
  useEffect,
  useRef,
  useMemo,
} from "react";
import { Button, Input, Checkbox } from "antd";
import "./HomePage.scss";
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
const HomePage: React.FC<Props> = (props) => {
  // const [loading, setLoading] = useState(false)
  const [input, setInput] = useState(initWord);
  const [output, setOutput] = useState("请输入");
  const convert = useCallback(() => {}, []);
  return (
    <div className="HomePage">
      <h3>HomePage</h3>
      <Checkbox.Group options={options}></Checkbox.Group>
      <Input value={input} onChange={convert}></Input>
      <h3>{output}</h3>
      <Button type="primary">转换</Button>
    </div>
  );
};

export default HomePage;
