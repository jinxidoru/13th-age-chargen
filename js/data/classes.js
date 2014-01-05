define(function(require) {
  return _.chain({
    Barbarian:  [7,12,11,10,10,['str','con']],
    Bard:       [7,12,10,11, 8,['dex','cha']],
    Cleric:     [7,14,11,11, 8,['str','wis']],
    Fighter:    [8,15,10,10,10,['str','con']],
    Paladin:    [8,16,10,12,10,['str','cha']],
    Ranger:     [7,14,11,10, 8,['str','dex','wis']],
    Rogue:      [6,12,12,10, 8,['dex','cha']],
    Sorcerer:   [6,10,11,10, 6,['cha','con']],
    Wizard:     [6,10,10,12, 6,['int','wis']]
  }).map(function(x,name) {
    return [name,{ hp:x[0], ac:x[1], pd:x[2], md:x[3], recovery:x[4], boost:x[5] }];
  }).object().value();
});
