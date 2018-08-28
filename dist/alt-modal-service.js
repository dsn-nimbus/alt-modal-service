;(function(ng) {
  'use strict';

  ng.module('alt.modal-service', [])
    .service('AltModalService', ['$timeout', '$q', function($timeout, $q) {

      var MODAL_CLOSE_TIMEOUT = 3000;
      var MODAL_OPEN_TIMEOUT = 3000;

      this.open = function(id, opts) {
        return $q(function(res, rej) {
          if (ng.isUndefined(id)) {
            rej('O id do modal deve ser informado para que o mesmo seja aberto.');
          }

          $(id).on('shown.bs.modal', function() {
            res();
          });

          $(id).modal(opts || 'show');

          var modal = $(id).data('bs.modal');
          if (!!modal) {
            modal.options.backdrop = 'static';
            modal.options.keyboard = false;
          }

          $timeout(function() {
            rej('Erro ao abrir modal ' + id + ', tempo de espera excedido.');
          }, MODAL_OPEN_TIMEOUT);
        });
      };

      this.close = function(id, opts) {
        return $q(function(res, rej) {
          if (ng.isUndefined(id)) {
            rej('O id do modal deve ser informado para que o mesmo seja fechado.');
          }

          $(id).on('hidden.bs.modal', function() {
            res();
          });

          $(id).modal(opts || 'hide');

          $timeout(function() {
            rej('Erro ao fechar modal ' + id + ', tempo de espera excedido.');
          }, MODAL_CLOSE_TIMEOUT);
        });
      };
    }]);
}(angular));
