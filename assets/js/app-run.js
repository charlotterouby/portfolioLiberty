// Initialisation du Service Projects
myPortfolio.run(function ($http, Projects) {
    $http
        .get('assets/js/projects.json')
        .then(function (httpResponse) {
            return httpResponse.data;
        }).then(function (data) {
            angular.forEach(data.projects, function (project) {
                Projects.add(project);
            });
        });
});

//Config Theme MaterialDesign
//
//myPortfolio.config(function ($mdThemingProvider, $mdIconProvider) {
//    $mdThemingProvider.theme('charlotte')
//      .primaryPalette('teal')
//      .accentPalette('pink');
//    $mdIconProvider
//      .defaultIconSet('img/icons/sets/social-icons.svg', 24);
//  });
