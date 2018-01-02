var outputDir       = 'build';
var outputPublicDir = outputDir + '/public';
var outputJSDir     = outputPublicDir + '/js';
var outputCSSDir    = outputPublicDir + '/css';
var outputViewsDir  = outputDir + '/views';
var outputUtilsDir  = outputDir + '/utils';

var pump      = require('pump');
var gulp      = require('gulp');
var uglify    = require('gulp-uglify');
var cleanCSS  = require('gulp-clean-css');
var minifyejs = require('gulp-minify-ejs');

//https://github.com/mafintosh/pump
//https://github.com/terinjokes/gulp-uglify

//1、压缩src/目录下的js文件
gulp.task('compress-js', function (cb) {
  pump([
        gulp.src('src/public/js/*.js'),
        uglify({mangle : true}),
        gulp.dest(outputJSDir)
    ],
    cb
  );
});

gulp.task('compress-js', function (cb) {
  pump([
        gulp.src('src/utils/*.js'),
        uglify({mangle : true}),
        gulp.dest(outputUtilsDir)
    ],
    cb
  );
});

//2、处理src/public/css目录下的css文件中的空行
gulp.task('compress-css', function(callback) {
    gulp.src('src/public/css/*.css')
        .pipe(cleanCSS({compatibility: 'ie8'}))
        .pipe(gulp.dest(outputCSSDir));
});

//3、处理src/views目录下的ejs模板中的空白行
gulp.task('compress-views', function(callback) {
    gulp.src('src/views/**/*.ejs')
        .pipe(minifyejs())
        .pipe(gulp.dest(outputViewsDir));
});

//4、复制不需要做处理的文件
gulp.task('copy-files', function(callback) {
    gulp.src('src/public/images/**').pipe(gulp.dest(outputDir + '/public/images'));
    gulp.src('src/public/font/**').pipe(gulp.dest(outputDir + '/public/font'));
    gulp.src(['src/bin/**']).pipe(gulp.dest(outputDir + '/bin'));
    // gulp.src(['src/node_modules/**']).pipe(gulp.dest(outputDir + '/node_modules'));
    gulp.src('src/*.js').pipe(gulp.dest(outputDir));
    gulp.src('src/*.json').pipe(gulp.dest(outputDir));
    //gulp.src('src/utils/**/*.js').pipe(gulp.dest(outputDir + '/utils/'));
    gulp.src('src/routes/**').pipe(gulp.dest(outputDir + '/routes/'));
    //gulp.src(['src/views/**', '!src/views/**/*.ejs']).pipe(gulp.dest(outputViewsDir));
});

gulp.task('default', ['copy-files', 'compress-js', 'compress-css', 'compress-views']);
