// Déclaration du module "myPortfolio"
var myPortfolio = angular.module('myPortfolio', ['ngRoute', 'ngMaterial', 'akoenig.deckgrid', 'youtube-embed']);

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

// ProjectsService
function ProjectsService() {
    var self = this,
        projects = {},
        video = {},
        printDesign = {},
        branding = {},
        webdesign = {},
        devWeb = {};

    self.add = function (data) {
        //console.log(data);
        if (projects[data.id] === undefined) {
            projects[data.id] = data;
            //console.log(projects);
        }

        if (data.categories.video === true && video[data.id] === undefined) {
            video[data.id] = data;
            //console.log(video);
        }
        if (data.categories.printDesign === true && printDesign[data.id] === undefined) {
            printDesign[data.id] = data;
            //console.log(printDesign);
        }
        if (data.categories.branding === true && branding[data.id] === undefined) {
            branding[data.id] = data;
            //console.log(branding);
        }
        if (data.categories.webdesign === true && webdesign[data.id] === undefined) {
            webdesign[data.id] = data;
            //console.log(webdesign);
        }
        if (data.categories.devWeb === true && devWeb[data.id] === undefined) {
            devWeb[data.id] = data;
            //console.log(devWeb);
        }

    };

    self.remove = function (dataId) {
        delete projects[dataId];
    };

    self.get = function (category) {
        switch (category) {
        case "all":
            return projects;
        case "video":
            return video;
        case "printDesign":
            return printDesign;
        case "branding":
            return branding;
        case "webdesign":
            return webdesign;
        case "devWeb":
            return devWeb;
        default:
            return projects;
        }
    };
}
myPortfolio.service("Projects", ProjectsService);

// PortfolioController
function PortfolioController(Projects, $location) {
    var self = this;
    self.projects = Projects.get("all");
//    console.log(self.projects);

    self.goTo = function(projectId) {
//        console.log("fonction goTo");
        var newLocation = "project/" + projectId;
        $location.path(newLocation);
    }

    self.filterBy = function(category){
        self.projects = Projects.get(category);
        console.log(self.projects);
    }

}
myPortfolio.controller('PortfolioController', PortfolioController);

