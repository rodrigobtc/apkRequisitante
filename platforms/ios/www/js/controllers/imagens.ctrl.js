myApp.controller('ImagensCtrl', function($scope,
  $cordovaCamera,
  $ionicLoading,
  $cordovaFileTransfer,
  $stateParams,
  $http,
  exameFactory,
  CONFIGURACOES) {
    $scope.status = "";
    $scope.picData = {};
    $scope.exame = exameFactory.getExame();
    $scope.porcentagem = -1;
    $scope.strBase64 = 'data:image/png;base64,';


    $scope.takePicture = function(item) {
        $scope.strBase64 = '';

        var options = {
            quality: 100,
            destinationType: Camera.DestinationType.FILE_URL,
            sourceType: Camera.PictureSourceType.CAMERA,
            correctOrientation: true,
            saveToPhotoAlbum: false,
            allowEdit: true
        };

        $cordovaCamera.getPicture(options).then(
            function(imageData) {
                item.img = imageData;
                //$scope.picData = imageData;
                $scope.ftLoad = true;
            },
            function(err) {})
    }

    $scope.uploadPicture = function(item) {
        $ionicLoading.show();
        $scope.status = "Carregando imagem para o servidor. Aguarde...";

        // Destination URL
        var url = 'http://' + CONFIGURACOES.baseUrl + '/imagens/' + item.exame + "/" + item.imgId;

        //Arquivo Upload
        //var targetPath = $scope.picData;
        var targetPath = item.img;

        // Nome do arquivo
        var filename = "nomedoarquivo";

        var options = {
            fileKey: "file",
            fileName: filename,
            chunkedMode: false,
            mimeType: "image/jpg",
            params: {
                'directory': 'upload',
                'fileName': filename
            }
        };

        $cordovaFileTransfer.upload(url, targetPath, options).then(function(result) {
            console.log("SUCCESS: " + JSON.stringify(result.response));
            $scope.status = "Imagem salva com sucesso.";
            $ionicLoading.hide();
        }, function(err) {
            $ionicLoading.hide();
            $scope.status = "Ocorreu um erro ao carregar imagem.";
            console.log("ERROR: " + JSON.stringify(err));
        }, function(progress) {
            $scope.porcentagem = ((progress.loaded / progress.total) * 100);
        });
    }

    $scope.getImagens = function() {
            $ionicLoading.show()
            $scope.idExame = $stateParams.exameId;
            $http.get('http://' + CONFIGURACOES.baseUrl + '/exames/' + $stateParams.exameId + '/true')
                .then(function(data, status, headers, config) {
                    exameFactory.setExame(data.data);
                    $scope.exame = exameFactory.getExame();
                    $ionicLoading.hide();
                }, function(data, status, headers, config) {
                    $ionicLoading.hide();
                });
    }


});



/*
myApp.controller('ImagensCtrl', function($scope,
  $cordovaCamera,
  $ionicLoading,
  $cordovaFileTransfer,
  $stateParams,
  $http,
  exameFactory,
  CONFIGURACOES) {
    $scope.status = "";
    $scope.picData = {};
    $scope.exame = exameFactory.getExame();
    $scope.porcentagem = -1;

    $scope.takePicture = function(item) {

        var options = {
            quality: 100,
            destinationType: Camera.DestinationType.FILE_URL,
            sourceType: Camera.PictureSourceType.CAMERA,
            correctOrientation: true,
            saveToPhotoAlbum: false,
            allowEdit: true
        };

        $cordovaCamera.getPicture(options).then(
            function(imageData) {
                //item.img = imageData;
                $scope.picData = imageData;
                $scope.ftLoad = true;
            },
            function(err) {})
    }

    $scope.uploadPicture = function(item) {
        $ionicLoading.show();
        $scope.status = "Carregando imagem para o servidor. Aguarde...";

        // Destination URL
        var url = 'http://' + CONFIGURACOES.baseUrl + '/upload/' + item.exame + "/" + item.imgId;

        //Arquivo Upload
        var targetPath = $scope.picData;

        // Nome do arquivo
        var filename = "nomedoarquivo";

        var options = {
            fileKey: "file",
            fileName: filename,
            chunkedMode: false,
            mimeType: "image/jpg",
            params: {
                'directory': 'upload',
                'fileName': filename
            }
        };

        $cordovaFileTransfer.upload(url, targetPath, options).then(function(result) {
            console.log("SUCCESS: " + JSON.stringify(result.response));
            $scope.status = "Imagem salva com sucesso.";
            $ionicLoading.hide();
        }, function(err) {
            $ionicLoading.hide();
            $scope.status = "Ocorreu um erro ao carregar imagem.";
            console.log("ERROR: " + JSON.stringify(err));
        }, function(progress) {
            $scope.porcentagem = ((progress.loaded / progress.total) * 100);
        });
    }

    $scope.getImagens = function() {
      $http.get('http://' + CONFIGURACOES.baseUrl + '/imagens/' + $stateParams.exameId)
          .then(function(data, status, headers, config) {
            exameFactory.setExame(data.data);
            $scope.exame = exameFactory.getExame();
            $ionicLoading.hide();
          }, function(data, status, headers, config) {
            $ionicLoading.hide();
          });

    }

    $scope.getImagens();

});
*/
