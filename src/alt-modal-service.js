;(function(ng) {
  'use strict';

  ng.module('alt.modal-service', [])
    .service('AltModalService', [function() {
      this.open = function(id, opts) {
        if (ng.isUndefined(id)) {
            throw new TypeError('O id do modal deve ser informado para que o mesmo seja aberto.');
        }

        $(id).modal(opts || 'show');
        $(id).data('bs.modal').options.backdrop = 'static';
        $(id).data('bs.modal').options.keyboard = false;
      };

      this.close = function(id, opts) {
        if (ng.isUndefined(id)) {
            throw new TypeError('O id do modal deve ser informado para que o mesmo seja fechado.');
        }

        $(id).modal(opts || 'hide');
      };
    }]);
}(angular));
