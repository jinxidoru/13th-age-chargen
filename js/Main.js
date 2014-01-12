"use strict";
define(function(require) {
  var Character = require('Character');

  return {
    controller: function($scope) {
      var char = $scope.char = new Character();
      $scope.classes = require('data/classes');
      $scope.levels = _.map(_.range(10),function(x) { return {val:x+1,name:"Level " + (x+1)}; });

      // load the character from local storage
      char.loadStorage();

      // save the character definition
      $scope.$watch('char',function(val) {
        val.saveStorage();
      },true);
    }
  }
});
