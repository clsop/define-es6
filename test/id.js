'use strict';

import sinon from 'sinon';
import should from 'should';

import define from '../src/Define';

export default (() => {
    suite('id spec', () => {
        test('can register new id', () => {
        	should.fail();
        	// TODO:
        });

        test('will use already registered id', () => {
        	should.fail();
        	// TODO:
        });
    });

    suite('id format spec', () => {
		test('must be camel case', () => {
            // TODO:
        	//(() => define('Test', () => {})).should.throwError();
        	//(() => define('test/Test', () => {})).should.throwError();
        	//(() => define('test/test/Test', () => {})).should.throwError();
        	//(() => define('testId', () => {})).should.not.throwError();
        	//(() => define('test', () => {})).should.not.throwError();
            should.fail();
        });

        test('cannot have file extensions in id', () => {
        	should.fail();
        	// TODO:
        });

        test('can be relative', () => {
        	should.fail();
        	// TODO:
        });

        test('supports loader plugins', () => {
        	should.fail();
        	// TODO:
        });
    });
})();