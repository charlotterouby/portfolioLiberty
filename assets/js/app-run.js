// Initialisation du Service Projects
myPortfolio.run(function ($http, Projects) {
    $http
        .get('assets/js/projects.json')
        .then(function (httpResponse) {
//            console.log(httpResponse.data);
            return httpResponse.data;
        }).then(function (data) {
//            console.log(data);
            angular.forEach(data.projects, function (project) {
                Projects.add(project);
//                console.log(project);
            });
        });
});

//Config Theme MaterialDesign
//
//myPortfolio.config(function ($mdThemingProvider) {
//    $mdThemingProvider.theme('charlotte')
//      .primaryPalette('teal')
//      .accentPalette('pink');
//  });

myPortfolio.config(function($mdIconProvider) {
  $mdIconProvider.fontSet('md', 'material-icons');
});
