'use strict';

import sinon from 'sinon';
import should from 'should';

import define from '../src/Define';

export default (() => {
    suite('api structure', () => {
        test('define function', () => {
        	(typeof define === 'function').should.be.true();
        });

        test('config function', () => {
            (typeof define.config === 'function').should.be.true();
        });

        test('amd object', () => {
            (typeof define.amd === 'object').should.be.true();
        });
    });
})();