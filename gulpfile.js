
var gulp = require("gulp");
var tsify = require("tsify");
var tslint = require("gulp-tslint");
var source = require("vinyl-source-stream");
var browserify = require("browserify");

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

    browse
        .bundle()
        .pipe(source("vendor.js"))
        .pipe(gulp.dest(paths.output.dist));
});

gulp.task("app", ["lint"], function () {
    return browserify({
            basedir: ".",
            debug: true,
            entries: paths.entries,
            cache: {},
            packageCache: {}
        })
        .plugin(tsify)
        .external(paths.vendors)
        .bundle()
        .pipe(source("app.js"))
        .pipe(gulp.dest(paths.output.dist));
});

gulp.task("html", function () {
    return gulp.src(paths.html)
        .pipe(gulp.dest(paths.output.dist));
});

gulp.task("styles", function () {
    return gulp.src(paths.styles)
        .pipe(gulp.dest(paths.output.styles));
});

gulp.task("build", ["app", "vendor"], function () {
});

gulp.task("watch", ["default"], function() {
    gulp.watch(paths.ts, ["app"]);
    gulp.watch(paths.html, ["html"]);
    gulp.watch(paths.styles, ["styles"]);
});

gulp.task("default", ["build", "html", "styles"], function() {
});
