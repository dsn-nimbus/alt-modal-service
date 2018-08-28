; (function (ng) {
  "use strict";

  ng.module('alt.modal-service-test-enviroment', [
    'alt.modal-service'
  ])
  .directive('altModalServiceModalUnitTest', ['AltModalService', function(AltModalService) {
    return {
      restrict: 'A',
      scope: {},
      link: function(scope, elem) {

        scope.abrirModal = function() {
          return AltModalService.open(elem);
        };

        scope.fecharModal = function(opts) {
          return AltModalService.close(elem, opts);
        };
      }
    };
  }]);

}(angular));