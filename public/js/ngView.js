"use strict";
define(function(require) {
  var injector = angular.element('html').injector();
  var $compile = injector.get('$compile');

  //! This is the view class
  function NgView(opts) {

    //! Get the template, compiling if necessary.
    var templateFn = function($scope) {
      templateFn = $compile(opts.template);
      return templateFn($scope);
    }

    //! Attach this view to the DOM.
    function attach($el) {

      // create the element
      var parentScope = angular.element($el).scope();
      var $scope = parentScope.$new(true);
      var newEl = templateFn($scope);
      $el.replaceWith(newEl);

      // invoke the controller
      var instance = { element:newEl };
      opts.controller.apply(instance,[$scope]);
    }

    return {
      attach: attach
    }
  };

  // create the plugin
  return {
    load: function(name,req,onload,config) {
      req([name,'text!Main.html'],function(View,template) {
        View.template = template;
        onload(NgView(View));
      });
    }
  };
});
