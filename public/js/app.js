
// setup require
requirejs.config({
  baseUrl: 'js'
});

// main execution loop
requirejs([
  'vendor/angular',
  'vendor/lodash',
  'vendor/jquery-2.0.3'
],function() {
  console.log("Start!");
});
