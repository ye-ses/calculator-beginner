const app = Vue.createApp({
  data() {
    return {
      hFunctions: [
        { value: "AC", id: "clear", class: "screenFunctions" },
        { value: "DEL", id: "delete", class: "screenFunctions" },
        { value: "%", id: "percentage", class: "operator" },
        { value: "()", id: "brackets", class: "operator" },
        { value: "*", id: "multiplication", class: "operator" },
      ],
      vFunctions: [
        { value: "/", id: "divide", class: "operator" },
        { value: "-", id: "minus", class: "operator" },
        { value: "+", id: "plus", class: "operator" },
        { value: "=", id: "equal", class: "operator" },
      ],
      numbers: [
        { value: "7", id: "", class: "number" },
        { value: "8", id: "", class: "number" },
        { value: "9", id: "", class: "number" },
        { value: "4", id: "", class: "number" },
        { value: "5", id: "", class: "number" },
        { value: "6", id: "", class: "number" },
        { value: "1", id: "", class: "number" },
        { value: "2", id: "", class: "number" },
        { value: "3", id: "", class: "number" },
        { value: "+/-", id: "plusMinus", class: "operator" },
        { value: "0", id: "zero", class: "number" },
        { value: ".", id: "period", class: "number" },
      ],
      textBox: document.querySelector("#textBox"),
      bracket: true,
      period: true,
      showHistory: false,
      answerOn: false,
      history: [],
    };
  },
  methods: {
    toggleHistory() {
      this.showHistory = !this.showHistory;
    },
    clear() {
      textBox.value = "";
      this.period = true;
    },
    delete() {
      textBox.value = textBox.value.substring(0, textBox.value.length - 1);
    },
    switcher(button) { 
      switch (button.class) {
        case "screenFunctions":
          if (button.id === "delete") {
            this.delete();
          } else {
            if (button.id === "clear") {
              this.clear();
            }
          }
          break;
        case "number": 
          this.write(button);
          break;
        case "operator":
          if (textBox.value !== "") {
            if (button.id === "equal") {
              this.evaluate();
            }else{
            if (this.answerOn) { 
              this.answerOn = false;
            }
            this.writeOperator(button);
            this.period = !this.period;
          }}
          break;
        default:
          break;
      }
    },
    writeBrackets() {
      const key = textBox.value.slice(-1);
      textBox.value += bracket ? "*(" : ")";
      this.bracket = !bracket;
    },
    writeOperator(button) {
      const key = textBox.value.slice(-1);
      bracket = this.bracket;
      if (button.value === "()") {
        this.writeBrackets();
      } else {
        if (button.value === "+/-") {
          if (textBox.value == "") {
            textBox.value += "-";
          }
        } else {
          if (
            button.value !== "=" &&
            key !== ")" &&
            key !== "+" &&
            key !== "-" &&
            key !== "/" &&
            key !== "*" &&
            key !== ""
          ) {
            if (button.value === "%") {
              if (key !== "%") {
                textBox.value += button.value;
              }
            } else {
              textBox.value += button.value;
            }
          }
        }
      }
    },
    write(button) { 
      if (this.answerOn) { 
        this.clear();
        this.answerOn = false;
      }
      if (button.id !== "period") {
        textBox.value += button.value;
      } else {
        if (this.period) {
          textBox.value += button.value;
          this.period = !this.period;
        }
      } 
    },
    toggleBrackets() {
      const value = bracket ? "(" : ")";
      textBox.value += value;
      bracket = !bracket;
    },
    evaluate() {
      const expression = textBox.value;
      this.clear();
      const answer = math.evaluate(expression);
      const r = math.round(answer * 1000000000) / 1000000000;
      const hist = expression + " = " + r;
      if (this.history.length >= 5) {
        this.history.shift();
        this.history.push(hist);
      } else {
        this.history.push(hist);
      }
      textBox.value += r;
      this.answerOn = true;   
    },
  },
});
app.mount("#vue");
