
# endian-code
Copyright (C) 2018 Emre Tapci.  
NodeJS module for encoding and decoding numbers of given size in big and little endian.  
https://github.com/emretapci/endian-code

## install
```
npm install --save endian-code
```

## API
```
const endianCode = require('endian-code');

/*
 encode() params:
  n: number to be encoded
  size: number's size in bytes
  bigEndian: true for big endian, false for little endian
*/
console.log(endianCode.encode(0x1234, 2, true).map(x => x.toString(16))); //outputs [ '12', '34' ]
console.log(endianCode.encode(0x1234, 4, true).map(x => x.toString(16))); //outputs [ '0', '0', '12', '34' ]
console.log(endianCode.encode(0x1234, 8, true).map(x => x.toString(16))); //outputs [ '0', '0', '0', '0', '0', '0', '12', '34' ]

console.log(endianCode.encode(0x1234, 2, false).map(x => x.toString(16))); //outputs [ '34', '12' ]
console.log(endianCode.encode(0x1234, 4, false).map(x => x.toString(16))); //outputs [ '34', '12', '0', '0' ]
console.log(endianCode.encode(0x1234, 8, false).map(x => x.toString(16))); //outputs [ '34', '12', '0', '0', '0', '0', '0', '0' ]


/*
 decode() params:
  array: array or buffer to be decoded
  size: number's size in bytes
  bigEndian: true for big endian, false for little endian
*/
console.log(endianCode.decode([0x12, 0x34], 2, true).toString(16)); //outputs 1234
console.log(endianCode.decode([0x12, 0x34], 4, true).toString(16)); //outputs 12340000
console.log(endianCode.decode([0x12, 0x34], 8, true).toString(16)); //outputs 1234000000000000

console.log(endianCode.decode([0x34, 0x12], 2, false).toString(16)); //outputs 1234
console.log(endianCode.decode([0x34, 0x12], 4, false).toString(16)); //outputs 1234
console.log(endianCode.decode([0x34, 0x12], 8, false).toString(16)); //outputs 1234
```