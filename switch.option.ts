
export interface SwitchOption {

    compareFunction: (variable: any, caseVariable: any) => Promise<boolean> | boolean;

    allowFall: boolean;
}
