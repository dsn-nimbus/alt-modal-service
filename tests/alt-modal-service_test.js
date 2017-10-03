'use strict';

describe('Service: AltModalService', function() {
  var _AltModalService;

  beforeEach(module('alt.modal-service'));

  beforeEach(inject(function($injector) {
    _AltModalService = $injector.get('AltModalService');
  }));

  describe('close', function() {
      it('deve dar um erro, id do modal não informado', function() {
          var _id = undefined;

          spyOn($.fn, 'modal').and.callThrough();

          expect(function() {
            _AltModalService.close(_id);
          }).toThrow(new TypeError('O id do modal deve ser informado para que o mesmo seja fechado.'));

          expect($('a').modal).not.toHaveBeenCalled();
      })

      it('deve chamar o close do modal com o id passado - hide', function() {
          var _id = '#abc';

          spyOn($.fn, 'modal').and.callThrough();

          _AltModalService.close(_id);

          expect($('a').modal).toHaveBeenCalledWith("hide");
      })

      it('deve chamar o close do modal com o id passado - options passadas', function() {
        var _id = '#abc';
        var _opts = {backdrop: 'static', keyboard: true};

        spyOn($.fn, 'modal').and.callThrough();

        _AltModalService.close(_id, _opts);

        expect($('a').modal).toHaveBeenCalledWith(_opts);
      })
  })

  describe('open', function() {
    it('deve dar um erro, id do modal não informado', function() {
      var _id = undefined;

      spyOn($.fn, 'modal').and.callThrough();

      expect(function()
      {
        _AltModalService.open(_id);
      }).toThrow(new TypeError('O id do modal deve ser informado para que o mesmo seja aberto.'));

      expect($('a').modal).not.toHaveBeenCalled();
    })

    it('deve chamar o open do modal com o id passado - show', function() {
      var _id = '#abc';

      spyOn($.fn, 'modal').and.callThrough();
      spyOn($.fn, 'data').and.returnValue({
        options: {
          backdrop: 'a'
        }
      })

      _AltModalService.open(_id);

      expect($('a').modal).toHaveBeenCalledWith("show");
    })

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

      expect($('a').modal).toHaveBeenCalledWith(_opts);
    })
  })
});
