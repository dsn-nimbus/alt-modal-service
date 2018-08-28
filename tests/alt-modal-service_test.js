'use strict';

describe('Service: AltModalService', function() {
  var _AltModalService, _timeout, _rootScope, _q, _compile, _scope;

  beforeEach(module('alt.modal-service'));
  beforeEach(module('alt.modal-service-test-enviroment'));

  beforeEach(inject(function($injector) {
    _rootScope = $injector.get('$rootScope');
    _scope = _rootScope.$new();

    _compile = $injector.get('$compile');
    _q = $injector.get('$q');
    _AltModalService = $injector.get('AltModalService');
    _timeout = $injector.get('$timeout');
  }));

  describe('open', function() {
    it('deve chamar o open do modal com o id passado - show', function() {
      var _id = '#abc';

      spyOn($.fn, 'modal').and.callThrough();
      spyOn($.fn, 'data').and.returnValue({
        options: {
          backdrop: 'a'
        }
      })

      _AltModalService.open(_id);

      expect($('#abc').modal).toHaveBeenCalledWith("show");
    });

    it('deve chamar o open do modal com o id passado - options passadas', function() {
      var _id = '#abc';
      var _opts = {backdrop: 'static', keyboard: true};

      spyOn($.fn, 'modal').and.callThrough();
      spyOn($.fn, 'data').and.returnValue({
        options: {
          backdrop: 'a'
        }
      })

      _AltModalService.open(_id, _opts);

      expect($('#abc').modal).toHaveBeenCalledWith(_opts);
    });

    it('deve resolver quando modal é aberta com sucesso', function() {

      var html = '<div class="modal" id="meu-teste-modal" alt-modal-service-modal-unit-test></div>';
      var element = angular.element(html);
      _compile(element)(_scope);
      _rootScope.$digest();
      
      var isolateScope = element.isolateScope();
      
      isolateScope.abrirModal()
      .then(function() {
        expect(true).toBe(true);
      })
      .catch(function() {
        expect(false).toBe(true);
      });

      _rootScope.$digest();
    });

    it('deve rejeitar quando o id do modal não informado', function() {
      var _id = undefined;

      spyOn($.fn, 'modal').and.callThrough();

      _AltModalService.open(_id)
      .then(function() {
        expect(false).toBe(true);
      })
      .catch(function(err) {
        expect(err).toBe('O id do modal deve ser informado para que o mesmo seja aberto.');
      });

      _rootScope.$digest();
    });

    it('deve rejeitar quando id passado modal não é aberta com sucesso dentro do tempo limite', function() {
      var _id = '#id-inexistente-no-dom';

      spyOn($.fn, 'modal').and.callThrough();

      _AltModalService.open(_id)
      .then(function() {
        expect(false).toBe(true);
      })
      .catch(function(err) {
        expect(err).toBe('Erro ao abrir modal #id-inexistente-no-dom, tempo de espera excedido.');
      });

      _timeout.flush(3001);
      _rootScope.$digest();
    });
  });

  describe('close', function() {
    it('deve chamar o close do modal com o id passado - hide', function() {
        var _id = '#abc';

        spyOn($.fn, 'modal').and.callThrough();

        _AltModalService.close(_id);

        expect($('#abc').modal).toHaveBeenCalledWith("hide");
    });

    it('deve chamar o close do modal com o id passado - options passadas', function() {
      var _id = '#abc';
      var _opts = {backdrop: 'static', keyboard: true};

      spyOn($.fn, 'modal').and.callThrough();

      _AltModalService.close(_id, _opts);

      expect($('#abc').modal).toHaveBeenCalledWith(_opts);
    });

    it('deve resolver quando modal é fechada com sucesso', function() {

      var html = '<div class="modal" id="meu-teste-modal" alt-modal-service-modal-unit-test></div>';
      var element = angular.element(html);
      _compile(element)(_scope);
      _rootScope.$digest();
      
      var isolateScope = element.isolateScope();
      
      isolateScope.abrirModal()
      .then(function() {
        
        return isolateScope.fecharModal()
      })
      .then(function() {
        expect(true).toBe(true);
      })
      .catch(function() {
        expect(false).toBe(true);
      });

      _rootScope.$digest();
    });

    it('deve rejeitar quando id do modal não informado', function() {
      var _id = undefined;

      _AltModalService.close(_id)
      .then(function() {
        expect(false).toBe(true);
      })
      .catch(function(err) {
        expect(err).toBe('O id do modal deve ser informado para que o mesmo seja fechado.');
      });

      _timeout.flush(3001);
      _rootScope.$digest();
    });

    it('deve rejeitar quando modal não é fechada com sucesso dentro do tempo limite', function() {
      var _id = '#id-inexistente-no-dom';

      _AltModalService.close(_id)
      .then(function() {
        expect(false).toBe(true);
      })
      .catch(function(err) {
        expect(err).toBe('Erro ao fechar modal #id-inexistente-no-dom, tempo de espera excedido.');
      });

      _timeout.flush(3001);
      _rootScope.$digest();
    });
  });

});
