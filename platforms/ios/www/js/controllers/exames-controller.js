.controller('ExamesCtrl', function($scope, $http) {
    $scope.exames = [];
    $scope.getExames = function() {
        $http.get('http://192.168.10.103:8081/exames')
            .then(function(data, status, headers, config) {
                $scope.exames = data.data;
            }, function(data, status, headers, config) {

            });
    }
    $scope.getExames();
})
