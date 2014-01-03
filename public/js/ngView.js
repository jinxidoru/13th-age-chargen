"use strict";
define(function(require) {
  require('angular-init');
  var injector = angular.element('html').injector();
  var $compile = injector.get('$compile');

  //! This is the view class
  function NgView(opts) {

    //! Attach this view to the DOM.
    function attach($el) {

      // create the scope
      var parentScope = angular.element($el).scope();
      var $scope = parentScope.$new(true);

      // invoke the controller
      if ( opts.controller ) {
        var instance = { element:newEl };
        opts.controller.apply(instance,[$scope]);
      }

      // process the template
      var newEl = $compile(opts.template)($scope);
      $el.replaceWith(newEl);
      return newEl;
    }

    return {
      attach: attach
    }
  };

  // create the plugin
  return {
    load: function(name,req,onload,config) {
      req([name,'text!'+name+'.html'],function(View,template) {
        View = View || {};
        View.template = template;
        onload(NgView(View));
      });
    }
  };
});
