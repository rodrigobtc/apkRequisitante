myApp.factory('pacienteFactory', function(){
  var pacientePriv = {};

  return {
    getPaciente: function() {
      return pacientePriv;
    },
    setPaciente: function(paciente) {
      pacientePriv = paciente;
    }
  }
});
