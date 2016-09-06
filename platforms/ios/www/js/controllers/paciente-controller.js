.controller('PacientesCtrl', function($scope, $http) {
    $scope.getPacientes = function() {
        $http.get('http://192.168.10.103:8081/pacientes/' + $scope.pacienteData.searchText)
            .then(function(data, status, headers, config) {
                $scope.pacientes = data.data;
            }, function(data, status, headers, config) {

            });
    }

    $scope.selecionaPaciente = function(item) {
        $scope.exame.paciente = item.nome;
        $scope.exame.idPaciente = item.id;
        $scope.closePaciente();
        $scope.pacientes = [];
    }
})
