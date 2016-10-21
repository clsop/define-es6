define.config({
	baseUrl: 'file:///extra/misc/Coding_Projects/js/define-es6/'
});
// define('test', ['exports'], function(exports) {
// 	exports.verb = "test verb";
// 	console.log('test module ran');
// });
// define('test2', ['exports', 'test'], function(exports, test) {
// 	exports.verb = "test2 verb";
// 	console.log(test.verb);
// 	console.log('test2 module ran');
// });
// define('test3', ['test2'], function(test2) {
// 	console.log(test2.verb);
// 	console.log('test3 module ran');
// });
// define('test4', ['test2', 'test'], function(test2, test) {
// 	console.log(test.verb);
// 	console.log(test2.verb);
// 	console.log('test4 module ran');
// });
// define('test5', ['test', 'test4'], function(test, test4) {
// 	console.log(test.verb);
// 	console.log('test5 module ran');
// });
define('test', ['exports'], function(exports) {
	exports.verb = "test verb";
	console.log('test module ran');
});
define('test4', ['exports', 'test', 'test2'], function(exports, test, test2) {
	exports.verb = "test4 verb";
	console.log(test.verb);
	console.log(test2.verb);
	console.log('test4 module ran');
});
define('test3', ['test2'], function(test2) {
	console.log(test2.verb);
	console.log('test3 module ran');
});