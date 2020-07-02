define.config({
	baseUri: 'file:///extra/misc/Coding_Projects/js/define-es6/'
});
define('test3', ['test2'], function(test2) {
	console.log(test2.verb);
	console.log('test3 module ran');
});
define('test4', ['exports'], function(exports) {
	exports.verb = "test verb";
	console.log('test4 module ran');
});
// define('test4', ['exports', 'test', 'test2'], function(exports, test, test2) {
// 	exports.verb = "test4 verb";
// 	console.log(test.verb);
// 	console.log(test2.verb);
// 	console.log('test4 module ran');
// });
// define('test3', ['test2'], function(test2) {
// 	console.log(test2.verb);
// 	console.log('test3 module ran');
// });