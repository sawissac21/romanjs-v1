declare type value_option = string | number;
/**
 * @class romanjs class : is use to convert numeral to roman numeral
 */
export declare class romanjs {
    private v1;
    private convert_type;
    /**
     * @param v1 Accept { string | number } ,
     * number range 1 to 3999999 ,
     * roman range I to _M_M_M_C_M_X_C_I_XCMXCIX
     */
    constructor(v1?: value_option);
    /**
     * @param v1 Accept { string | number } ,
     * number range 1 to 3999999 ,
     * roman range I to _M_M_M_C_M_X_C_I_XCMXCIX
     */
    setValue(v1?: value_option): this;
    private isNumber;
    private isString;
    private numberBreakDown;
    private detailNumberBreakDown;
    toRoman(): this;
    toNumber(): this;
    result(): any;
}
export {};
