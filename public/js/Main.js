define(function(require) {
  return {
    controller: function($scope) {
      $scope.name = "Mike";
      $scope.char = {
        level: 2,
        str: 18,
        con: 12,
        dex: 10,
        int: 8,
        cha: 14,
        wis: 16,
        cls: 'Cleric'
      };

    }
  }
});
