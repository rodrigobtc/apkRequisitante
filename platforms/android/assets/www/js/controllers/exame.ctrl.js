myApp.controller('ExameDtlCtrl', function($scope,
  $stateParams,
  exameFactory,
  $location,
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

        /*
        $http({
                method: 'POST',
                //url: 'http://requestb.in/tl9pratl',
                url: 'http://' + CONFIGURACOES.baseUrl + '/exames',
                data: $scope.exame
            })
            .then(
                function(response) {
                  $ionicLoading.show({template:'Informações salvas.', duration:3000});
                  exameFactory.setExame($scope.exame);
                  window.location.href = "#/app/exame/" + response.data.id + "/" + 1
                },
                function(response) {
                  //$ionicLoading.show({template:'Ocorreu um problema ao salvar informações', duration:5000});
                  $ionicLoading.show(response.data);
                  //window.location.href = "#/app/exame/" + $scope.exame.id
                });*/
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
