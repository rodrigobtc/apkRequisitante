myApp.controller('ExameDtlCtrl', function($scope,
  $http,
  $stateParams,
  exameFactory,
  $ionicLoading,
  $location,
  CONFIGURACOES) {

    $scope.idExame;

    $scope.getExame = function(mostraImagens) {
            $ionicLoading.show()
            $scope.idExame = $stateParams.exameId;
            $http.get('http://' + CONFIGURACOES.baseUrl + '/exames/' + $scope.idExame + '/' + mostraImagens)
                .then(function(data, status, headers, config) {
                    exameFactory.setExame(data.data);
                    $scope.exame = exameFactory.getExame();
                    $ionicLoading.hide();
                    if (mostraImagens) {
                      window.location.href = "#/app/imagens";
                    }
                }, function(data, status, headers, config) {
                    $ionicLoading.hide();
                });
    }

    $scope.salvarExame = function() {
        $ionicLoading.show({template:'Informações salvas.', duration:3000});

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
                });
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
