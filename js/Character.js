"use strict";
define(function(require) {
  var storageId = '13thAgeChar';
  var hpMultipliers = [0,3,4,5,6,8,10,12,16,20,24];
  var classDefs = require('data/classes');
  var defenseScores = {
    ac: ['con','wis','dex'],
    pd: ['str','con','dex'],
    md: ['int','wis','cha']
  };

  //! class: Character 
  function Character() {
    _.extend(this,{
      level: 1,
      str: 18,
      con: 12,
      dex: 10,
      int: 8,
      cha: 14,
      wis: 16,
      race: 'Human',
      class: 'Barbarian'
    });
  }

  Character.prototype = {

    //! Calculate the modifier for the given ability.
    modval: function(abil,withLevel) {
      var val = _.isString(abil) ? this[abil] : abil;
      return Math.floor((val-9)/2) + (withLevel?this.level:0);
    },

    //! Return the modifier as a string.
    mod: function(abil,withLevel) {
      var mod = this.modval(abil,withLevel);
      return ((mod>=0) ? "+" : "") + mod;
    },

    //! Calculate the maximum HP
    hp: function(bStaggered) {
      var hp = this.modval('con') + this.classDef().hp * hpMultipliers[this.level];
      return bStaggered ? Math.floor(hp/2) : hp;
    },

    //! Get the class definition.
    classDef: function() {
      return classDefs[this.class];
    },

    //! Calculate the defense value.
    ac: function() { return this.defense('ac'); },
    pd: function() { return this.defense('pd'); },
    md: function() { return this.defense('md'); },
    defense: function(type) {
      var self = this;
      var abil = _.sortBy(defenseScores[type],function(x) { return self[x]; })[1];
      return this.classDef()[type] + parseInt(this.mod(abil,true),10);
    },

    loadStorage: function() {
      try {
        _.extend(this,JSON.parse(localStorage[storageId]));
        return true;
      } catch(e) {}
      return false;
    },

    saveStorage: function() {
      localStorage[storageId] = JSON.stringify(this);
    }
  };

  return Character;
});
