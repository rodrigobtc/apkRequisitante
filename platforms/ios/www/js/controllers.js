angular.module('starter.controllers', ['ionic', 'ngCordova'])

.controller('AppCtrl', function($scope, $ionicModal, $timeout, $cordovaCamera) {

  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  $scope.loginData = {};
  $scope.pacienteData = {};
  $scope.pacientes = [];
  $scope.exame = {};

  // Create the login modal that we will use later
  $ionicModal.fromTemplateUrl('templates/login.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modal = modal;
  });

  // Triggered in the login modal to close it
  $scope.closeLogin = function() {
    $scope.modal.hide();
  };

  // Open the login modal
  $scope.login = function() {
    $scope.modal.show();
  };

  // Perform the login action when the user submits the login form
  $scope.doLogin = function() {
    console.log('Fazendo login', $scope.loginData);

    // Simulate a login delay. Remove this and replace with your login
    // code if using a login system
    $timeout(function() {
      $scope.closeLogin();
    }, 1000);
  };



    $ionicModal.fromTemplateUrl('templates/procura-paciente.html', {
          scope: $scope,
          animation: 'slide-in-up',
       }).then(function(modal) {
         $scope.pacienteModal = modal;
         $scope.pacienteData.searchText = "";
       });


})




.controller('ExamesCtrl', function($scope, $http, $stateParams) {
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

.controller('ExameDtlCtrl', function($scope, $http, $stateParams) {

  $scope.getExame = function() {
    $http.get('http://192.168.10.103:8081/exames/' + $stateParams.exameId)
    .then(function(data, status, headers, config) {
        $scope.exame = data.data;
    }, function(data, status, headers, config) {

    });
  }
  //$scope.getExame();

  $scope.salvarExame = function() {
    $http({
              method: 'POST',
              url: 'http://192.168.10.103:8081/exames',
              data: $scope.exame
            })
      .then(
        function(response){
          $scope.getExames();
          window.location.href = "#/app/exames"
        },
        function(response){

        });
  }

  $scope.novoExame = function() {
    $scope.exame = {};
  }

  $scope.openPaciente = function() {
    if ($scope.exame.idExame === undefined) {
      $scope.pacienteModal.show();
    }
  };



})



.controller('PacientesCtrl', function($scope, $http) {
  $scope.getPacientes = function() {
    $http.get('http://192.168.10.103:8081/pacientes/' + $scope.pacienteData.searchText)
    .then(function(data, status, headers, config) {
      $scope.pacientes = data.data;
    }, function(data, status, headers, config) {

    });
  }

  $scope.selecionaPaciente = function(item) {
    $scope.exame.nomePaciente = item.nome;
    $scope.exame.codigoPaciente = item.id;
    $scope.closePaciente();
    $scope.pacientes = [];
  }

  $scope.closePaciente = function() {
     $scope.pacienteModal.hide();
  };
})




.controller('ImagensCtrl', function($scope, $cordovaCamera, $ionicLoading, $cordovaFileTransfer) {
$scope.status = "testando";
    $scope.imagens = [];
    $scope.tipoFotos = [{
                      	"id": "1",
                      	"descricao": "Foto total",
                      	"mensagem": "aqui você deve tirar uma foto de corpo"
                      }, {
                      	"id": "2",
                      	"descricao": "Foto parcial",
                      	"mensagem": "aqui você deve tirar uma foto parcial"
                      }, {
                      	"id": "3",
                      	"descricao": "Foto lesão",
                      	"mensagem": "aqui você deve tirar uma foto da lesão"
                      }];

    $scope.takePicture = function() {

        var options = {
            quality: 100,
            destinationType: Camera.DestinationType.FILE_URL,
            sourceType: Camera.PictureSourceType.CAMERA
        };

        $cordovaCamera.getPicture(options).then(
            function(imageData) {
                $scope.picData = imageData;
                $scope.ftLoad = true;
            },
            function(err) {
            })
    }

    $scope.uploadPicture = function() {
      // Destination URL
      var url = "http://192.168.10.103:8081/upload/1";

      //File for Upload
      var targetPath = $scope.picData;

      // File name only
      var filename = "nomedoarquivo";

      var options = {
           fileKey: "file",
           fileName: filename,
           chunkedMode: false,
           mimeType: "image/jpg",
           params : {'directory':'upload', 'fileName':filename}
       };

       $cordovaFileTransfer.upload(url, targetPath, options).then(function (result) {
           console.log("SUCCESS: " + JSON.stringify(result.response));
           $scope.status = "enviando";
       }, function (err) {
            $scope.status = "nao deu";
           console.log("ERROR: " + JSON.stringify(err));
       }, function (progress) {
           // PROGRESS HANDLING GOES HERE
       });
    }


})

;
