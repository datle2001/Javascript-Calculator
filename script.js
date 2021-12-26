import React from "https://cdn.skypack.dev/react";
import ReactDOM from "https://cdn.skypack.dev/react-dom";

const dict = {
  0: "zero",
  1: "one",
  2: "two",
  3: "three",
  4: "four",
  5: "five",
  6: "six",
  7: "seven",
  8: "eight",
  9: "nine",
  "+": "add",
  "-": "subtract",
  "*": "multiply",
  "/": "divide",
  "=": "equals",
  ".": "decimal",
  Backspace: "clear" };


const Tool = props => {
  return /*#__PURE__*/(
    React.createElement("div", {
      id: props.id,
      className: "button",
      style: {
        width: 50,
        height: 30,
        border: "thin solid",
        textAlign: "center",
        margin: 5,
        fontSize: 20,
        cursor: "pointer",
        transition: "0.5s",
        backgroundColor: "#D0D0D0" } },


    props.text));


};

const Number = props => {
  return /*#__PURE__*/(
    React.createElement("div", {
      id: props.id,
      className: "button",
      style: {
        width: 50,
        height: 50,
        border: "thin solid",
        textAlign: "center",
        lineHeight: 2.5,
        margin: 4,
        fontSize: 20,
        cursor: "pointer",
        transition: "0.5s",
        backgroundColor: "#D0D0D0" } },


    props.text));


};
const Tools = props => {
  return /*#__PURE__*/(
    React.createElement("div", {
      id: "tools",
      style: { display: "flex", marginTop: 20, marginBottom: 20 } }, /*#__PURE__*/

    React.createElement(Tool, { text: "+", id: "add" }), /*#__PURE__*/
    React.createElement(Tool, { text: "-", id: "subtract" }), /*#__PURE__*/
    React.createElement(Tool, { text: "*", id: "multiply" }), /*#__PURE__*/
    React.createElement(Tool, { text: "/", id: "divide" }), /*#__PURE__*/
    React.createElement(Tool, { text: "=", id: "equals" }), /*#__PURE__*/
    React.createElement(Tool, { text: ".", id: "decimal" }), /*#__PURE__*/
    React.createElement(Tool, { text: "CL", id: "clear" })));


};
const Numbers = props => {
  return /*#__PURE__*/(
    React.createElement("div", {
      id: "numbers",
      style: {
        display: "flex",
        flexWrap: "wrap",
        width: 200,
        margin: "auto",
        justifyContent: "center" } }, /*#__PURE__*/


    React.createElement(Number, { text: 7, id: "seven" }), /*#__PURE__*/
    React.createElement(Number, { text: 8, id: "eight" }), /*#__PURE__*/
    React.createElement(Number, { text: 9, id: "nine" }), /*#__PURE__*/
    React.createElement(Number, { text: 4, id: "four" }), /*#__PURE__*/
    React.createElement(Number, { text: 5, id: "five" }), /*#__PURE__*/
    React.createElement(Number, { text: 6, id: "six" }), /*#__PURE__*/
    React.createElement(Number, { text: 1, id: "one" }), /*#__PURE__*/
    React.createElement(Number, { text: 2, id: "two" }), /*#__PURE__*/
    React.createElement(Number, { text: 3, id: "three" }), /*#__PURE__*/
    React.createElement(Number, { text: 0, id: "zero" })));


};
const Display = props => {
  return /*#__PURE__*/(
    React.createElement("div", {
      id: "display",
      style: {
        border: "solid thin",
        width: "90%",
        height: 100,
        margin: "auto",
        fontSize: 30,
        padding: 10,
        textAlign: "right",
        overflow: "auto",
        fontFamily: "monospace",
        backgroundColor: "#ff9f00" } },


    props.formula));


};
function needRound(num) {
  return num.toString().split(".")[1] > 9999;
}
function highlight(btn) {
  btn.style.backgroundColor = "#3E6DC1";
  setTimeout(() => {
    btn.style.backgroundColor = "#D0D0D0";
  }, 500);
}
function invalidDecimal(fm) {
  let i = fm.length - 1;
  while (!isNaN(parseInt(fm.charAt(i))) && i >= 0) {
    i--;
  }
  return fm.charAt(i) === ".";
}

class Calculator extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      formula: "0" };

    this.setFormula = this.setFormula.bind(this);
    this.calculate = this.calculate.bind(this);
    this.handleInput = this.handleInput.bind(this);
  }
  componentDidMount() {
    document.querySelectorAll(".button").forEach(btn => {
      btn.addEventListener("click", () => {
        this.handleInput(btn.innerText);
        highlight(btn);
      });
    });
    document.addEventListener("keydown", key => {
      key.preventDefault();
      key.stopPropagation();
      let k = key.key;
      if (
      k === "+" ||
      k === "-" ||
      k === "*" ||
      k === "/" ||
      k === "." ||
      parseInt(k) ||
      k === "Shift" ||
      k === "=" ||
      k === "Backspace")

      if (k !== "Shift") {
        this.handleInput(k);
        let btn = document.querySelector("#" + dict[k]);
        highlight(btn);
      }
    });
  }
  setFormula(display) {
    this.setState(() => ({
      formula: display }));

  }

  handleInput(text) {
    let display;
    if (
    this.state.formula === "0" && (
    text === "+" || text === "-" || !isNaN(parseFloat(text))))
    {
      display = text;
    } else if (text === "CL" || text === "Backspace") display = "0";else
    if (text === "=") display = this.calculate();else
    if (text === "." && invalidDecimal(this.state.formula)) {
      display = this.state.formula;
    } else display = this.state.formula + text;
    this.setFormula(display);
  }
  calculate() {
    let rgNumber = /(^[+-])?(\d*\.?\d+|\d+\.?\d*)|[+\-*/]/g;
    let numberArray = String(this.state.formula).match(rgNumber);
    let res = parseFloat(numberArray[0]);
    for (let i = 1; i < numberArray.length; i++) {
      let ele = parseFloat(numberArray[i]);
      if (!isNaN(ele)) {
        let prev = numberArray[i - 1];
        switch (prev) {
          case "+":
            res += ele;
            break;
          case "-":
            if (i > 1) {
              switch (numberArray[i - 2]) {
                case "*":
                  res *= -ele;
                  break;
                case "/":
                  res /= -ele;
                  break;
                default:
                  res -= ele;
                  break;}

            } else res -= ele;
            break;
          case "*":
            res *= ele;
            break;
          case "/":
            res /= ele;
            break;
          default:
            alert("something is wrong");
            break;}

      }
      if (isNaN(res)) {
        res = 0;
        alert("invalid expression");
        break;
      }
    }
    return needRound(res) ? res.toFixed(4) : res;
  }
  render() {
    return /*#__PURE__*/(
      React.createElement("div", {
        id: "calculator",
        style: {
          width: 250,
          height: 450,
          border: "solid thin",
          margin: "auto",
          padding: 20,
          backgroundColor: "#000080" } }, /*#__PURE__*/


      React.createElement(Display, { formula: this.state.formula }), /*#__PURE__*/
      React.createElement(Tools, null), /*#__PURE__*/
      React.createElement(Numbers, null)));


  }}

const App = () => {
  return /*#__PURE__*/(
    React.createElement("div", {
      id: "App",
      style: { display: "flex", height: "100vh", backgroundColor: "#3F888F" } }, /*#__PURE__*/

    React.createElement(Calculator, null)));


};

ReactDOM.render( /*#__PURE__*/React.createElement(App, null), document.querySelector("#root"));