myApp.controller('LaudosCtrl', function($scope, connService, $ionicLoading) {
    $scope.exames = [];

    // datas para preencher os objetos de filtro
    $scope.dataInicial = new Date();
    $scope.dataFinal = new Date();

    $scope.datainicio = {
        date: new Date(), // MANDATORY
        mondayFirst: false,
        months: ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'],
        daysOfTheWeek: ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sab'],
        startDate: new Date(1989, 1, 26),
        endDate: new Date(2089, 1, 26),
        disablePastDays: false,
        disableSwipe: false,
        disableWeekend: false,
        //disableDates: disableDates,
        //disableDaysOfWeek: disableDaysOfWeek,
        showDatepicker: false,
        showTodayButton: true,
        calendarMode: false,
        hideCancelButton: true,
        hideSetButton: true,
        //highlights: highlights
        callback: function(value){
            // your code
        }
    };

    $scope.datafim = {
        date: new Date(), // MANDATORY
        mondayFirst: false,
        months: ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'],
        daysOfTheWeek: ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sab'],
        startDate: new Date(1989, 1, 26),
        endDate: new Date(2089, 1, 26),
        disablePastDays: false,
        disableSwipe: false,
        disableWeekend: false,
        //disableDates: disableDates,
        //disableDaysOfWeek: disableDaysOfWeek,
        showDatepicker: false,
        showTodayButton: true,
        calendarMode: false,
        hideCancelButton: true,
        hideSetButton: true,
        //highlights: highlights
        callback: function(value){
            // your code
        }
    };


    $scope.getExamesLaudos = function() {
        $scope.random = Math.random();
        connService.getREST('/exames/')
          .then(function(exames) {
            $scope.exames = exames;
        })
      }

      $scope.abreLaudo = function (exameId, random, funcao) {
        window.location.href = '#/app/'+ funcao +'/'+ exameId + '/'+ random;
      }

      $scope.onHold = function($ionicLoading) {
          $ionicLoading.show({template:'Ai, como você me aperta!', duration:3000});
      }
});
