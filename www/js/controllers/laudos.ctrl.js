myApp.controller('LaudosCtrl', function($scope, connService) {
    $scope.exames = [];

    // datas para preencher os objetos de filtro
    $scope.dataInicial = new Date();
    $scope.dataFinal = new Date();


    $scope.getExamesLaudos = function() {
        $scope.random = Math.random();
        connService.getREST('/exames/')
          .then(function(exames) {
            $scope.exames = exames;
        })
      }

      $scope.abreLaudo = function (exameId, random, funcao) {
        window.location.href = '#/app/'+ funcao +'/'+ exameId + '/'+ random;
      }
});
