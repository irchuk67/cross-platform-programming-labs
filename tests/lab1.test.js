const lab1 = require('../lab1/lab_1');
const endian = require('endian-code');

describe('Lab1 test', () => {
    let bigEndianNumbers = [
        6789,
        345,
        123456789,
        786,
        56,
        90,
        23098,
        567899078,
        31,
        16777216
    ];

    let lowEndianNumbers = [
        -2061893632,
        1493237760,
        365779719,
        302186496,
        939524096,
        1509949440,
        978976768,
        -965486303,
        520093696,
        1
    ];

    describe('swap endian (my methods) ', () => {

        test('low endian to big endian', () => {
            for (let i = 0; i < lowEndianNumbers.length; i++) {
                let result = lab1.swapEndian(lowEndianNumbers[i]);
                expect(result).toEqual(bigEndianNumbers[i])
            }
        });

        test('big endian to low endian', () => {
            for (let i = 0; i < bigEndianNumbers.length; i++) {
                let result = lab1.swapEndian(bigEndianNumbers[i]);
                expect(result).toEqual(lowEndianNumbers[i])
            }
        })
    })

    describe('swap endian (library methods)', () =>{
        test('low endian to big endian', () => {
            for (let i = 0; i < lowEndianNumbers.length; i++) {
                let encodedNum = endian.encode(lowEndianNumbers[i], 4, false)
                let result = endian.decode(encodedNum, 4, true)
                expect(result).toEqual(bigEndianNumbers[i])
            }
        });

        test('big endian to low endian', () => {
            for (let i = 0; i < bigEndianNumbers.length; i++) {
                let encodedNum = endian.encode(bigEndianNumbers[i], 4, true)
                let result = endian.decode(encodedNum, 4, false)
                expect(result).toEqual(lowEndianNumbers[i])
            }
        })
    })
})