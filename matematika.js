function MathExerciser(operation, operator, minOperand1, maxOperand1, minOperand2, maxOperand2, orderOperands) {
    this.operation = operation;
    this.operator = operator
    this.minOperand1 = minOperand1;
    this.maxOperand1 = maxOperand1;
    this.minOperand2 = minOperand2;
    this.maxOperand2 = maxOperand2;
    this.orderOperands = orderOperands;
    this.successCounter = 0;
    this.errorCounter = 0;
    this.sucessMessages = ["sound-dobre-ty", "sound-hezky"];
    this.operand1 = 0;
    this.operand2 = 0;
    this.result = "";
    this.mistakeMade = false;
}

MathExerciser.prototype.startExercise = function() {
    this.mistakeMade = false;
    this.result = "";
    this.operand1 = Math.floor(Math.random() * (this.maxOperand1 - this.minOperand1 + 1) + this.minOperand1);
    this.operand2 = Math.floor(Math.random() * (this.maxOperand2 - this.minOperand2 + 1) + this.minOperand2);
    if (this.orderOperands) {
        if (this.operand2 > this.operand1) {
            var tmp = this.operand2;
            this.operand2 = this.operand1;
            this.operand1 = tmp;
        }
    }
    
    document.getElementById("result").innerHTML = "";
    document.getElementById("operator").innerHTML = this.operator;
    document.getElementById("operand1").innerHTML = this.operand1;
    document.getElementById("operand2").innerHTML = this.operand2;
}

MathExerciser.prototype.enterDigit = function(digit) {
    this.result += digit;
    document.getElementById("result").innerHTML = this.result;
}

MathExerciser.prototype.clearLastDigit = function() {
    this.result = this.result.slice(0, -1);
    document.getElementById("result").innerHTML = this.result;
}

MathExerciser.prototype.clearAllDigits = function() {
    this.result = "";
    document.getElementById("result").innerHTML = this.result;
}

MathExerciser.prototype.checkResult = function() {
    if (this.operation(this.operand1, this.operand2) === parseInt(this.result)) {
        var exerciseNode = document.createElement("div");
        if (this.mistakeMade) { exerciseNode.className = "with-mistake"; }
        exerciseNode.innerHTML = this.operand1 + " " + this.operator + " " + this.operand2 + " = " + this.operation(this.operand1, this.operand2);
        var exercisesNode = document.getElementById("exercises");
        exercisesNode.insertBefore(exerciseNode, exercisesNode.firstChild);
        this.successCounter += 1;
        var soundName = this.sucessMessages[Math.floor(Math.random() * 2)];
        document.getElementById(soundName).play();
        this.startExercise();
    } else {
        this.errorCounter += 1;
        this.mistakeMade = true;
        this.result = "";
        document.getElementById("result").innerHTML = this.result;
        document.getElementById("sound-zkus-to-znovu").play();
    }
    this.updateCounters();
}

MathExerciser.prototype.updateCounters = function() {
    document.getElementById("success-counter").innerHTML = this.successCounter;
    document.getElementById("error-counter").innerHTML = this.errorCounter;
}
