"use strict";
define(function(require) {
  return {
    scope: {
      "char": '='
    },
    controller: function($scope) {
      $scope.abilities = ['str','con','dex','int','wis','cha'];
    }
  };
});
