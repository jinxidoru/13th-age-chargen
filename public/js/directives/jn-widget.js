define(function(require) {
  return {
    restrict: 'A',
    link: function($scope,elem,attrs) {
      var name = attrs.jnWidget;
      require(["ngView!"+name],function(Widget) {
        Widget.attach(elem);
      },function(err) {
        console.error("unable to find widget named `" + name + "`");
        elem.remove();
      });
    }
  }
});
