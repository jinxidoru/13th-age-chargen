"use strict";
define(function(require) {
  var hpMultipliers = [0,3,4,5,6,8,10,12,16,20,24];

  // this is the way each defense is calculated
  var defenseScores = {
    ac: ['con','wis','dex'],
    pd: ['str','con','dex'],
    md: ['int','wis','cha']
  };

  return {
    scope: {
      "char": '='
    },
    controller: function($scope) {
      $scope.abilities = ['str','con','dex','int','wis','cha'];
      $scope.hoverStat = null;
      var char = $scope.char;

      // get the class definition
      var classDef;
      var classes = $scope.classes = require('data/classes');
      $scope.$watch('char.cls',function(cls) {
        $scope.classDef = classDef = cls ? classes[cls] : null;
      });


      function modifier(val) {
        return (Math.floor((val-9)/2));
      }

      $scope.hpmax = function(bStaggered) {
        var hp = modifier(char.con) + classDef.hp*hpMultipliers[char.level];
        return bStaggered ? Math.floor(hp/2) : hp;
      }

      $scope.defense = function(type) {
        var score = _.chain(defenseScores[type]).map(function(x) {
          return char[x];
        }).sortBy().value()[1];
        return classDef[type] + modifier(score) + char.level;
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

      $scope.mod = function(val,withLevel) {
        var n = modifier(val) + (withLevel?char.level:0);
        return ((n>=0) ? "+" : "") + n;
      }

      $scope.hover = function(stat) {
        $scope.hoverStat = stat;
      }

      $scope.inc = function(stat,step) {
        char[stat] += step;
        char[stat] = Math.max(Math.min(char[stat],18),8);
      }

      // cause a defense
      $scope.hilite = [];
      $scope.hiDefense = function(type) {
        if ( type == null ) {
          $scope.hilite = [];
        } else {
          $scope.hilite = _.sortBy(defenseScores[type],function(a) { return char[a]; });
        }
      }
    }
  }
});
