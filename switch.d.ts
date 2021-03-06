import { SwitchOption } from './switch.option';
export declare class Switch<T> {
    private switchcaseinput;
    private cases;
    private userCompare;
    private allowFall;
    private _default;
    constructor(options?: Partial<SwitchOption<T>>);
    private start();
    _switch: (switch_input: T, switch_case_builder: ((switch_input?: T) => void)) => void;
    _case: (switch_compare_input: any, switch_case_block: () => (string | void)) => void;
}
