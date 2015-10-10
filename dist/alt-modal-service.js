;(function() {
  'use strict';

  angular
    .module('alt.modal-service', [])
    .service('AltModalService', [function() {
      this.close = function(id, opts) {
        if (angular.isUndefined(id)) {
            throw new TypeError('O id do modal deve ser informado para que o mesmo seja fechado.');
        }

        $(id).modal(opts || 'hide');
      };

      this.open = function(id, opts) {
        if (angular.isUndefined(id)) {
            throw new TypeError('O id do modal deve ser informado para que o mesmo seja aberto.');
        }

        $(id).modal(opts || 'show');
      };
    }]);
}());
