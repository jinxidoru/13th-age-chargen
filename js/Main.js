"use strict";
define(function(require) {
  var storageId = '13thAgeChar';

  return {
    controller: function($scope) {
      $scope.classes = require('data/classes');
      $scope.levels = _.map(_.range(10),function(x) { return {val:x+1,name:"Level " + (x+1)}; });

      // load the character from local storage
      try {
        $scope.char = JSON.parse(localStorage[storageId]);
      } catch (e) {}

      // define a default character
      if ( !$scope.char ) {
        $scope.char = {
          level: 1,
          str: 18,
          con: 12,
          dex: 10,
          int: 8,
          cha: 14,
          wis: 16,
          race: 'Human',
          cls: 'Barbarian'
        };
      }

      // save the character definition
      $scope.$watch('char',function(val) {
        localStorage[storageId] = JSON.stringify(val);
      },true);
    }
  }
});
