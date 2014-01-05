define(function(require) {
  return {
    restrict: 'A',
    link: function($scope,elem,attrs) {
      var name = attrs.jnWidget;
      require(["ngView!"+name],function(Widget) {
        Widget.attach(elem);

        // digest
        if ( !$scope.$$phase )
          $scope.$digest();

      },function(err) {
        console.error("unable to find widget named `" + name + "`");
        elem.remove();
      });
    }
  }
});
