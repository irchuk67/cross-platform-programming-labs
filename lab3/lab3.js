const calculate = require('./build/Release/calculate')

console.log("Result of adding two numbers: " + calculate.add(23, 1));
console.log("Result of adding two strings: " + calculate.add('Mary', 'Pery'));
console.log("Result of multiplying two numbers: " + calculate.multiply(6, 7));
console.log("Result of subtraction of two numbers: " + calculate.subtract(36276, 328723));
console.log("Result of dividing of two numbers: " + calculate.divide(125, 5));

console.log("Result of greeting user with entered name: " + calculate.greeting('Anthony'));