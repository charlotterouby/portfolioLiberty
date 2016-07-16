// Initialisation du Service Projects
myPortfolio.run(function ($http, Projects) {
    $http
        .get('dist/templates/projects.json')
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


myPortfolio.config(function ($mdIconProvider, $mdThemingProvider) {
    // Config font Icons
    $mdIconProvider.fontSet('md', 'material-icons').fontSet('fa', 'font-awesome');

    // Extend the teal theme with different colors
    var customTealMap = $mdThemingProvider.extendPalette('teal', {
        '300': '#5bb4b4',
        '500': '#378c8c',
        '800': '#024242',
        'A100': '#8ad9d9'
    });

    // Extend the pink theme with different colors
    var peachMap = $mdThemingProvider.extendPalette('pink', {
        'A100': '#ffc8c8',
        'A200': '#ffa2a2',
        'A400': '#ff8080',
        'A700': '#e95b5b'
    });

    // Extend the yellow theme with different colors
    var jauneMap = $mdThemingProvider.extendPalette('yellow', {
        '300': '#ffe0a2',
        '500': '#ffd580',
        '800': '#e9ba5b',
        'A100': '#ffedc8'
    });

    // Register the new color palette maps
    $mdThemingProvider.definePalette('customTeal', customTealMap)
        .definePalette('peach', peachMap)
        .definePalette('jaune', jauneMap);

    //Config Theme MaterialDesign
    $mdThemingProvider.theme('default')
        .primaryPalette('customTeal')
        .accentPalette('peach')
        .warnPalette('jaune');

});
