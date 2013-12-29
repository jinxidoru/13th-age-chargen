
// setup require
requirejs.config({
  baseUrl: 'js',
  paths: {
    text: 'vendor/text'
  }
});

// initialize the base angular module
angular.module('app',[]);

// main execution loop
requirejs(['ngView!Main'],function(Main) {
  var rootScope = angular.element($("body")).scope();
  rootScope.$apply(function() {
    Main.attach($("div.ng-main"));
  });
});
