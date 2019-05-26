
var gulp = require("gulp");
var tsify = require("tsify");
var tslint = require("gulp-tslint");
var source = require("vinyl-source-stream");
var browserify = require("browserify");
var browserSync = require('browser-sync').create();

var paths = {
    ts: [
        "src/**/*.ts", 
        "src/**/*.tsx"
    ],
    entries: ["src/main.tsx"],
    vendors: [
        "react",
        "react-dom"
    ],
    html: ["src/*.html"],
    styles: ["src/styles/*.css"],
    output: {
        dist: "dist",
        html: "dist/*.html",
        styles: "dist/styles"
    }
};

gulp.task("lint", function() {
    return gulp.src(paths.ts)
        .pipe(tslint({
            formatter: "verbose"
        }))
        .pipe(tslint.report());
});

gulp.task("vendor", function () {
    var browse = browserify({
        debug: true
    });

    paths.vendors.forEach(lib => {
        browse.require(lib);
    });

    return browse
        .bundle()
        .pipe(source("vendor.js"))
        .pipe(gulp.dest(paths.output.dist));
});

gulp.task("app", function () {
    return browserify({
            debug: true,
            entries: paths.entries,
        })
        .plugin(tsify)
        .external(paths.vendors)
        .bundle()
        .pipe(source("app.js"))
        .pipe(gulp.dest(paths.output.dist))
        .pipe(browserSync.reload({ stream: true }));
});

gulp.task("html", function () {
    return gulp.src(paths.html)
        .pipe(gulp.dest(paths.output.dist));
});

gulp.task("styles", function () {
    return gulp.src(paths.styles)
        .pipe(gulp.dest(paths.output.styles))
        .pipe(browserSync.reload({ stream: true }));
});

gulp.task("build", gulp.parallel(gulp.series("lint", "app"), "vendor"));

gulp.task("watch", function() {
    gulp.watch(paths.ts, gulp.series("lint", "app"));
    gulp.watch(paths.html, gulp.series("html"));
    gulp.watch(paths.styles, gulp.series("styles"));
});

gulp.task('serve', function () {
    browserSync.init({
        server: {
            baseDir: paths.output.dist
        }
    });

    gulp.watch(paths.ts, gulp.series("lint", "app"));
    gulp.watch(paths.html, gulp.series("html"));
    gulp.watch(paths.styles, gulp.series("styles"));

    gulp.watch(paths.output.html).on('change', browserSync.reload);
});

gulp.task("default", gulp.parallel("build", "html", "styles"));
