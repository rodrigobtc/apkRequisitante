myApp.controller('ExameDtlCtrl', function($scope,
  $stateParams,
  exameFactory,
  connService,
  CONFIGURACOES) {

    $scope.idExame;

    $scope.getExame = function(mostraImagens) {
            $scope.idExame = $stateParams.exameId;
            connService.getREST('/exames/' + $scope.idExame + '/' + mostraImagens)
              .then(function(exameDetalhe) {
                exameFactory.setExame(exameDetalhe);
                $scope.exame = exameFactory.getExame();
                if (mostraImagens) {
                  window.location.href = "#/app/imagens";
                }
            })
    }

    $scope.salvarExame = function() {
        connService.postREST('/exames', $scope.exame)
        .then(
          function(retorno) {
            exameFactory.setExame(retorno.data);
            window.location.href = "#/app/exame/" + retorno.data.id + "/" + 1;
          }
        );
    }

    $scope.novoExame = function() {
        exameFactory.novoExame();
        $scope.exame = exameFactory.getExame();
    }

    $scope.openPaciente = function() {
        if (!$scope.exame.id > 0) {
            $scope.pacienteModal.show();
        }
    };

});
