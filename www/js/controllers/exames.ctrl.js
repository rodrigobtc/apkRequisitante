myApp.controller('ExamesCtrl', function($scope, connService) {
    $scope.exames = [];
    $scope.getExames = function() {
        $scope.random = Math.random();
        connService.getREST('/exames/')
          .then(function(exames) {
            $scope.exames = exames;
        })
      }
});
