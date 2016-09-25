myApp.controller('ExamesCtrl', function($scope, connService) {
    $scope.exames = [];

    // datas para preencher os objetos de filtro
    $scope.dataInicial = new Date();
    $scope.dataFinal = new Date();


    $scope.getExames = function(funcao) {
        $scope.random = Math.random();
        connService.getREST('/exames/')
          .then(function(exames) {
            $scope.exames = exames;
        })
      }

      $scope.abreExame = function (exameId, random, funcao) {
        window.location.href = '#/app/'+ funcao +'/'+ exameId + '/'+ random;
      }
});
