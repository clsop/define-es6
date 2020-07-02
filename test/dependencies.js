'use strict';

import sinon from 'sinon';
import should from 'should';

import define from '../src/Define';

export default (() => {
    suite('dependencies injected', () => {
    	suiteSetup(() => {
            // mockup
            global.document = Object.create(null);
            global.document.createElement = (tag) => { return Object.create(null); };
            global.document.head = Object.create(null);
            global.document.head.appendChild = (obj) => { };
            global.document.scripts = [ { id: 'testId' } ];
        });

        test('will inject default free vars when no dependencies are requested', () => {
        	let factorySpy = sinon.spy();
        	define(factorySpy);

        	let args = factorySpy.getCall(0).args;
        	factorySpy.calledOnce.should.be.true();
        	args.should.have.length(3);
        });
    });
})();