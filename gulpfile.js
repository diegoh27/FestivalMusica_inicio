const { src, dest, watch, parallel } = require("gulp");

//! css

const sass = require("gulp-sass")(require("sass"));
const plumber = require("gulp-plumber");
const autoprefixer = require("autoprefixer");
const cssnano = require("cssnano");
const postcss = require("gulp-postcss");

//! webp
const cache = require("gulp-cache");
const imagemin = require("gulp-imagemin");
const webp = require("gulp-webp");
const avif = require("gulp-avif");

function css(css) {
  src("src/scss/**/*.scss") // identificar el archivo SASS
    .pipe(plumber())
    .pipe(sass()) //Compilarlo
    // .pipe(postcss([autoprefixer(), cssnano()]))
    .pipe(dest("build/css")); //Almacenarla en el disco

  css(); // callback que avisa cuando llegamos al final
}

function versionWebp(done) {
  const opciones = {
    quality: 50,
  };
  src("src/img/**/*.{png,jpg}").pipe(webp(opciones)).pipe(dest("build/img"));
  done();
}

function imagenes(done) {
  const opciones = {
    optimizationLevel: 3,
  };
  src("src/img/**/*.{png,jpg}")
    .pipe(cache(imagemin(opciones)))
    .pipe(dest("build/img"));
  done();
}

function versionAvif(done) {
  const opciones = {
    quality: 50,
  };
  src("src/img/**/*.{png,jpg}").pipe(avif(opciones)).pipe(dest("build/img"));
  done();
}

function dev(cb) {
  watch("src/scss/**/*.scss", css);
  watch("src/scss/**/*.js", javaScript);
  cb();
}

function javaScript(done) {
  src("src/js/**/*.js").pipe(dest("build/js"));
  done();
}

exports.css = css;
exports.js = javaScript;
exports.imagenes = imagenes;
exports.versionWebp = versionWebp;
exports.versionAvif = versionAvif;
exports.dev = parallel(
  versionAvif,
  imagenes,
  versionWebp,
  css,
  javaScript,
  dev
);
