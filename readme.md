# 弹幕附魔

将普通文字转换为同音的化学元素文字，用于制作带元素符号趣味的短句。

<p align="center">
  <img src="assets/readme/hero.svg" width="100%" alt="弹幕附魔: 将普通文字转换为同音的化学元素文字，用于制作带元素符号趣味的短句。">
</p>


## 网址
http://xiaosang.net/string_alchemy/

![普通短句转换成同音元素文字的示例](pics/liuyong3.png)




## 灵感
b站up主: 刘庸干净又卫生

![灵感来源示例一](pics/liuyong1.png)
![灵感来源示例二](pics/liuyong2.png)

## 本地运行

```bash
npm install
npm run dev
```

打开 Vite 输出的本地地址。生产构建使用 `npm run build`；构建后用 `npm run serve` 预览。

## 实现入口

[src/](src/) 保存前端源码；项目使用 React、Vite 和 `pinyin-pro`。转换以读音匹配为基础，结果用于文字创作。
