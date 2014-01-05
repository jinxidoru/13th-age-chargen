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
      var $scope = isolate(parentScope,opts.scope,$el);

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


  //! This function will create a brand new isolate scope from the parent and properly attach it according to the
  //! provided scope declaration.
  function isolate(parent,decl,$el) {
    var $scope = parent.$new(true);

    // attach each variable
    _.each(decl,function(type,name) {
      var attr = $el ? $el.attr(name) : name;
      if ( type == '=' ) {
        $scope[name] = parent[attr];
        $scope.$watch(name,function(val) {
          parent[attr] = val;
        });
        parent.$watch(attr,function(val) {
          if ( $scope )
            $scope[name] = val;
        });
      }
    });

    // clean up the context to aid gc
    decl = $el = null;
    $scope.$watch('$destroy',function() {
      $scope = null;
    });

    return $scope;
  }


  // create the plugin
  return {
    isolate: isolate,
    load: function(name,req,onload,config) {
      req([name,'text!'+name+'.html'],function(View,template) {
        View = View || {};
        View.template = template;
        onload(NgView(View));
      });
    }
  };
});
