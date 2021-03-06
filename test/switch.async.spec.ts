import { SwitchAsync as Switch, SwitchOption } from '../index';
import * as sinon from "sinon";
import { expect } from "chai";

describe("Switch Async", () => {


    it("should match the first case", async function () {
        let { _switch, _case } = new Switch();
        let spy = sinon.spy();

        let test = "test";


        await _switch(test, () => {

            _case("test", async () => {
                spy();
            })


            return () => {
                throw new Error("mistakes were made");
            }

        })


        expect(spy.calledOnce).to.be.true;
    })
    

    it("should use the default case", async function () {
        let { _switch, _case } = new Switch();
        let spy = sinon.spy();

        let test = "test";

        await _switch(test, () => {

            _case("test1", () => {
                throw new Error("mistakes were made");
            })


            return () => {
                ;
                spy();
            }

        })

        expect(spy.calledOnce).to.be.true;
    })

    it("should be able to select the right case by function", async function () {
        let { _switch, _case } = new Switch();
        let spy = sinon.spy();

        let test = "test";

         await _switch(test, () => {

            _case(() => true, () => {
                spy();
            })


            return () => {
                ;
                throw new Error("mistakes were made");
            }

        })

        expect(spy.calledOnce).to.be.true;
    })


    it("should be ok with no default statement", async function () {
        let { _switch, _case } = new Switch();
        let spy = sinon.spy();

        let test = "test";

         await _switch(test, () => {

            _case(() => false, () => {
                spy();
            })

        })

        expect(spy.callCount).to.eql(0);
    })



    it("should hit all cases and the default", async function () {
        let option = {
            allowFall: true
        }

        let { _switch, _case } = new Switch(option);
        let spy = sinon.spy();

        let test = "test";

        await _switch(test, () => {

            _case(() => true, () => {
                spy();
            })

            _case(() => false, () => {
                spy();
            })

            _case(() => false, () => {
                spy();
            })

            return () => {
                spy()
            }

        })

        expect(spy.callCount).to.eql(4);
    })


    it("should be ok with no default statement", async function () {
        let option = {
            allowFall: true
        }

        let { _switch, _case } = new Switch(option);
        let spy = sinon.spy();

        let test = "test";

        await _switch(test, () => {

            _case(() => true, () => {
                spy();
                return 'break';
            })

            _case(() => false, () => {
                spy();
            })

            _case(() => false, () => {
                spy();
            })

            return () => {
                spy()
            }

        })

        expect(spy.callCount).to.eql(1);
    })


    it("should be ok with no default statement", async function () {
        let options: Partial<SwitchOption> = {
            allowFall: true,
            compareFunction: function (input, expect) {
                let result = input === expect
                debugger;
                return result;
            }
        }

        let { _switch, _case } = new Switch(options);
        let spy = sinon.spy();

        let test = "test";

        await _switch(test, () => {

            _case('test', () => {
                spy();
                return 'break';
            })

            _case(() => false, () => {
                spy();
            })

            _case(() => false, () => {
                spy();
            })

            return () => {
                spy()
            }

        })

        expect(spy.callCount).to.eql(1);
    })

})