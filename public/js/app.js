(function() {

// setup require
requirejs.config({
  baseUrl: 'js',
  paths: {
    text: 'vendor/text'
  }
});

// convert a string to camel case
function camelCase(name) { return name.replace(/-([a-z])/g,camelCase_replace); }
function camelCase_replace(v,x) { return x.toUpperCase(); }

// list of directives
var directives = ['jn-widget'];
var paths = _.map(directives,function(x) { return "directives/"+x; });

// initialize angular, including all of the directives
define('angular-init',paths,function() {
  var ngApp = angular.module('app',[]);

  // define all of the directives
  _.each(arguments,function(def,i) {
    var name = directives[i];
    ngApp.directive(camelCase(name),function() {
      return def;
    });
  });

  // bootstrap
  angular.bootstrap(document,['app']);
});

// main execution loop
requirejs(['ngView!Main'],function(Main) {
  var rootScope = angular.element($("body")).scope();
  rootScope.$apply(function() {
    Main.attach($("div.ng-main"));
  });
});

})();
