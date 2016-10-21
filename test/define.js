'use strict';

import sinon from 'sinon';
import should from 'should';

import define from '../src/Define';

export default (() => {
    suite('define', () => {
        suiteSetup(() => {
            // mockup
            global.document = Object.create(null);
            global.document.createElement = (tag) => { return Object.create(null); };
            global.document.head = Object.create(null);
            global.document.head.appendChild = (obj) => { };
            global.document.scripts = [ { id: 'testId' } ];
        });

        test('will accept valid arguments', () => {
        	(() => define('test', ['test'], () => { })).should.not.throwError();
            (() => define(['test'], () => { })).should.not.throwError();
            (() => define('test', () => { })).should.not.throwError();
        });

        test('will throw exception on missing all arguments', () => {
        	(() => define()).should.throwError();
        });

        test('will throw exception when no factory function', () => {
        	(() => define('test')).should.throwError();
        	(() => define(['test'])).should.throwError();
        	(() => define('test', ['test'])).should.throwError();
        });
    });
})();