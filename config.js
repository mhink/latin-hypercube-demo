var buildDir     = "./build";
var publicAssets = buildDir + "/assets";
var sourceFiles  = "./src";
var reactify     = require("reactify");
var neatPaths    = require("node-neat").includePaths;

module.exports = {
  publicAssets: publicAssets,
  browserSync: {
    server: {
      baseDir: buildDir
    },
    files: ['./build/**/*']
  },
  haml: {
    src: "./pages/**/*.haml",
    dest: buildDir,
    settings: {
    }
  },
  sass: {
    src: sourceFiles + "/stylesheets/**/*.{sass,scss}",
    dest: publicAssets,
    settings: {
      indentedSyntax: false,
      imagePath: '/assets/images', // Used by the image-url helper
      includePaths: neatPaths,
      sourcemap: true
    }
  },
  images: {
    src: sourceFiles + "/images/**",
    dest: publicAssets,
  },
  browserify: {
    bundleConfigs: [
    {
      entries: sourceFiles + '/javascripts/global.coffee',
      dest: publicAssets,
      outputName: 'global.js',
      extensions: ['.js','.coffee','.jsx','.js.jsx'],
      transform: [reactify]
    }]
  }
};
