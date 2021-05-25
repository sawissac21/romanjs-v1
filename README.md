# Romanjs-v1
This library can convert your number 1, 2, 3 to roman numeral I, II, III within the range 1 to 3000000.
Included file minified file,non minified file and source file (Typescript included)

### Supported Modules
The library contain both
- ESM (EcmaScript modules)
- UMD (Universal Module Definition)

# Usage
### Availiable Method
Method | Description | Return
------------ | ------------- | -------------
setValue(...) | Accept number and roman numeral | void
toRoman() | Use to change type | void
toNumber() | Use to change type | void
result() | Use to get output or result | string,number

### UMD
```javascript
let { romanjs } = window.romanjs;
let r = new romanjs(244);

//Convert Number to Roman
let result = r.toRoman().result();// result => CCXLIV

//instance of writing in constructor you can use setValue(...) method.
let result = r.setValue(244).toRoman().result();// result => CCXLIV

//Convert Roman to Number
let result = r.setValue("CCXLIV").toRoman().result();// result => 244
```
### ESM
```javascript
import { romanjs } from "../dist/romanjs.esm.min.js";
let r = new romanjs();

//Convert Number to Roman
let result = r.toRoman().result();// result => CCXLIV

//Convert Roman to Number
let result = r.setValue("CCXLIV").toRoman().result();// result => 244
```
# Files location 
### Demo file
- public (folder)
  - index.html
### Javascript file
- dist (folder)
  - romanjs.esm.js
  - romanjs.esm.min.js
  - romanjs.umd.js
  - romanjs.umd.min.js
### Source JS and TS file
- src (folder)
  - romanjs.js
  - romanjs.ts
# Follow Me 😜
Github [Follow](https://github.com/IssacMM6)

