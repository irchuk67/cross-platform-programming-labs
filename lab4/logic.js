let fs = require("fs");
let path = require("path");

let variables = new Map();


function handleCreate(commandContent) {
    variables.set(commandContent[1], commandContent[2]);
}

function handleAdd(commandContent) {
    if (!commandContent[1] || !commandContent[2]) {
        throw "No variables to add"
    }
    if (isNaN(+commandContent[2])) {
        let var1 = Number(variables.get(commandContent[1]));
        let var2 = Number(variables.get(commandContent[2]));
        var1 = var1 + var2;
        variables.set(commandContent[1], var1.toString());
    } else {
        let var1 = Number(variables.get(commandContent[1]));
        var1 = var1 + +commandContent[2];
        variables.set(commandContent[1], var1.toString());
    }
}

function handleSubtract(commandContent) {
    if (!commandContent[1] || !commandContent[2]) {
        throw "No variables to subtract"
    }
    if (isNaN(+commandContent[2])) {
        let var1 = Number(variables.get(commandContent[1]));
        let var2 = Number(variables.get(commandContent[2]));
        var1 = var1 - var2;
        variables.set(commandContent[1], var1.toString());
    } else {
        let var1 = Number(variables.get(commandContent[1]));
        var1 = var1 - +commandContent[2];
        console.log(var1);
        variables.set(commandContent[1], var1.toString());
    }
}

function handleIncrement(commandContent) {
    if (!commandContent[1]) {
        throw "No variable to increment"
    }
    if (isNaN(+commandContent[1])) {
        let number = Number(variables.get(commandContent[1]));
        variables.set(commandContent[1], (++number).toString())
    }
}

function handlePrint(commandContent){
    if (!commandContent[1]) {
        throw "No variable to print"
    }
    let variable = variables.get(commandContent[1]);
    if (!variable) {
        throw "No value to print"
    }else {
        console.log(variable)
    }
}

function handleJump(commandContent){
    if (!commandContent[1] || !commandContent[2] || !commandContent[3]) {
        throw "No variables to perform"
    }

    let value = variables.get(commandContent[2]);
    if(!value){
        throw "No value for entered variable"
    }
    if (isNaN(+commandContent[3])) {
        let varValue = variables.get(commandContent[3]);
        if(!varValue){
            throw "No value for entered variable"
        }

        if(value !== varValue){
            return +commandContent[1] - 1;
        }
    } else {
        if(value !== commandContent[3]){
            return +commandContent[1] - 1;
        }
    }

}

let filePath = path.join(path.dirname(__filename), 'test_virtual_machine');
let filePath2 = path.join(path.dirname(__filename), 'for_test_VM');
let file = fs.readFileSync(filePath, 'utf-8');
let fileContent = file.split("\n").flatMap(str => str.split('\r')).filter(str => str !== "");
for (let i = 0; i < fileContent.length; i++) {
    let commandClean = fileContent[i].replaceAll(",", "");
    let commandContent = commandClean.split(" ");
    switch (commandContent[0]) {
        case 'Create':
            handleCreate(commandContent);
            break;
        case 'Add':
            handleAdd(commandContent);
            break;
        case 'Subtract':
            handleSubtract(commandContent);
            break;
        case 'Increment':
            handleIncrement(commandContent);
            break;
        case 'Print':
            handlePrint(commandContent);
            break;
        case 'Jump':
            let rowNumber = handleJump(commandContent);
            i = !rowNumber ? i : rowNumber - 1;
            break;

    }
}


module.exports = {handleJump, handleSubtract, handleCreate, handleAdd, handlePrint, handleIncrement, variables}