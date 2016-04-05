var gulp = require('gulp'),
    del = require('del'),
    concat = require('gulp-concat'),
    merge = require('merge-stream'),

    composer = require('gulp-composer'),

    tsc = require('gulp-typescript'),
    jsMinify = require('gulp-uglify'),
    mocha = require('gulp-mocha'),
    coverage = require('gulp-coverage'),

    scsslint = require('gulp-scss-lint'),
    sass = require('gulp-sass'),
    cssPrefixer = require('gulp-autoprefixer'),
    cssMinify = require('gulp-cssnano'),

    imageMin = require('gulp-imagemin'),

    node,
    spawn = require('child_process').spawn,

    src = 'src/',
    dist = 'dist/',
    bourbon = 'node_modules/bourbon/app/assets/stylesheets',
    neat = 'node_modules/bourbon-neat/app/assets/stylesheets',
    scss_base = 'node_modules/scss-base/src',
    paths = {
        tsconfig: src + 'app/tsconfig.json',
        ts: src + 'app/**/*.ts',
        tests: 'test/**/*.spec.js',
        html: [
            src + '**/*.html',
            src + '/.htaccess'
        ],
        images: src + 'images/**/*.*',
        scss: src + 'scss/**/*.scss',
        scssmain: src + 'scss/main.scss',
        api: [
            src + 'api/**/*.*',
            src + 'api/.htaccess',
            '!' + src + 'api/composer.*'
        ],
        vendor: {
            js: [
                'node_modules/angular2/bundles/angular2-polyfills.js',
                'node_modules/es6-shim/es6-shim.js',
                'node_modules/systemjs/dist/system.src.js',
                'node_modules/rxjs/bundles/Rx.js',
                'node_modules/angular2/bundles/angular2.dev.js',
                'node_modules/angular2/bundles/router.dev.js',
                'node_modules/angular2/bundles/http.dev.js'
            ]
        }
    };

gulp.task('clean', function() {
    return del(dist);
});

gulp.task('html', function() {
    return gulp.src(paths.html)
        .pipe(gulp.dest(dist));
});

gulp.task('images', function() {
    return gulp.src(paths.images)
        .pipe(imageMin())
        .pipe(gulp.dest(dist + 'images/'));
});

gulp.task('lintScss', function() {
    return gulp.src(paths.scss)
        .pipe(scsslint({ config: 'lint.yml' }));
});

gulp.task('styles', function() {
    return gulp.src(paths.scssmain)
        .pipe(sass({
            precision: 10,
            includePaths: [
                bourbon,
                neat,
                scss_base
            ]
        }))
        .pipe(concat('styles.css'))
        .pipe(cssPrefixer())
        .pipe(gulp.dest(dist + 'css/'));
});

gulp.task('tsc', function() {
    var tsProject = tsc.createProject(paths.tsconfig),
        tsResult = tsProject.src()
            .pipe(tsc(tsProject));

    return tsResult.js
        .pipe(gulp.dest(dist + 'app/'));
});

gulp.task('vendor', function() {
    return gulp.src(paths.vendor.js)
        .pipe(concat('vendor.js'))
        .pipe(gulp.dest(dist + 'js/'));
});

gulp.task('minify', function() {
    var js = gulp.src(dist + 'js/vendor.js')
        .pipe(jsMinify())
        .pipe(gulp.dest(dist + 'js/'));

    var styles = gulp.src(dist + 'css/styles.css')
        .pipe(cssMinify())
        .pipe(gulp.dest(dist + 'css/'));

    return merge(js, styles);
});

gulp.task('composer', function() {
    return composer({
        'working-dir': './src/api'
    });
});

gulp.task('api', function() {
    return gulp.src(paths.api)
        .pipe(gulp.dest(dist + 'api/'));
});

gulp.task('test', ['tsc', 'vendor'], function() {
    return gulp.src('test/**/*.spec.js')
        .pipe(mocha());
});

gulp.task('coverage', ['tsc', 'vendor'], function() {
    return gulp.src('test/**/*.spec.js')
        .pipe(coverage.instrument({
            pattern: ['dist/app/**/*.js']
        }))
        .pipe(mocha())
        .pipe(coverage.gather())
        .pipe(coverage.format())
        .pipe(gulp.dest('./'));
});

gulp.task('fb-flo', function() {
    if (node) {
        node.kill();
    }

    node = spawn('node', ['flo.js'], { stdio: 'inherit' });
    node.on('close', function() {
        console.log('Exiting fb-flo.');
    });
});

gulp.task('watch', function() {
    var watchTs = gulp.watch(paths.ts, ['tsc']),
        watchScss = gulp.watch(paths.scss, ['lintScss', 'styles']),
        watchHtml = gulp.watch(paths.html, ['html']),
        watchImages = gulp.watch(paths.images, ['images']),
        watchApi = gulp.watch(paths.api, ['api']),

        onChanged = function(event) {
            console.log('File ' + event.path + ' was ' + event.type + '. Running tasks...');
        };

    gulp.start('fb-flo');

    watchTs.on('change', onChanged);
    watchScss.on('change', onChanged);
    watchHtml.on('change', onChanged);
    watchImages.on('change', onChanged);
    watchApi.on('change', onChanged);
});

gulp.task('watchtests', function() {
    var watchTests =gulp.watch(paths.tests, ['test']),
        watchTs = gulp.watch(paths.ts, ['test']),

        onChanged = function(event) {
            console.log('File ' + event.path + ' was ' + event.type + '. Running tasks...');
        };

    watchTests.on('change', onChanged);
    watchTs.on('change', onChanged);
});

gulp.task('default', ['tsc', 'vendor', 'html', 'images', 'lintScss', 'styles', 'api']);
