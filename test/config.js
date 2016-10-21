'use strict';

import sinon from 'sinon';
import should from 'should';

import define from '../src/Define';

export default (() => {
    suite('define.config', () => {
        test('throws error when no argument', () => {
        	(() => define.config()).should.throwError();
        });

        test('throws error when not object', () => {
            (() => define.config('')).should.throwError();
            (() => define.config(() => {})).should.throwError();
            (() => define.config(0)).should.throwError();
            (() => define.config(null)).should.throwError();
            (() => define.config(undefined)).should.throwError();
        });

        test('ok when object is passed', () => {
            (() => define.config({})).should.throwError();
            (() => define.config({ test: [] })).should.not.throwError();
        });
    });
})();