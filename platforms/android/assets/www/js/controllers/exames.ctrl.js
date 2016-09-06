myApp.controller('ExamesCtrl', function($scope, $http, $stateParams, $ionicLoading, CONFIGURACOES) {
    $scope.exames = [];
    $scope.getExames = function() {
        $ionicLoading.show();
        $scope.random = Math.random();
        $http.get('http://' + CONFIGURACOES.baseUrl + '/exames')
            .then(function(data, status, headers, config) {
                $scope.exames = data.data;
                $ionicLoading.hide();
            }, function(data, status, headers, config) {
                $ionicLoading.hide();
            });
    }
});
