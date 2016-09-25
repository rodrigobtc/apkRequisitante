myApp.controller('LaudarCtrl', function($scope,
  $stateParams,
  laudoFactory,
  connService,
  CONFIGURACOES) {

    $scope.idExame;
    $scope.laudo;


    $scope.getLaudo = function(mostraImagens) {
            $scope.idExame = $stateParams.exameId;
            connService.getREST('/laudo/1/1')
              .then(function(tiposlaudos) {
                laudoFactory.setLaudo(tiposlaudos)
                $scope.laudo = laudoFactory.getLaudo();
                if (mostraImagens) {
                  window.location.href = "#/app/imagens";
                }
            })
    }

});
