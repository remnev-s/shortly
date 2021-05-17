const { src, dest, watch, parallel, series } = require("gulp");
const sass = require("gulp-dart-sass");
const concat = require("gulp-concat");
const browserSync = require("browser-sync").create();
const autoprefixer = require("gulp-autoprefixer");
const imagemin = require("gulp-imagemin");

const del = require("del");

function browsersync() {
  browserSync.init({
    server: {
      baseDir: "src/",
    },
    port: 8080,
    browser: "firefox",
    notify: false,
  });
}

function scripts() {
  return (
    src([
      // 'node_modules/jquery/dist/jquery.js',
      "src/js/script.js",
    ])
      // .pipe(concat("script.min.js"))
      // .pipe(concat('script.js'))
      .pipe(uglify())
      .pipe(dest("src/js"))
      .pipe(browserSync.stream())
  );
}

function styles() {
  return (
    src("src/index.scss")
      .pipe(sass({ outputStyle: "compressed" }))
      .pipe(concat("index.min.css"))

      // .pipe(sass({ outputStyle: "expanded" }))
      // .pipe(concat("main.css"))

      .pipe(
        autoprefixer({
          overrideBrowserslist: ["last 10 version "],
          cascade: true,
          grid: true,
        })
      )
      .pipe(dest("src/css"))
      .pipe(browserSync.stream())
  );
}

function images() {
  return src("src/images/**/*")
    .pipe(
      imagemin([
        imagemin.gifsicle({ interlaced: true }),
        imagemin.mozjpeg({ quality: 75, progressive: true }),
        imagemin.optipng({ optimizationLevel: 5 }),
        imagemin.svgo({
          plugins: [{ removeViewBox: true }, { cleanupIDs: false }],
        }),
      ])
    )
    .pipe(dest("build/images"));
}

function source() {
  return src(
    [
      "src/css/index.min.css",
      "src/vendor/fonts/**/*",
      "src/js/script.js",
      "src/*html",
    ],
    { base: "src" }
  ).pipe(dest("build"));
}

function watching() {
  watch(["src/**/*.scss"], styles);
  watch(["src/js/**/*.js", "!src/js/script.min.js"], scripts);
  watch(["src/*.html"]).on("change", browserSync.reload);
}

function cleanSrc() {
  return del("build");
}

exports.styles = styles;
exports.watching = watching;
exports.browsersync = browsersync;
exports.scriptsc = scripts;

exports.images = images;
exports.cleanDist = cleanSrc;

exports.build = series(cleanSrc, images, source);
exports.default = parallel(browsersync, watching);
