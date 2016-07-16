// Déclaration du module "myPortfolio"
var myPortfolio = angular.module('myPortfolio', ['ngRoute', 'ngMaterial', 'akoenig.deckgrid', 'youtube-embed']);

// ProjectsService
function ProjectsService() {
    var self = this,
        projects = [];

    self.add = function (data) {
        // console.log(data);
        if (projects.includes(data.id) === false) {
            projects.push(data);
            // console.log(projects);
        }
    };

    self.get = function () {
        return projects;
    };
}
myPortfolio.service("Projects", ProjectsService);

//Navbar Directive
myPortfolio.directive('myNavbar', function () {
    return {
        templateUrl: 'dist/templates/navbarDirective/navbar-template.html',
        restrict: 'EA',
//        link: function NavBarConfig($rootScope, $scope) {
//            $rootScope.$on('$routeChangeSuccess', function (event, current) {
//                $scope.currentLink = getCurrentLinkFromRoute(current);
//            });
//        }
    }
});

// PortfolioController
function PortfolioController(Projects, $location) {
    var self = this;
    self.projects = Projects.get();
//    console.log(self.projects);

    // Fonction permettant de naviguer vers une page projet en particulier
    self.goTo = function(projectId) {
//        console.log("fonction goTo");
        var newLocation = "project/" + projectId;
        $location.path(newLocation);
    }
}
myPortfolio.controller('PortfolioController', PortfolioController);

//ProjectController
function ProjectController(Projects, $routeParams) {
    var self = this;
    var projects = Projects.get();
    var idSearch = $routeParams.id;
    var currentProject = {};

    projects.forEach(function (element, index, array) {
//        console.log(element.id);
//        console.log(index);
        if (element.id === idSearch) {
            currentProject = projects[index];
        }
    });

    console.log(currentProject);

    if (currentProject !== undefined) {
        self.project = currentProject;
    }

}
myPortfolio.controller('ProjectController', ProjectController);

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

myPortfolio.config(function($routeProvider, $locationProvider) {
    $routeProvider
        //Landing page
        .when('/accueil', {
            templateUrl: 'dist/templates/landing-template.html'
        })
        //CV page
        .when('/cv', {
            templateUrl: 'dist/templates/presentation-template.html'
        })
        //Grid Portfolio
        .when('/portfolio', {
            templateUrl: 'dist/templates/portfolio/portfolio-template.html',
            controller: 'PortfolioController',
            controllerAs: 'portfolioCtrl'
        })
        //Description Project
        .when('/project/:id', {
            templateUrl: 'dist/templates/project/project-template.html',
            controller: 'ProjectController',
            controllerAs: 'projectCtrl'
        })
        // Infos contact
        .when('/contact', {
            templateUrl: 'dist/templates/contact-template.html'
        })
        //Default Behavior
        .otherwise({
            redirectTo: '/accueil'
        });

    $locationProvider.html5Mode(true);
});

//# sourceMappingURL=dist/scripts.js.map
