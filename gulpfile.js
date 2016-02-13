var gulp = require('gulp'),
    stylus = require('gulp-stylus'), // stylus a css
    autoprefixer = require('gulp-autoprefixer'), // prefix css
    minifycss = require('gulp-minify-css'), // minifica el css
    webserver = require('gulp-webserver'), //servidor web con livereload
    browserify = require('gulp-browserify'),// permite utilizacion de modulos en js como node
    uglify = require('gulp-uglify'),// minifica el js
    imagemin = require('gulp-imagemin');

// direcciones de configuracion para archivos
var configFile={
    stylus:{
        main:'src/stylus/main.styl',
        watch:'src/stylus/**/*.styl',
        out:'build/css/'
    },
    js:{
        main:'src/js/main.js',
        watch:'src/js/**/*.js',
        out:'build/js/'
    },
    img:{
        main:'src/img/**/*',
        watch:'src/img/**/*',
        out:'build/img/'
    }
}
// proceso para generacion de servidor
gulp.task('server',function(){
    gulp.src('build/')
    .pipe(webserver({
        livereload:true,
        host:'0.0.0.0',
        port:8080
    }))
});

// proceso para trabformacion de stylus a css
gulp.task('stylus',function(){
    gulp.src(configFile.stylus.main)
     .pipe(stylus({
        'include css':true
     }))
     .pipe(autoprefixer())
     .pipe(minifycss())
     .pipe(gulp.dest(configFile.stylus.out));
});

// processo de configuracion de js
gulp.task('js',function(){
    gulp.src(configFile.js.main)
    .pipe(browserify())
    .pipe(uglify())
    .pipe(gulp.dest(configFile.js.out));
});

gulp.task('img',function(){
    gulp.src(configFile.img.main)
    .pipe(imagemin({optimizationLevel: 5}))
    .pipe(gulp.dest(configFile.img.out));
});


// procesos de espia
gulp.task('watch',function(){
    gulp.watch(configFile.stylus.watch,['stylus']);
    gulp.watch(configFile.js.watch,['js']);
    gulp.watch(configFile.img.watch,['img']);
});

gulp.task('default',['server','stylus','js','img','watch']);