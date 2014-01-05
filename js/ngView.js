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

      // attach the scope
      initScope(parentScope,$scope,opts.scope,$el);

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

  // populate a new scope using a scope definition
  function initScope(parent,$scope,decl,$el) {
    _.each(decl,function(type,name) {
      var attr = $el.attr(name);
      if ( type == '=' ) {
        $scope[name] = parent[attr];
        parent.$watch(attr,function(val) { $scope[name] = val; });
        $scope.$watch(name,function(val) { parent[attr] = val; });
      }
    });
  }

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
