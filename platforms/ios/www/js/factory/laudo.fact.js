myApp.factory('laudoFactory', function(){
  var laudoPriv = {};
  var tiposDetalhesLaudo = [];

  return {
    getLaudo: function() {
      return laudoPriv;
    },
    setLaudo: function(laudo) {
      laudoPriv = laudo;
    },
    novoLaudo: function(){
      laudoPriv = {};
    },
    setTiposDetalhesLaudo: function(tiposDetalhes) {
      tiposDetalhesLaudo = tiposDetalhes;
    },
    getTiposDetalhesLaudos: function() {
      return tiposDetalhesLaudo;
    }
  }
});
