const endian = require('endian-code');
const readline = require("readline");
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

const MAX_SIGNED_INT = 2147483647;
const MIN_SIGNED_INT = -2147483648;

let convertDecimalToBinary = (decimal) => {
    let number = parseInt(decimal);
    return (number >>> 0).toString(2);
}

let binaryToBytesArray = (binaryNumber) => {
    let bigEndianArr = [];
    while(binaryNumber.length < 32){
       binaryNumber = '0' + binaryNumber;
    }
    let string = '';
    for (let j = 0; j < binaryNumber.length; j++) {
        if (j % 8 === 0 && j !== 0) {
            bigEndianArr.push(string);
            string = binaryNumber[j];
        }else if(j === 31){
            string += binaryNumber[j];
            bigEndianArr.push(string)
        }else{
            string += binaryNumber[j];
        }
    }

    return bigEndianArr;
}

let swapEndian = (number) => {
    let numBinary = convertDecimalToBinary(number)
  //  console.log(`Number in binary: ${numBinary}`)
    let bytesArray = binaryToBytesArray(numBinary);
    let otherEndianArray = [];
    //koo
    otherEndianArray = bytesArray.reverse()
    let parsedNumber = parseInt(otherEndianArray.join(''), 2);
    if(parsedNumber > MAX_SIGNED_INT){
        return parsedNumber - MAX_SIGNED_INT + MIN_SIGNED_INT  - 1
    }else {
        return parsedNumber;
    }
}

function mainMy() {
    rl.question("Please, enter a decimal number you want to perform:", function (number) {
        console.log(`Number: ${number}`);

        console.log('\nResults of my own methods work: ');
        let lowEndian = swapEndian(number);
        console.log('LE: ' + lowEndian);

        let bigEndian = swapEndian(lowEndian);
        console.log('BE: ' + bigEndian);

        lowEndian = swapEndian(bigEndian);
        console.log('LE2: ' + lowEndian);

        console.log('\nResults of lib`s methods work: ');
        let lowEndianAuto = endian.encode(parseInt(number), 4, false);
        let lowEndianAutoNum = endian.decode(lowEndianAuto, 4, true);
        console.log('LE: ' + lowEndianAutoNum);

        let bigEndianAuto = endian.encode(lowEndianAutoNum, 4, true);
        let bigEndianAutoNum = endian.decode(bigEndianAuto, 4, false);
        console.log('BE: ' + bigEndianAutoNum);
    });
}

mainMy();

module.exports = {swapEndian}