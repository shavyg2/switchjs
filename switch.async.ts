import { SwitchOption } from './switch.option';

async function PRE_USER_SWITCH_BLOCK(block: any, ...args: any[]) {
    return block(...args);
}


async function PRE_USER_SWITCH_CASE(block: any, ...args: any[]) {
    return block(...args);
}



//Sync Version

export class SwitchAsync<T> {


    private _default: any;

    constructor(options: Partial<SwitchOption<T>> = {}) {

        const { allowFall, compareFunction } = options;
        this.allowFall = allowFall;


        //don't trust em
        this.userCompare = compareFunction;
        this._switch = async (switch_input: T, switch_case_builder: (switch_input?: T) => void) => {
            this.switchcaseinput = switch_input;

            //trust them here
            this._default = await PRE_USER_SWITCH_BLOCK(switch_case_builder, switch_input);

            await this.start();

        }
        this._case = async (switch_compare_input: any, switch_case_function: () => (string | void)) => {
            this.cases.push([switch_compare_input, switch_case_function]);
        }
    }
    private async start() {
        //the shit

        const cases = this.cases

        let position = 0;

        let case_resolved: boolean = false;

        const get_case = () => {

            return position < cases.length ? cases[position] : undefined;
        }
        const is_case_executable = () => {
            let [$case, block] = get_case();

            return $case instanceof Function;
        }


        const has_user_implementation_of_compare = () => {
            return !!this.userCompare;
        }


        const has_default = () => {
            return !!this._default
        }

        const advance_case = () => {
            position++;
        }

        while (get_case()) {
            let [$case, block] = get_case();

            /**
             * This sections seems to be working correctly
             */

            if (!case_resolved) {

                if (is_case_executable()) {

                    case_resolved = await PRE_USER_SWITCH_CASE($case, this.switchcaseinput);

                } else {
                    case_resolved = has_user_implementation_of_compare() ?
                        this.userCompare(this.switchcaseinput, $case) :
                        this.switchcaseinput === $case;
                }
            }


            if (case_resolved) {

                let fallthru_return_optional: string | undefined;

                fallthru_return_optional = await PRE_USER_SWITCH_CASE(block);


                if (fallthru_return_optional && fallthru_return_optional === "break") {
                    return;
                }
            }

            if (case_resolved && !this.allowFall) {
                return
            }
            advance_case();
        }

        if (has_default()) {

            ;
            await this._default();
        }

    }
    _switch: (switch_input: T, switch_case_builder: ((switch_input?: T) => void)) => Promise<void>
    _case: (switch_compare_input: any, switch_case_block: () => (Promise<(string | void)>)|string|void) => Promise<void>;


    private switchcaseinput: T;


    private cases = [];


    private userCompare: any;


    private allowFall: boolean;

}