//ProjectController
function ProjectController(Projects, $routeParams) {
    var self = this;
    var projects = Projects.get();
    var idSearch = $routeParams.id;
    var currentProject = projects[idSearch];

    console.log(projects);
    console.log(idSearch);
    console.log($routeParams.id);
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC5qcyIsIm5hdmJhckRpcmVjdGl2ZS9uYXZiYXItZGlyZWN0aXZlLmpzIiwicHJvamVjdHNTZXJ2aWNlL3Byb2plY3RzLXNlcnZpY2UuanMiLCJwb3J0Zm9saW8vcG9ydGZvbGlvLWNvbnRyb2xsZXIuanMiLCJwcm9qZWN0L3Byb2plY3QtY29udHJvbGxlci5qcyIsImFwcC1ydW4uanMiLCJyb3V0ZS5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQUNBO0FBQ0E7QUNGQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ1pBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUNoRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ25CQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ2xCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ3pEQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsImZpbGUiOiJzY3JpcHRzLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLy8gRMOpY2xhcmF0aW9uIGR1IG1vZHVsZSBcIm15UG9ydGZvbGlvXCJcclxudmFyIG15UG9ydGZvbGlvID0gYW5ndWxhci5tb2R1bGUoJ215UG9ydGZvbGlvJywgWyduZ1JvdXRlJywgJ25nTWF0ZXJpYWwnLCAnYWtvZW5pZy5kZWNrZ3JpZCcsICd5b3V0dWJlLWVtYmVkJ10pO1xyXG4iLCIvL05hdmJhciBEaXJlY3RpdmVcclxubXlQb3J0Zm9saW8uZGlyZWN0aXZlKCdteU5hdmJhcicsIGZ1bmN0aW9uICgpIHtcclxuICAgIHJldHVybiB7XHJcbiAgICAgICAgdGVtcGxhdGVVcmw6ICdkaXN0L3RlbXBsYXRlcy9uYXZiYXJEaXJlY3RpdmUvbmF2YmFyLXRlbXBsYXRlLmh0bWwnLFxyXG4gICAgICAgIHJlc3RyaWN0OiAnRUEnLFxyXG4vLyAgICAgICAgbGluazogZnVuY3Rpb24gTmF2QmFyQ29uZmlnKCRyb290U2NvcGUsICRzY29wZSkge1xyXG4vLyAgICAgICAgICAgICRyb290U2NvcGUuJG9uKCckcm91dGVDaGFuZ2VTdWNjZXNzJywgZnVuY3Rpb24gKGV2ZW50LCBjdXJyZW50KSB7XHJcbi8vICAgICAgICAgICAgICAgICRzY29wZS5jdXJyZW50TGluayA9IGdldEN1cnJlbnRMaW5rRnJvbVJvdXRlKGN1cnJlbnQpO1xyXG4vLyAgICAgICAgICAgIH0pO1xyXG4vLyAgICAgICAgfVxyXG4gICAgfVxyXG59KTtcclxuIiwiLy8gUHJvamVjdHNTZXJ2aWNlXHJcbmZ1bmN0aW9uIFByb2plY3RzU2VydmljZSgpIHtcclxuICAgIHZhciBzZWxmID0gdGhpcyxcclxuICAgICAgICBwcm9qZWN0cyA9IHt9LFxyXG4gICAgICAgIHZpZGVvID0ge30sXHJcbiAgICAgICAgcHJpbnREZXNpZ24gPSB7fSxcclxuICAgICAgICBicmFuZGluZyA9IHt9LFxyXG4gICAgICAgIHdlYmRlc2lnbiA9IHt9LFxyXG4gICAgICAgIGRldldlYiA9IHt9O1xyXG5cclxuICAgIHNlbGYuYWRkID0gZnVuY3Rpb24gKGRhdGEpIHtcclxuICAgICAgICAvL2NvbnNvbGUubG9nKGRhdGEpO1xyXG4gICAgICAgIGlmIChwcm9qZWN0c1tkYXRhLmlkXSA9PT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgIHByb2plY3RzW2RhdGEuaWRdID0gZGF0YTtcclxuICAgICAgICAgICAgLy9jb25zb2xlLmxvZyhwcm9qZWN0cyk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAoZGF0YS5jYXRlZ29yaWVzLnZpZGVvID09PSB0cnVlICYmIHZpZGVvW2RhdGEuaWRdID09PSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgdmlkZW9bZGF0YS5pZF0gPSBkYXRhO1xyXG4gICAgICAgICAgICAvL2NvbnNvbGUubG9nKHZpZGVvKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKGRhdGEuY2F0ZWdvcmllcy5wcmludERlc2lnbiA9PT0gdHJ1ZSAmJiBwcmludERlc2lnbltkYXRhLmlkXSA9PT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgIHByaW50RGVzaWduW2RhdGEuaWRdID0gZGF0YTtcclxuICAgICAgICAgICAgLy9jb25zb2xlLmxvZyhwcmludERlc2lnbik7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmIChkYXRhLmNhdGVnb3JpZXMuYnJhbmRpbmcgPT09IHRydWUgJiYgYnJhbmRpbmdbZGF0YS5pZF0gPT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICBicmFuZGluZ1tkYXRhLmlkXSA9IGRhdGE7XHJcbiAgICAgICAgICAgIC8vY29uc29sZS5sb2coYnJhbmRpbmcpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAoZGF0YS5jYXRlZ29yaWVzLndlYmRlc2lnbiA9PT0gdHJ1ZSAmJiB3ZWJkZXNpZ25bZGF0YS5pZF0gPT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICB3ZWJkZXNpZ25bZGF0YS5pZF0gPSBkYXRhO1xyXG4gICAgICAgICAgICAvL2NvbnNvbGUubG9nKHdlYmRlc2lnbik7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmIChkYXRhLmNhdGVnb3JpZXMuZGV2V2ViID09PSB0cnVlICYmIGRldldlYltkYXRhLmlkXSA9PT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgIGRldldlYltkYXRhLmlkXSA9IGRhdGE7XHJcbiAgICAgICAgICAgIC8vY29uc29sZS5sb2coZGV2V2ViKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgfTtcclxuXHJcbiAgICBzZWxmLnJlbW92ZSA9IGZ1bmN0aW9uIChkYXRhSWQpIHtcclxuICAgICAgICBkZWxldGUgcHJvamVjdHNbZGF0YUlkXTtcclxuICAgIH07XHJcblxyXG4gICAgc2VsZi5nZXQgPSBmdW5jdGlvbiAoY2F0ZWdvcnkpIHtcclxuICAgICAgICBzd2l0Y2ggKGNhdGVnb3J5KSB7XHJcbiAgICAgICAgY2FzZSBcImFsbFwiOlxyXG4gICAgICAgICAgICByZXR1cm4gcHJvamVjdHM7XHJcbiAgICAgICAgY2FzZSBcInZpZGVvXCI6XHJcbiAgICAgICAgICAgIHJldHVybiB2aWRlbztcclxuICAgICAgICBjYXNlIFwicHJpbnREZXNpZ25cIjpcclxuICAgICAgICAgICAgcmV0dXJuIHByaW50RGVzaWduO1xyXG4gICAgICAgIGNhc2UgXCJicmFuZGluZ1wiOlxyXG4gICAgICAgICAgICByZXR1cm4gYnJhbmRpbmc7XHJcbiAgICAgICAgY2FzZSBcIndlYmRlc2lnblwiOlxyXG4gICAgICAgICAgICByZXR1cm4gd2ViZGVzaWduO1xyXG4gICAgICAgIGNhc2UgXCJkZXZXZWJcIjpcclxuICAgICAgICAgICAgcmV0dXJuIGRldldlYjtcclxuICAgICAgICBkZWZhdWx0OlxyXG4gICAgICAgICAgICByZXR1cm4gcHJvamVjdHM7XHJcbiAgICAgICAgfVxyXG4gICAgfTtcclxufVxyXG5teVBvcnRmb2xpby5zZXJ2aWNlKFwiUHJvamVjdHNcIiwgUHJvamVjdHNTZXJ2aWNlKTtcclxuIiwiLy8gUG9ydGZvbGlvQ29udHJvbGxlclxyXG5mdW5jdGlvbiBQb3J0Zm9saW9Db250cm9sbGVyKFByb2plY3RzLCAkbG9jYXRpb24pIHtcclxuICAgIHZhciBzZWxmID0gdGhpcztcclxuICAgIHNlbGYucHJvamVjdHMgPSBQcm9qZWN0cy5nZXQoXCJhbGxcIik7XHJcbi8vICAgIGNvbnNvbGUubG9nKHNlbGYucHJvamVjdHMpO1xyXG5cclxuICAgIHNlbGYuZ29UbyA9IGZ1bmN0aW9uKHByb2plY3RJZCkge1xyXG4vLyAgICAgICAgY29uc29sZS5sb2coXCJmb25jdGlvbiBnb1RvXCIpO1xyXG4gICAgICAgIHZhciBuZXdMb2NhdGlvbiA9IFwicHJvamVjdC9cIiArIHByb2plY3RJZDtcclxuICAgICAgICAkbG9jYXRpb24ucGF0aChuZXdMb2NhdGlvbik7XHJcbiAgICB9XHJcblxyXG4gICAgc2VsZi5maWx0ZXJCeSA9IGZ1bmN0aW9uKGNhdGVnb3J5KXtcclxuICAgICAgICBzZWxmLnByb2plY3RzID0gUHJvamVjdHMuZ2V0KGNhdGVnb3J5KTtcclxuICAgICAgICBjb25zb2xlLmxvZyhzZWxmLnByb2plY3RzKTtcclxuICAgIH1cclxuXHJcbn1cclxubXlQb3J0Zm9saW8uY29udHJvbGxlcignUG9ydGZvbGlvQ29udHJvbGxlcicsIFBvcnRmb2xpb0NvbnRyb2xsZXIpO1xyXG4iLCIvL1Byb2plY3RDb250cm9sbGVyXHJcbmZ1bmN0aW9uIFByb2plY3RDb250cm9sbGVyKFByb2plY3RzLCAkcm91dGVQYXJhbXMpIHtcclxuICAgIHZhciBzZWxmID0gdGhpcztcclxuICAgIHZhciBwcm9qZWN0cyA9IFByb2plY3RzLmdldCgpO1xyXG4gICAgdmFyIGlkU2VhcmNoID0gJHJvdXRlUGFyYW1zLmlkO1xyXG4gICAgdmFyIGN1cnJlbnRQcm9qZWN0ID0gcHJvamVjdHNbaWRTZWFyY2hdO1xyXG5cclxuICAgIGNvbnNvbGUubG9nKHByb2plY3RzKTtcclxuICAgIGNvbnNvbGUubG9nKGlkU2VhcmNoKTtcclxuICAgIGNvbnNvbGUubG9nKCRyb3V0ZVBhcmFtcy5pZCk7XHJcbiAgICBjb25zb2xlLmxvZyhjdXJyZW50UHJvamVjdCk7XHJcblxyXG4gICAgaWYgKGN1cnJlbnRQcm9qZWN0ICE9PSB1bmRlZmluZWQpIHtcclxuICAgICAgICBzZWxmLnByb2plY3QgPSBjdXJyZW50UHJvamVjdDtcclxuICAgIH1cclxuXHJcbn1cclxubXlQb3J0Zm9saW8uY29udHJvbGxlcignUHJvamVjdENvbnRyb2xsZXInLCBQcm9qZWN0Q29udHJvbGxlcik7XHJcbiIsIi8vIEluaXRpYWxpc2F0aW9uIGR1IFNlcnZpY2UgUHJvamVjdHNcclxubXlQb3J0Zm9saW8ucnVuKGZ1bmN0aW9uICgkaHR0cCwgUHJvamVjdHMpIHtcclxuICAgICRodHRwXHJcbiAgICAgICAgLmdldCgnZGlzdC90ZW1wbGF0ZXMvcHJvamVjdHMuanNvbicpXHJcbiAgICAgICAgLnRoZW4oZnVuY3Rpb24gKGh0dHBSZXNwb25zZSkge1xyXG4gICAgICAgICAgICAvLyAgICAgICAgICAgIGNvbnNvbGUubG9nKGh0dHBSZXNwb25zZS5kYXRhKTtcclxuICAgICAgICAgICAgcmV0dXJuIGh0dHBSZXNwb25zZS5kYXRhO1xyXG4gICAgICAgIH0pLnRoZW4oZnVuY3Rpb24gKGRhdGEpIHtcclxuICAgICAgICAgICAgLy8gICAgICAgICAgICBjb25zb2xlLmxvZyhkYXRhKTtcclxuICAgICAgICAgICAgYW5ndWxhci5mb3JFYWNoKGRhdGEucHJvamVjdHMsIGZ1bmN0aW9uIChwcm9qZWN0KSB7XHJcbiAgICAgICAgICAgICAgICBQcm9qZWN0cy5hZGQocHJvamVjdCk7XHJcbiAgICAgICAgICAgICAgICAvLyAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhwcm9qZWN0KTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfSk7XHJcbn0pO1xyXG5cclxuXHJcbm15UG9ydGZvbGlvLmNvbmZpZyhmdW5jdGlvbiAoJG1kSWNvblByb3ZpZGVyLCAkbWRUaGVtaW5nUHJvdmlkZXIpIHtcclxuICAgIC8vIENvbmZpZyBmb250IEljb25zXHJcbiAgICAkbWRJY29uUHJvdmlkZXIuZm9udFNldCgnbWQnLCAnbWF0ZXJpYWwtaWNvbnMnKS5mb250U2V0KCdmYScsICdmb250LWF3ZXNvbWUnKTtcclxuXHJcbiAgICAvLyBFeHRlbmQgdGhlIHRlYWwgdGhlbWUgd2l0aCBkaWZmZXJlbnQgY29sb3JzXHJcbiAgICB2YXIgY3VzdG9tVGVhbE1hcCA9ICRtZFRoZW1pbmdQcm92aWRlci5leHRlbmRQYWxldHRlKCd0ZWFsJywge1xyXG4gICAgICAgICczMDAnOiAnIzViYjRiNCcsXHJcbiAgICAgICAgJzUwMCc6ICcjMzc4YzhjJyxcclxuICAgICAgICAnODAwJzogJyMwMjQyNDInLFxyXG4gICAgICAgICdBMTAwJzogJyM4YWQ5ZDknXHJcbiAgICB9KTtcclxuXHJcbiAgICAvLyBFeHRlbmQgdGhlIHBpbmsgdGhlbWUgd2l0aCBkaWZmZXJlbnQgY29sb3JzXHJcbiAgICB2YXIgcGVhY2hNYXAgPSAkbWRUaGVtaW5nUHJvdmlkZXIuZXh0ZW5kUGFsZXR0ZSgncGluaycsIHtcclxuICAgICAgICAnQTEwMCc6ICcjZmZjOGM4JyxcclxuICAgICAgICAnQTIwMCc6ICcjZmZhMmEyJyxcclxuICAgICAgICAnQTQwMCc6ICcjZmY4MDgwJyxcclxuICAgICAgICAnQTcwMCc6ICcjZTk1YjViJ1xyXG4gICAgfSk7XHJcblxyXG4gICAgLy8gRXh0ZW5kIHRoZSB5ZWxsb3cgdGhlbWUgd2l0aCBkaWZmZXJlbnQgY29sb3JzXHJcbiAgICB2YXIgamF1bmVNYXAgPSAkbWRUaGVtaW5nUHJvdmlkZXIuZXh0ZW5kUGFsZXR0ZSgneWVsbG93Jywge1xyXG4gICAgICAgICczMDAnOiAnI2ZmZTBhMicsXHJcbiAgICAgICAgJzUwMCc6ICcjZmZkNTgwJyxcclxuICAgICAgICAnODAwJzogJyNlOWJhNWInLFxyXG4gICAgICAgICdBMTAwJzogJyNmZmVkYzgnXHJcbiAgICB9KTtcclxuXHJcbiAgICAvLyBSZWdpc3RlciB0aGUgbmV3IGNvbG9yIHBhbGV0dGUgbWFwc1xyXG4gICAgJG1kVGhlbWluZ1Byb3ZpZGVyLmRlZmluZVBhbGV0dGUoJ2N1c3RvbVRlYWwnLCBjdXN0b21UZWFsTWFwKVxyXG4gICAgICAgIC5kZWZpbmVQYWxldHRlKCdwZWFjaCcsIHBlYWNoTWFwKVxyXG4gICAgICAgIC5kZWZpbmVQYWxldHRlKCdqYXVuZScsIGphdW5lTWFwKTtcclxuXHJcbiAgICAvL0NvbmZpZyBUaGVtZSBNYXRlcmlhbERlc2lnblxyXG4gICAgJG1kVGhlbWluZ1Byb3ZpZGVyLnRoZW1lKCdkZWZhdWx0JylcclxuICAgICAgICAucHJpbWFyeVBhbGV0dGUoJ2N1c3RvbVRlYWwnKVxyXG4gICAgICAgIC5hY2NlbnRQYWxldHRlKCdwZWFjaCcpXHJcbiAgICAgICAgLndhcm5QYWxldHRlKCdqYXVuZScpO1xyXG5cclxufSk7XHJcbiIsIm15UG9ydGZvbGlvLmNvbmZpZyhmdW5jdGlvbigkcm91dGVQcm92aWRlciwgJGxvY2F0aW9uUHJvdmlkZXIpIHtcclxuICAgICRyb3V0ZVByb3ZpZGVyXHJcbiAgICAgICAgLy9MYW5kaW5nIHBhZ2VcclxuICAgICAgICAud2hlbignL2FjY3VlaWwnLCB7XHJcbiAgICAgICAgICAgIHRlbXBsYXRlVXJsOiAnZGlzdC90ZW1wbGF0ZXMvbGFuZGluZy10ZW1wbGF0ZS5odG1sJ1xyXG4gICAgICAgIH0pXHJcbiAgICAgICAgLy9DViBwYWdlXHJcbiAgICAgICAgLndoZW4oJy9jdicsIHtcclxuICAgICAgICAgICAgdGVtcGxhdGVVcmw6ICdkaXN0L3RlbXBsYXRlcy9wcmVzZW50YXRpb24tdGVtcGxhdGUuaHRtbCdcclxuICAgICAgICB9KVxyXG4gICAgICAgIC8vR3JpZCBQb3J0Zm9saW9cclxuICAgICAgICAud2hlbignL3BvcnRmb2xpbycsIHtcclxuICAgICAgICAgICAgdGVtcGxhdGVVcmw6ICdkaXN0L3RlbXBsYXRlcy9wb3J0Zm9saW8vcG9ydGZvbGlvLXRlbXBsYXRlLmh0bWwnLFxyXG4gICAgICAgICAgICBjb250cm9sbGVyOiAnUG9ydGZvbGlvQ29udHJvbGxlcicsXHJcbiAgICAgICAgICAgIGNvbnRyb2xsZXJBczogJ3BvcnRmb2xpb0N0cmwnXHJcbiAgICAgICAgfSlcclxuICAgICAgICAvL0Rlc2NyaXB0aW9uIFByb2plY3RcclxuICAgICAgICAud2hlbignL3Byb2plY3QvOmlkJywge1xyXG4gICAgICAgICAgICB0ZW1wbGF0ZVVybDogJ2Rpc3QvdGVtcGxhdGVzL3Byb2plY3QvcHJvamVjdC10ZW1wbGF0ZS5odG1sJyxcclxuICAgICAgICAgICAgY29udHJvbGxlcjogJ1Byb2plY3RDb250cm9sbGVyJyxcclxuICAgICAgICAgICAgY29udHJvbGxlckFzOiAncHJvamVjdEN0cmwnXHJcbiAgICAgICAgfSlcclxuICAgICAgICAvLyBJbmZvcyBjb250YWN0XHJcbiAgICAgICAgLndoZW4oJy9jb250YWN0Jywge1xyXG4gICAgICAgICAgICB0ZW1wbGF0ZVVybDogJ2Rpc3QvdGVtcGxhdGVzL2NvbnRhY3QtdGVtcGxhdGUuaHRtbCdcclxuICAgICAgICB9KVxyXG4gICAgICAgIC8vRGVmYXVsdCBCZWhhdmlvclxyXG4gICAgICAgIC5vdGhlcndpc2Uoe1xyXG4gICAgICAgICAgICByZWRpcmVjdFRvOiAnL2FjY3VlaWwnXHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgJGxvY2F0aW9uUHJvdmlkZXIuaHRtbDVNb2RlKHRydWUpO1xyXG59KTtcclxuIl0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9
