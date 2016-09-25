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

    $scope.salvarLaudo = function() {
        connService.postREST('/laudo', $scope.laudo)
        .then(
          function(retorno) {
            exameFactory.setExame(retorno.data);
            window.location.href = "#/app/laudar/" + retorno.data.id + "/" + 1;
          }
        );
    }


});
