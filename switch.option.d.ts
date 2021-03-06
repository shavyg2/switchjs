export declare type compareFunction<T = any> = (variable: T, caseVariable: any) => Promise<boolean> | boolean;
export interface SwitchOption<T = any> {
    compareFunction: compareFunction<T>;
    allowFall: boolean;
}
