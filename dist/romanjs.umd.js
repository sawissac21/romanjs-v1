(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
    typeof define === 'function' && define.amd ? define(['exports'], factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global.romanjs = {}));
}(this, (function (exports) { 'use strict';

    function romanList() {
        const roman_letter = [
            "I",
            "II",
            "III",
            "IV",
            "V",
            "VI",
            "VII",
            "VIII",
            "IX",
            "X",
            "XX",
            "XXX",
            "XL",
            "L",
            "LX",
            "LXX",
            "LXXX",
            "XC",
            "C",
            "CC",
            "CCC",
            "CD",
            "D",
            "DC",
            "DCC",
            "DCCC",
            "CM",
            "M",
            "MM",
            "MMM",
            "_I_V",
            "_V",
            "_VM",
            "_VMM",
            "_VMMM",
            "_I_X",
            "_X",
            "_X_X",
            "_X_X_X",
            "_X_L",
            "_L",
            "_L_X",
            "_L_X_X",
            "_L_X_X_X",
            "_X_C",
            "_C",
            "_C_C",
            "_C_C_C",
            "_C_D",
            "_D",
            "_D_C",
            "_D_C_C",
            "_D_C_C_C",
            "_C_M",
            "_M",
            "_M_M",
            "_M_M_M",
        ];
        let temp_value = {
            result: [],
            count: 0,
            number: 1,
            multi: 1,
        };
        for (let i = 0; i < roman_letter.length; i++) {
            const rl = roman_letter[i];
            temp_value.result.push({
                roman: rl,
                number: temp_value.number * temp_value.multi,
            });
            if (temp_value.count == 9) {
                temp_value.multi *= 10;
                temp_value.count = 0;
                temp_value.number = 1;
            }
            temp_value.count++;
            temp_value.number++;
        }
        return temp_value.result;
    }
    /**
     *  Constant variable
     */
    const __UNKNOWN__ = 0;
    const __ROMAN__ = 1;
    const __NUMBER__ = 2;
    const __GENROMAN__ = romanList();
    const __ZERO__ = 0;
    /**
     * @class romanjs class : is use to convert numeral to roman numeral
     */
    class romanjs {
        /**
         * @param v1 Accept { string | number } ,
         * number range 1 to 3999999 ,
         * roman range I to _M_M_M_C_M_X_C_I_XCMXCIX
         */
        constructor(v1 = __ZERO__) {
            this.v1 = v1;
            this.convert_type = __UNKNOWN__;
        }
        /**
         * @param v1 Accept { string | number } ,
         * number range 1 to 3999999 ,
         * roman range I to _M_M_M_C_M_X_C_I_XCMXCIX
         */
        setValue(v1 = __ZERO__) {
            this.v1 = v1;
            this.convert_type = __UNKNOWN__;
            return this;
        }
        isNumber(x) {
            return typeof x === "number";
        }
        isString(x) {
            return typeof x === "string";
        }
        numberBreakDown(v) {
            let num = `${v}`;
            let arr = [];
            for (let i = 0; i < num.length; i++) {
                let breakDownNumber = `${num.charAt(i)}`;
                for (let j = 0; j < num.length - i - 1; j++) {
                    breakDownNumber += "0";
                }
                arr.push(parseInt(breakDownNumber));
            }
            return arr.filter((f) => f != 0);
        }
        detailNumberBreakDown(value) {
            let arr = [];
            for (let i = 1000; i <= value; i += 1000) {
                arr.push(1000);
            }
            return arr;
        }
        toRoman() {
            this.convert_type = __ROMAN__;
            return this;
        }
        toNumber() {
            this.convert_type = __NUMBER__;
            return this;
        }
        result() {
            if (this.convert_type === __ROMAN__) {
                try {
                    if (!this.isNumber(this.v1)) {
                        throw new TypeError("Input can't be String");
                    }
                    else {
                        let rawRomanNumber = [];
                        let result = "";
                        rawRomanNumber = this.numberBreakDown(this.v1).reduce((p, c) => {
                            if (c > 1000 && c < 3999) {
                                p.push(...this.detailNumberBreakDown(c));
                            }
                            else {
                                p.push(c);
                            }
                            return p;
                        }, []);
                        result = rawRomanNumber.reduce((p, c) => {
                            __GENROMAN__.map((a) => {
                                if (a.number == c) {
                                    return (p += a.roman);
                                }
                            });
                            return p;
                        }, "");
                        return result;
                    }
                }
                catch (error) {
                    console.log(error);
                }
            }
            else if (this.convert_type === __NUMBER__) {
                try {
                    if (!this.isString(this.v1)) {
                        throw new TypeError("Input can't be Number Type");
                    }
                    if (this.v1.charAt(1) === "_" && this.v1.length > 1) {
                        throw new TypeError("Dash Format Error : _RomanLetter");
                    }
                    let romanLetter = this.v1;
                    let nonDashValue = __GENROMAN__.filter((a) => a.roman.charAt(0) !== "_");
                    let dashValue = __GENROMAN__
                        .filter((a) => a.roman.charAt(0) === "_")
                        .map((a) => {
                        return {
                            roman: a.roman.replace(/^_/, ""),
                            number: a.number,
                        };
                    });
                    let index = 0;
                    let result = "";
                    let filterList;
                    for (let i = 0; i < 7; i++) {
                        romanLetter.lastIndexOf(",") === -1
                            ? (index = 0)
                            : (index = romanLetter.lastIndexOf(",") + 1);
                        if (romanLetter.charAt(index) === "_") {
                            filterList = dashValue
                                .filter((a) => a.roman.charAt(0) === romanLetter.charAt(index + 1))
                                .map((a) => {
                                return {
                                    roman: `_${a.roman}`,
                                    number: a.number,
                                };
                            });
                            filterList.reverse();
                            filterList.reduce((p, b) => {
                                if (romanLetter.lastIndexOf("-") === -1) {
                                    romanLetter = romanLetter.replace(b.roman, b.number + "-,");
                                }
                                return;
                            }, "");
                            romanLetter = romanLetter.replace("-", ".");
                            result = romanLetter;
                        }
                        else {
                            filterList = nonDashValue.filter((a) => a.roman.charAt(0) === romanLetter.charAt(index));
                            filterList.reverse();
                            filterList.reduce((a, b) => {
                                if (romanLetter.lastIndexOf("-") === -1) {
                                    romanLetter = romanLetter.replace(b.roman, b.number + "-,");
                                }
                                return;
                            }, "");
                            romanLetter = romanLetter.replace("-", ".");
                            result = romanLetter;
                        }
                        if (romanLetter.length - 1 < index) {
                            break;
                        }
                    }
                    result = result.replace(/.,/g, "-");
                    result = result.substr(0, result.length - 1);
                    return result.split("-").reduce((a, b) => {
                        a += parseInt(b);
                        return a;
                    }, 0);
                }
                catch (error) {
                    console.log(error);
                }
            }
        }
    }

    exports.romanjs = romanjs;

    Object.defineProperty(exports, '__esModule', { value: true });

})));
