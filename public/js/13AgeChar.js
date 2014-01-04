"use strict";
define(function(require) {
  var hpMultipliers = [0,3,4,5,6,8,10,12,16,20,24];

  return {
    controller: function($scope) {

      var char = $scope.char = {
        level: 2,
        str: 18,
        con: 12,
        dex: 10,
        int: 8,
        cha: 14,
        wis: 16,
        cls: 'Cleric'
      };

      // get the class definition
      var classDef;
      var classes = $scope.classes = require('data/classes');
      $scope.$watch('char.cls',function(cls) {
        $scope.classDef = classDef = cls ? classes[cls] : null;
      });


      function modifier(val) {
        return (Math.floor((val-9)/2));
      }

      function defense(base,v1,v2,v3) {
        return base + modifier(_.sortBy([v1,v2,v3])[1]) + char.level;
      }

      $scope.hpmax = function(bStaggered) {
        var hp = modifier(char.con) + classDef.hp*hpMultipliers[char.level];
        return bStaggered ? Math.floor(hp/2) : hp;
      }

      $scope.ac = function() {
        return defense(classDef.ac,char.con,char.wis,char.dex);
      }

      $scope.pd = function() {
        return defense(classDef.pd,char.str,char.con,char.dex);
      }

      $scope.md = function() {
        return defense(classDef.md,char.int,char.wis,char.cha);
      }

      $scope.points = function() {

        // get the stats then reduce the most expensive ability scores
        var stats = _.pick(char,'str','con','dex','wis','int','cha');
        var maxScore = _.max(classDef.boost,function(x) { return stats[x]; });
        stats[maxScore] -= 2;

        // show the score
        return _.reduce([char.str,char.con,char.dex,char.wis,char.int,char.cha],function(sum,val) {
          if ( val <= 14 )
            return sum+(val-8);
          if ( val <= 16 )
            return sum+(val-14)*2+6;
          return sum+(val-16)*3+10;
        });
      }

      $scope.mod = function(val) {
        var n = modifier(val);
        return ((n>=0) ? "+" : "") + n;
      }
    }
  }
});
