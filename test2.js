// define.config({
// 	baseUrl: 'file:///extra/misc/Coding_Projects/js/define-es6/'
// });
define('test2', ['test', 'exports'], function(test, exports) {
	console.log(test.verb);
	exports.verb = 'test2 verb';
	console.log('test2 module ran');
});