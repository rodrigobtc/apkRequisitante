myApp.factory('exameFactory', function(connService){
  var examePriv = {};

  return {
    getExame: function() {
      return examePriv;
    },
    setExame: function(exame) {
      examePriv = exame;
    },
    setPaciente: function(_paciente) {
      examePriv.nomePaciente = _paciente.nome;
      examePriv.codigoPaciente = _paciente.id;
    },
    novoExame: function(){
      examePriv = {};
      /*examePriv = {
        "id":999,
        "descricao":"testando com obj interno",
        "indicacao":"testando indicacao",
        "nomePaciente":"Harley wagner",
        "codigoPaciente":3,
        "imagens":[],
        "cpf":"03355389919"

      };*/
    }
  }
});
