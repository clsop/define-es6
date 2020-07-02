const gulp = require('gulp');
const browserify = require('browserify');
const babelify = require('babelify');
const source = require('vinyl-source-stream');
const buffer = require('vinyl-buffer');
const uglify = require('gulp-uglify');
const sourcemaps = require('gulp-sourcemaps');
const pump = require('pump');
const mocha = require('gulp-mocha');

const reporter = 'nyan';
const bailOnFirstFail = true;

const distBuild = 'build/dist';
const debugBuild = 'build/debug';
const testBuild = 'build/test';

gulp.task('default', ['dist', 'debug']);

/****************/
/* distribution */
/****************/
// gulp.task('dist', (cb) => {
//     let b = browserify({
//         entries: 'src/Define.js',
//         debug: false
//     });

//     pump([
//         b.transform(babelify, {
//             presets: ['es2015']
//         }).bundle(),
//         source('define-es6.js'),
//         buffer(),
//         uglify(),
//         gulp.dest(distBuild)
//     ], cb);
// });

gulp.task('debug', (cb) => {
    let b = browserify({
        entries: 'src/Define.js',
        debug: true
    });

    pump([
        b.transform(babelify, {
            presets: ['es2015']
        }).bundle(),
        source('define-me.js'),
        buffer(),
        sourcemaps.init({
            loadMaps: true,
            debug: true
        }),
        uglify({
            mangle: false,
            preserveComments: 'all'
        }),
        sourcemaps.write(),
        gulp.dest(debugBuild)
    ], cb);
});

/***************/
/* build tests */
/***************/
gulp.task('build-tests', (cb) => {
    let b = browserify({
        entries: ['test/id.js', 'test/dependencies.js', 'test/structure.js', 'test/define.js', 'test/config.js'],
        debug: true
    });

    pump([b.transform(babelify, {
            presets: ['es2015']
        })
        .bundle(),
        source('tests.js'),
        buffer(),
        gulp.dest(testBuild)
    ], cb);
});


gulp.task('build-id-tests', (cb) => {
    let b = browserify({
        entries: 'test/id.js',
        debug: true
    });

    pump([b.transform(babelify, {
            presets: ['es2015']
        })
        .bundle(),
        source('id.js'),
        buffer(),
        gulp.dest(testBuild)
    ], cb);
});

gulp.task('build-dependencies-tests', (cb) => {
    let b = browserify({
        entries: 'test/dependencies.js',
        debug: true
    });

    pump([b.transform(babelify, {
            presets: ['es2015']
        })
        .bundle(),
        source('dependencies.js'),
        buffer(),
        gulp.dest(testBuild)
    ], cb);
});

gulp.task('build-define-tests', (cb) => {
    let b = browserify({
        entries: 'test/define.js',
        debug: true
    });

    pump([b.transform(babelify, {
            presets: ['es2015']
            //plugins: ['syntax-flow', 'transform-flow-strip-types']
        })
        .bundle(),
        source('define.js'),
        buffer(),
        gulp.dest(testBuild)
    ], cb);
});

gulp.task('build-config-tests', (cb) => {
    let b = browserify({
        entries: 'test/config.js',
        debug: true
    });

    pump([b.transform(babelify, {
            presets: ['es2015']
            //plugins: ['syntax-flow', 'transform-flow-strip-types']
        })
        .bundle(),
        source('config.js'),
        buffer(),
        gulp.dest(testBuild)
    ], cb);
});

gulp.task('build-structure-tests', (cb) => {
    let b = browserify({
        entries: 'test/structure.js',
        debug: true
    });

    pump([b.transform(babelify, {
            presets: ['es2015']
            //plugins: ['syntax-flow', 'transform-flow-strip-types']
        })
        .bundle(),
        source('structure.js'),
        buffer(),
        gulp.dest(testBuild)
    ], cb);
});

/*************/
/* run tests */
/*************/
gulp.task('tests', ['build-tests'], () => {
    return gulp.src(`${testBuild}/tests.js`, {
            read: false
        })
        .pipe(mocha({
            reporter: reporter,
            ui: 'tdd',
            bail: bailOnFirstFail
        }));
});

gulp.task('tests:id', ['build-id-tests'], () => {
    return gulp.src(`${testBuild}/id.js`, {
            read: false
        })
        .pipe(mocha({
            reporter: reporter,
            ui: 'tdd',
            bail: bailOnFirstFail
        }));
});

gulp.task('tests:dependencies', ['build-dependencies-tests'], () => {
    return gulp.src(`${testBuild}/dependencies.js`, {
            read: false
        })
        .pipe(mocha({
            reporter: reporter,
            ui: 'tdd',
            bail: bailOnFirstFail
        }));
});

gulp.task('tests:define', ['build-define-tests'], () => {
    return gulp.src(`${testBuild}/define.js`, {
            read: false
        })
        .pipe(mocha({
            reporter: reporter,
            ui: 'tdd',
            bail: bailOnFirstFail
        }));
});

gulp.task('tests:config', ['build-config-tests'], () => {
    return gulp.src(`${testBuild}/config.js`, {
            read: false
        })
        .pipe(mocha({
            reporter: reporter,
            ui: 'tdd',
            bail: bailOnFirstFail
        }));
});

gulp.task('tests:structure', ['build-structure-tests'], () => {
    return gulp.src(`${testBuild}/structure.js`, {
            read: false
        })
        .pipe(mocha({
            reporter: reporter,
            ui: 'tdd',
            bail: bailOnFirstFail
        }));
});