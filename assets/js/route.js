myPortfolio.config(function($routeProvider, $locationProvider) {
    $routeProvider
        //Landing page
        .when('/', {
            templateUrl: 'dist/templates/landing-template.html'
        })
        //CV page
        .when('/cv', {
            templateUrl: 'dist/templates/presentation-template.html'
        })
        //Grid Portfolio
        .when('/portfolio', {
            templateUrl: 'dist/templates/portfolio-template.html'
        })
        //Description Project
        .when('/portfolio/:id', {
            templateUrl: 'dist/templates/project-template.html'
        })
        // Infos contact
        .when('/contact', {
            templateUrl: 'dist/templates/contact-template.html'
        })
        //Default Behavior
        .otherwise({
            redirectTo: '/'
        });

    $locationProvider.html5Mode(true);
});
