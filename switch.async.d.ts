import { SwitchOption } from './switch.option';
export declare class SwitchAsync<T> {
    private _default;
    constructor(options?: Partial<SwitchOption>);
    private start();
    _switch: (switch_input: T, switch_case_builder: ((switch_input?: T) => void)) => Promise<void>;
    _case: (switch_compare_input: any, switch_case_block: () => (string | void)) => Promise<void>;
    private switchcaseinput;
    private cases;
    private userCompare;
    private allowFall;
}
