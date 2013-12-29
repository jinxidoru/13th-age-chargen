
// setup require
requirejs.config({
  baseUrl: 'js',
  paths: {
    text: 'vendor/text'
  }
});

// main execution loop
requirejs(['ngView!Main'],function(Main) {
  var rootScope = angular.element($("body")).scope();
  rootScope.$apply(function() {
    Main.attach($("div.ng-main"));
  });
});
