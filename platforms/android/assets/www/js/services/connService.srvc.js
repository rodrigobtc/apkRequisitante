myApp.factory('connService', function($http, CONFIGURACOES, $ionicLoading) {
  var connService = {
    getREST: function(servico) {
      $ionicLoading.show();
      var promise = $http.get('http://' + CONFIGURACOES.baseUrl + servico)
      .then(function (response) {
        $ionicLoading.hide();
        return response.data;
      });
      return promise;
    },
    postREST: function(servico, dados) {
      $ionicLoading.show({template:'Informações salvas.', duration:3000});
      return $http.post('http://' + CONFIGURACOES.baseUrl + servico, dados);
    }
  };
  return connService;
});
