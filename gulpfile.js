var gulp = require("gulp"),
  sass = require("gulp-sass"),
  concat = require("gulp-concat"),
  prefixer = require("gulp-autoprefixer"),
  cssmin = require("gulp-cssnano"),
  imagemin = require("gulp-imagemin"),
  uglifyes = require("uglify-es"),
  composer = require("gulp-uglify/composer"),
  uglify = composer(uglifyes, console),
  browserSync = require("browser-sync"),
  del = require("del"),
  babel = require("gulp-babel");

var paths = { src: "src/", dist: "dist/" },
  src = {
    sass: paths.src + "sass/**/**/*.+(scss|sass|less|css)",
    js: paths.src + "scripts/**/*.js",
    img: paths.src + "img/**/*"
  },
  dist = {
    sass: paths.dist + "styles",
    js: paths.dist + "scripts",
    img: paths.dist + "img"
  };

gulp.task(
  "sass",
  gulp.parallel(
    function() {
      return gulp
        .src(["demo_src/sass/app.scss"])
        .pipe(sass().on("error", sass.logError))
        .pipe(concat("mystyles.min.css"))
        .pipe(prefixer())
        .pipe(cssmin())
        .pipe(gulp.dest("demo/assets/styles"));
    },
    function() {
      return gulp
        .src(["src/sass/app.scss"])
        .pipe(sass().on("error", sass.logError))
        .pipe(concat("range.slider.css"))
        .pipe(prefixer())
        .pipe(gulp.dest("dist"));
    },
    function() {
      return gulp
        .src(["src/sass/app.scss"])
        .pipe(sass().on("error", sass.logError))
        .pipe(concat("range.slider.min.css"))
        .pipe(prefixer())
        .pipe(cssmin())
        .pipe(gulp.dest("dist"));
    },
    function() {
      return gulp
        .src(["src/sass/app.scss"])
        .pipe(sass().on("error", sass.logError))
        .pipe(concat("range.slider.min.css"))
        .pipe(prefixer())
        .pipe(cssmin())
        .pipe(gulp.dest("demo/assets/styles"));
    }
  )
);

gulp.task(
  "js",
  gulp.parallel(
    function() {
      return gulp
        .src(["demo_src/scripts/*.js"])
        .pipe(uglify())
        .pipe(concat("myscripts.min.js"))
        .pipe(gulp.dest("demo/assets/scripts"));
    },
    function() {
      return gulp
        .src(["src/scripts/*.js"])
        .pipe(
          babel({
            presets: ["@babel/preset-env"]
          })
        )
        .pipe(concat("range.slider.js"))
        .pipe(gulp.dest("dist"));
    },
    function() {
      return gulp
        .src(["src/scripts/*.js"])
        .pipe(
          babel({
            presets: ["@babel/preset-env"]
          })
        )
        .pipe(uglify())
        .pipe(concat("range.slider.min.js"))
        .pipe(gulp.dest("dist"));
    },
    function() {
      return gulp
        .src(["src/scripts/*.js"])
        .pipe(
          babel({
            presets: ["@babel/preset-env"]
          })
        )
        .pipe(uglify())
        .pipe(concat("range.slider.min.js"))
        .pipe(gulp.dest("demo/assets/scripts"));
    }
  )
);

gulp.task("img", function() {
  return gulp
    .src(src.img)
    .pipe(newer(dist.img))
    .pipe(imagemin())
    .pipe(gulp.dest(dist.img));
});

gulp.task("html", function() {
  return gulp
    .src("demo_src/*.html")
    .pipe(gulp.dest("demo"))
    .pipe(browserSync.reload({ stream: true }));
});

gulp.task(
  "clean",
  gulp.parallel(
    function() {
      return del.sync("demo");
    },
    function() {
      return del.sync("dist");
    }
  )
);

gulp.task("build", gulp.parallel("clean", "html", "sass", "js"));

gulp.task("browser-sync", function() {
  browserSync({
    server: {
      baseDir: "demo"
    }
  });
});

gulp.task(
  "default",
  gulp.parallel("browser-sync", function() {
    gulp
      .watch("demo_src/*.html", gulp.parallel("html"))
      .on("change", browserSync.reload);
    gulp
      .watch(src.sass, gulp.parallel("sass"))
      .on("change", browserSync.reload);
    gulp
      .watch("demo_src/sass", gulp.parallel("sass"))
      .on("change", browserSync.reload);
    gulp.watch(src.js, gulp.parallel("js")).on("change", browserSync.reload);
    gulp
      .watch("demo_src/scripts", gulp.parallel("js"))
      .on("change", browserSync.reload);
    // gulp.watch(src.img, gulp.parallel("img")).on("change", browserSync.reload);
  })
);
