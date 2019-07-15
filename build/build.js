const fs = require('fs');
const babel = require('@babel/core');

// Transpile to ES5
let transpiled = babel.transformFileSync('src/css.js', {
  configFile: false,
  comments: false,
  sourceMaps: false,
  presets: ['@babel/preset-env']
});

// Transpile to ES5 and minify
let transpiled_minified = babel.transformFileSync('src/css.js', {
  configFile: false,
  comments: false,
  sourceMaps: false,
  presets: ['@babel/preset-env', 'minify']
});

fs.writeFileSync('dist/css.js', transpiled.code);
fs.writeFileSync('dist/css.min.js', transpiled_minified.code);