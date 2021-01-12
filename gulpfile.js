const { src, dest, watch, series, parallel } = require("gulp");

// Importing all the Gulp-related packages we want to use
const sourcemaps = require("gulp-sourcemaps");
const sass = require("gulp-sass");
const babel = require("gulp-babel");
const postcss = require("gulp-postcss");
const autoprefixer = require("autoprefixer");
const cssnano = require("cssnano");
const terser = require("gulp-terser");
const browsersync = require("browser-sync").create();

// File paths
const files = {
  scssPath: "./sass/**/*.scss",
  jsPath: "./js/**/*.js",
  htmlPath: "./*.html",
  imgPath: "./images/**/*",
};

function copyHtml() {
  return src(files.htmlPath).pipe(dest("dist"));
}

// Sass task: compiles the style.scss file into style.css
function scssTask() {
  return src(files.scssPath)
    .pipe(sourcemaps.init()) // initialize sourcemaps first
    .pipe(sass().on("error", sass.logError)) // compile SCSS to CSS
    .pipe(postcss([autoprefixer(), cssnano()])) // PostCSS plugins
    .pipe(sourcemaps.write(".")) // write sourcemaps file in current directory
    .pipe(dest("dist")); // put final CSS in dist folder
}

// JS task: concatenates and uglifies JS files to script.js
function jsTask() {
  return src([
    files.jsPath,
    //,'!' + 'includes/js/jquery.min.js', // to exclude any specific files
  ])
    .pipe(sourcemaps.init()) // initialize sourcemaps first
    .pipe(
      babel({
        presets: ["@babel/preset-env"],
      })
    )
    
    .pipe(terser())
    .pipe(sourcemaps.write(".")) // write sourcemaps file in current directory
    .pipe(dest("dist"));
}


// Browsersync Tasks
function browsersyncServe(cb) {
  browsersync.init({
    server: {
      baseDir: ".",
    },
  });
  cb();
}

function browsersyncReload(cb) {
  browsersync.reload();
  cb();
}

// Watch task: watch SCSS and JS files for changes
// If any change, run scss and js tasks simultaneously
function watchTask() {
  watch("*.html", browsersyncReload);
  watch(
    [files.scssPath, files.jsPath],
    {
      interval: 1000,
      usePolling: true,
    }, //Makes docker work
    series(parallel(scssTask, jsTask))
  );
}

// Export the default Gulp task so it can be run
// Runs the scss and js tasks simultaneously

exports.default = series(
  parallel(scssTask, jsTask, browsersyncServe),
  copyHtml,
  watchTask
);
