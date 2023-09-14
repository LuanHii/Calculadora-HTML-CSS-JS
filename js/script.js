const previusOperationText = document.querySelector("#previus-operation")
const currentOperationText = document.querySelector("#current-operation")
const buttons = document.querySelectorAll("#buttons-container button")

class Calculator {
    constructor(previusOperationText,currentOperationText){
        this.previusOperationText = previusOperationText
        this.currentOperationText = currentOperationText
        this.currentOperation = ""
    }

    addDigit(digit){
        if(digit === "." && this.currentOperationText.innerText.includes(".")){
            return;
        }

        this.currentOperation = digit
        this.updateScreen()
    }

    updateScreen(
        operationValue = null, 
        operation = null, 
        current = null,
        previus = null 
        ){
            console.log(operationValue,operation,current,previus)
        if(operationValue == null) {
            this.currentOperationText.innerText += this.currentOperation;
        } else {
            if (previus === 0){
                operationValue = current
            }

            this.previusOperationText.innerText = `${operationValue} ${operation}`
            this.currentOperationText.innerText = "";
        }

    }

    changeOperation(operation) {
        const mathOperations = ["*", "/","+","-"]

        if (!mathOperations.includes(operation)){
            return
        }

        this.previusOperationText.innerText = this.previusOperationText.innerText.slice(0,-1) + operation;
    }

    processDelOperator() {
        this.currentOperationText.innerText = this.currentOperationText.innerText.slice(0, -1);
        
    }

    processClearCurrentOperation(){
        this.currentOperationText.innerText = ""
    }

    processClear(){
        this.currentOperationText.innerText = "";
        this.previusOperationText.innerText = "";
    }

    processEqualOperator(){
        const operation = previusOperationText.innerText.split(" ")[1]
        this.processOperation(operation)
        currentOperationText.innerText = previusOperationText.innerText.split(" ")[0]
        previusOperationText.innerText = ""
    }

    processOperation(operation){
        if(this.currentOperationText.innerText == "" && operation !== "C"){
            if(this.previusOperationText !== ""){
                this.changeOperation(operation)
            }
            return
        }


        let operationValue
        const previus = +this.previusOperationText.innerText.split(" ")[0]
        const current = +this.currentOperationText.innerText

        switch(operation){
            case "+":
                operationValue = previus + current
                this.updateScreen(operationValue,operation,current,previus)
                break

            case "-":
                operationValue = previus - current
                this.updateScreen(operationValue,operation,current,previus)
                break
                
            case "*":
                operationValue = previus * current
                this.updateScreen(operationValue,operation,current,previus)
                break

            case "/":
                operationValue = previus / current
                this.updateScreen(operationValue,operation,current,previus)
                break

            case "DEL":
                this.processDelOperator();
                
                break

            case "CE":
                this.processClearCurrentOperation();
                
                break

            case "C":
                this.processClear();
                
                break

            case "=":
                this.processEqualOperator()
                
                break
            default:
                return
        }
    }
    
    
}


const calc = new Calculator(previusOperationText, currentOperationText)

buttons.forEach((btn) => {
    btn.addEventListener("click", (e) => {
        const value = e.target.innerText;
        
        if (+value >= 0 || value === ".") {
            calc.addDigit(value)
        } else {
            calc.processOperation(value)
        }
    })
})