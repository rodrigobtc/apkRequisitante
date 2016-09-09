myApp.controller('PacientesCtrl', function($scope, $http, exameFactory, $ionicLoading, CONFIGURACOES) {
    $scope.getPacientes = function() {
        $ionicLoading.show();
        $http.get('http://' + CONFIGURACOES.baseUrl + '/pacientes/' + $scope.pacienteData.searchText)
            .then(function(data, status, headers, config) {
                $scope.pacientes = data.data;
                $ionicLoading.hide();
            }, function(data, status, headers, config) {
                $ionicLoading.hide();
            });
    }

    $scope.selecionaPaciente = function(item) {
        exameFactory.setPaciente(item);
        $scope.closePaciente();
    }

    $scope.closePaciente = function() {
        $scope.pacienteModal.hide();
    };
});
