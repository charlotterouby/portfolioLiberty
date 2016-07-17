// Déclaration du module "myPortfolio"
var myPortfolio = angular.module('myPortfolio', ['ngRoute', 'ngMaterial', 'akoenig.deckgrid', 'youtube-embed']);

//Navbar Directive
myPortfolio.directive('myNavbar', function() {
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
    self.keyword = "all";

    self.searchCategory = function(projet){
       return projet.category.includes(self.keyword);
    }
}
myPortfolio.controller('PortfolioController',['Projects', '$location', PortfolioController]);

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
myPortfolio.controller('ProjectController', ['Projects', '$routeParams', ProjectController]);

// Initialisation du Service Projects
myPortfolio.run(['$http', 'Projects', function($http, Projects) {
    $http
        .get('dist/templates/projects.json')
        .then(function(httpResponse) {
            //            console.log(httpResponse.data);
            return httpResponse.data;
        }).then(function(data) {
            //            console.log(data);
            angular.forEach(data.projects, function(project) {
                Projects.add(project);
                //                console.log(project);
            });
        });
}]);


myPortfolio.config(['$mdIconProvider', '$mdThemingProvider', function($mdIconProvider, $mdThemingProvider) {
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

}]);

myPortfolio.config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {
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
}]);

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC5qcyIsIm5hdmJhckRpcmVjdGl2ZS9uYXZiYXItZGlyZWN0aXZlLmpzIiwicHJvamVjdHNTZXJ2aWNlL3Byb2plY3RzLXNlcnZpY2UuanMiLCJwb3J0Zm9saW8vcG9ydGZvbGlvLWNvbnRyb2xsZXIuanMiLCJwcm9qZWN0L3Byb2plY3QtY29udHJvbGxlci5qcyIsImFwcC1ydW4uanMiLCJyb3V0ZS5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQUNBO0FBQ0E7QUNGQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ1pBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDbEJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUNuQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDdkJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDekRBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwiZmlsZSI6InNjcmlwdHMuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvLyBEw6ljbGFyYXRpb24gZHUgbW9kdWxlIFwibXlQb3J0Zm9saW9cIlxyXG52YXIgbXlQb3J0Zm9saW8gPSBhbmd1bGFyLm1vZHVsZSgnbXlQb3J0Zm9saW8nLCBbJ25nUm91dGUnLCAnbmdNYXRlcmlhbCcsICdha29lbmlnLmRlY2tncmlkJywgJ3lvdXR1YmUtZW1iZWQnXSk7XHJcbiIsIi8vTmF2YmFyIERpcmVjdGl2ZVxyXG5teVBvcnRmb2xpby5kaXJlY3RpdmUoJ215TmF2YmFyJywgZnVuY3Rpb24oKSB7XHJcbiAgICByZXR1cm4ge1xyXG4gICAgICAgIHRlbXBsYXRlVXJsOiAnZGlzdC90ZW1wbGF0ZXMvbmF2YmFyRGlyZWN0aXZlL25hdmJhci10ZW1wbGF0ZS5odG1sJyxcclxuICAgICAgICByZXN0cmljdDogJ0VBJyxcclxuLy8gICAgICAgIGxpbms6IGZ1bmN0aW9uIE5hdkJhckNvbmZpZygkcm9vdFNjb3BlLCAkc2NvcGUpIHtcclxuLy8gICAgICAgICAgICAkcm9vdFNjb3BlLiRvbignJHJvdXRlQ2hhbmdlU3VjY2VzcycsIGZ1bmN0aW9uIChldmVudCwgY3VycmVudCkge1xyXG4vLyAgICAgICAgICAgICAgICAkc2NvcGUuY3VycmVudExpbmsgPSBnZXRDdXJyZW50TGlua0Zyb21Sb3V0ZShjdXJyZW50KTtcclxuLy8gICAgICAgICAgICB9KTtcclxuLy8gICAgICAgIH1cclxuICAgIH1cclxufSk7XHJcbiIsIi8vIFByb2plY3RzU2VydmljZVxyXG5mdW5jdGlvbiBQcm9qZWN0c1NlcnZpY2UoKSB7XHJcbiAgICB2YXIgc2VsZiA9IHRoaXMsXHJcbiAgICAgICAgcHJvamVjdHMgPSBbXTtcclxuXHJcbiAgICBzZWxmLmFkZCA9IGZ1bmN0aW9uIChkYXRhKSB7XHJcbiAgICAgICAgLy8gY29uc29sZS5sb2coZGF0YSk7XHJcbiAgICAgICAgaWYgKHByb2plY3RzLmluY2x1ZGVzKGRhdGEuaWQpID09PSBmYWxzZSkge1xyXG4gICAgICAgICAgICBwcm9qZWN0cy5wdXNoKGRhdGEpO1xyXG4gICAgICAgICAgICAvLyBjb25zb2xlLmxvZyhwcm9qZWN0cyk7XHJcbiAgICAgICAgfVxyXG4gICAgfTtcclxuXHJcbiAgICBzZWxmLmdldCA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICByZXR1cm4gcHJvamVjdHM7XHJcbiAgICB9O1xyXG59XHJcbm15UG9ydGZvbGlvLnNlcnZpY2UoXCJQcm9qZWN0c1wiLCBQcm9qZWN0c1NlcnZpY2UpO1xyXG4iLCIvLyBQb3J0Zm9saW9Db250cm9sbGVyXHJcbmZ1bmN0aW9uIFBvcnRmb2xpb0NvbnRyb2xsZXIoUHJvamVjdHMsICRsb2NhdGlvbikge1xyXG4gICAgdmFyIHNlbGYgPSB0aGlzO1xyXG4gICAgc2VsZi5wcm9qZWN0cyA9IFByb2plY3RzLmdldCgpO1xyXG4vLyAgICBjb25zb2xlLmxvZyhzZWxmLnByb2plY3RzKTtcclxuXHJcbiAgICAvLyBGb25jdGlvbiBwZXJtZXR0YW50IGRlIG5hdmlndWVyIHZlcnMgdW5lIHBhZ2UgcHJvamV0IGVuIHBhcnRpY3VsaWVyXHJcbiAgICBzZWxmLmdvVG8gPSBmdW5jdGlvbihwcm9qZWN0SWQpIHtcclxuLy8gICAgICAgIGNvbnNvbGUubG9nKFwiZm9uY3Rpb24gZ29Ub1wiKTtcclxuICAgICAgICB2YXIgbmV3TG9jYXRpb24gPSBcInByb2plY3QvXCIgKyBwcm9qZWN0SWQ7XHJcbiAgICAgICAgJGxvY2F0aW9uLnBhdGgobmV3TG9jYXRpb24pO1xyXG4gICAgfVxyXG4gICAgc2VsZi5rZXl3b3JkID0gXCJhbGxcIjtcclxuXHJcbiAgICBzZWxmLnNlYXJjaENhdGVnb3J5ID0gZnVuY3Rpb24ocHJvamV0KXtcclxuICAgICAgIHJldHVybiBwcm9qZXQuY2F0ZWdvcnkuaW5jbHVkZXMoc2VsZi5rZXl3b3JkKTtcclxuICAgIH1cclxufVxyXG5teVBvcnRmb2xpby5jb250cm9sbGVyKCdQb3J0Zm9saW9Db250cm9sbGVyJyxbJ1Byb2plY3RzJywgJyRsb2NhdGlvbicsIFBvcnRmb2xpb0NvbnRyb2xsZXJdKTtcclxuIiwiLy9Qcm9qZWN0Q29udHJvbGxlclxyXG5mdW5jdGlvbiBQcm9qZWN0Q29udHJvbGxlcihQcm9qZWN0cywgJHJvdXRlUGFyYW1zKSB7XHJcbiAgICB2YXIgc2VsZiA9IHRoaXM7XHJcbiAgICB2YXIgcHJvamVjdHMgPSBQcm9qZWN0cy5nZXQoKTtcclxuICAgIHZhciBpZFNlYXJjaCA9ICRyb3V0ZVBhcmFtcy5pZDtcclxuICAgIHZhciBjdXJyZW50UHJvamVjdCA9IHt9O1xyXG5cclxuICAgIHByb2plY3RzLmZvckVhY2goZnVuY3Rpb24gKGVsZW1lbnQsIGluZGV4LCBhcnJheSkge1xyXG4vLyAgICAgICAgY29uc29sZS5sb2coZWxlbWVudC5pZCk7XHJcbi8vICAgICAgICBjb25zb2xlLmxvZyhpbmRleCk7XHJcbiAgICAgICAgaWYgKGVsZW1lbnQuaWQgPT09IGlkU2VhcmNoKSB7XHJcbiAgICAgICAgICAgIGN1cnJlbnRQcm9qZWN0ID0gcHJvamVjdHNbaW5kZXhdO1xyXG4gICAgICAgIH1cclxuICAgIH0pO1xyXG5cclxuICAgIGNvbnNvbGUubG9nKGN1cnJlbnRQcm9qZWN0KTtcclxuXHJcbiAgICBpZiAoY3VycmVudFByb2plY3QgIT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgIHNlbGYucHJvamVjdCA9IGN1cnJlbnRQcm9qZWN0O1xyXG4gICAgfVxyXG5cclxufVxyXG5teVBvcnRmb2xpby5jb250cm9sbGVyKCdQcm9qZWN0Q29udHJvbGxlcicsIFsnUHJvamVjdHMnLCAnJHJvdXRlUGFyYW1zJywgUHJvamVjdENvbnRyb2xsZXJdKTtcclxuIiwiLy8gSW5pdGlhbGlzYXRpb24gZHUgU2VydmljZSBQcm9qZWN0c1xyXG5teVBvcnRmb2xpby5ydW4oWyckaHR0cCcsICdQcm9qZWN0cycsIGZ1bmN0aW9uKCRodHRwLCBQcm9qZWN0cykge1xyXG4gICAgJGh0dHBcclxuICAgICAgICAuZ2V0KCdkaXN0L3RlbXBsYXRlcy9wcm9qZWN0cy5qc29uJylcclxuICAgICAgICAudGhlbihmdW5jdGlvbihodHRwUmVzcG9uc2UpIHtcclxuICAgICAgICAgICAgLy8gICAgICAgICAgICBjb25zb2xlLmxvZyhodHRwUmVzcG9uc2UuZGF0YSk7XHJcbiAgICAgICAgICAgIHJldHVybiBodHRwUmVzcG9uc2UuZGF0YTtcclxuICAgICAgICB9KS50aGVuKGZ1bmN0aW9uKGRhdGEpIHtcclxuICAgICAgICAgICAgLy8gICAgICAgICAgICBjb25zb2xlLmxvZyhkYXRhKTtcclxuICAgICAgICAgICAgYW5ndWxhci5mb3JFYWNoKGRhdGEucHJvamVjdHMsIGZ1bmN0aW9uKHByb2plY3QpIHtcclxuICAgICAgICAgICAgICAgIFByb2plY3RzLmFkZChwcm9qZWN0KTtcclxuICAgICAgICAgICAgICAgIC8vICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKHByb2plY3QpO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9KTtcclxufV0pO1xyXG5cclxuXHJcbm15UG9ydGZvbGlvLmNvbmZpZyhbJyRtZEljb25Qcm92aWRlcicsICckbWRUaGVtaW5nUHJvdmlkZXInLCBmdW5jdGlvbigkbWRJY29uUHJvdmlkZXIsICRtZFRoZW1pbmdQcm92aWRlcikge1xyXG4gICAgLy8gQ29uZmlnIGZvbnQgSWNvbnNcclxuICAgICRtZEljb25Qcm92aWRlci5mb250U2V0KCdtZCcsICdtYXRlcmlhbC1pY29ucycpLmZvbnRTZXQoJ2ZhJywgJ2ZvbnQtYXdlc29tZScpO1xyXG5cclxuICAgIC8vIEV4dGVuZCB0aGUgdGVhbCB0aGVtZSB3aXRoIGRpZmZlcmVudCBjb2xvcnNcclxuICAgIHZhciBjdXN0b21UZWFsTWFwID0gJG1kVGhlbWluZ1Byb3ZpZGVyLmV4dGVuZFBhbGV0dGUoJ3RlYWwnLCB7XHJcbiAgICAgICAgJzMwMCc6ICcjNWJiNGI0JyxcclxuICAgICAgICAnNTAwJzogJyMzNzhjOGMnLFxyXG4gICAgICAgICc4MDAnOiAnIzAyNDI0MicsXHJcbiAgICAgICAgJ0ExMDAnOiAnIzhhZDlkOSdcclxuICAgIH0pO1xyXG5cclxuICAgIC8vIEV4dGVuZCB0aGUgcGluayB0aGVtZSB3aXRoIGRpZmZlcmVudCBjb2xvcnNcclxuICAgIHZhciBwZWFjaE1hcCA9ICRtZFRoZW1pbmdQcm92aWRlci5leHRlbmRQYWxldHRlKCdwaW5rJywge1xyXG4gICAgICAgICdBMTAwJzogJyNmZmM4YzgnLFxyXG4gICAgICAgICdBMjAwJzogJyNmZmEyYTInLFxyXG4gICAgICAgICdBNDAwJzogJyNmZjgwODAnLFxyXG4gICAgICAgICdBNzAwJzogJyNlOTViNWInXHJcbiAgICB9KTtcclxuXHJcbiAgICAvLyBFeHRlbmQgdGhlIHllbGxvdyB0aGVtZSB3aXRoIGRpZmZlcmVudCBjb2xvcnNcclxuICAgIHZhciBqYXVuZU1hcCA9ICRtZFRoZW1pbmdQcm92aWRlci5leHRlbmRQYWxldHRlKCd5ZWxsb3cnLCB7XHJcbiAgICAgICAgJzMwMCc6ICcjZmZlMGEyJyxcclxuICAgICAgICAnNTAwJzogJyNmZmQ1ODAnLFxyXG4gICAgICAgICc4MDAnOiAnI2U5YmE1YicsXHJcbiAgICAgICAgJ0ExMDAnOiAnI2ZmZWRjOCdcclxuICAgIH0pO1xyXG5cclxuICAgIC8vIFJlZ2lzdGVyIHRoZSBuZXcgY29sb3IgcGFsZXR0ZSBtYXBzXHJcbiAgICAkbWRUaGVtaW5nUHJvdmlkZXIuZGVmaW5lUGFsZXR0ZSgnY3VzdG9tVGVhbCcsIGN1c3RvbVRlYWxNYXApXHJcbiAgICAgICAgLmRlZmluZVBhbGV0dGUoJ3BlYWNoJywgcGVhY2hNYXApXHJcbiAgICAgICAgLmRlZmluZVBhbGV0dGUoJ2phdW5lJywgamF1bmVNYXApO1xyXG5cclxuICAgIC8vQ29uZmlnIFRoZW1lIE1hdGVyaWFsRGVzaWduXHJcbiAgICAkbWRUaGVtaW5nUHJvdmlkZXIudGhlbWUoJ2RlZmF1bHQnKVxyXG4gICAgICAgIC5wcmltYXJ5UGFsZXR0ZSgnY3VzdG9tVGVhbCcpXHJcbiAgICAgICAgLmFjY2VudFBhbGV0dGUoJ3BlYWNoJylcclxuICAgICAgICAud2FyblBhbGV0dGUoJ2phdW5lJyk7XHJcblxyXG59XSk7XHJcbiIsIm15UG9ydGZvbGlvLmNvbmZpZyhbJyRyb3V0ZVByb3ZpZGVyJywgJyRsb2NhdGlvblByb3ZpZGVyJywgZnVuY3Rpb24oJHJvdXRlUHJvdmlkZXIsICRsb2NhdGlvblByb3ZpZGVyKSB7XHJcbiAgICAkcm91dGVQcm92aWRlclxyXG4gICAgICAgIC8vTGFuZGluZyBwYWdlXHJcbiAgICAgICAgLndoZW4oJy9hY2N1ZWlsJywge1xyXG4gICAgICAgICAgICB0ZW1wbGF0ZVVybDogJ2Rpc3QvdGVtcGxhdGVzL2xhbmRpbmctdGVtcGxhdGUuaHRtbCdcclxuICAgICAgICB9KVxyXG4gICAgICAgIC8vQ1YgcGFnZVxyXG4gICAgICAgIC53aGVuKCcvY3YnLCB7XHJcbiAgICAgICAgICAgIHRlbXBsYXRlVXJsOiAnZGlzdC90ZW1wbGF0ZXMvcHJlc2VudGF0aW9uLXRlbXBsYXRlLmh0bWwnXHJcbiAgICAgICAgfSlcclxuICAgICAgICAvL0dyaWQgUG9ydGZvbGlvXHJcbiAgICAgICAgLndoZW4oJy9wb3J0Zm9saW8nLCB7XHJcbiAgICAgICAgICAgIHRlbXBsYXRlVXJsOiAnZGlzdC90ZW1wbGF0ZXMvcG9ydGZvbGlvL3BvcnRmb2xpby10ZW1wbGF0ZS5odG1sJyxcclxuICAgICAgICAgICAgY29udHJvbGxlcjogJ1BvcnRmb2xpb0NvbnRyb2xsZXInLFxyXG4gICAgICAgICAgICBjb250cm9sbGVyQXM6ICdwb3J0Zm9saW9DdHJsJ1xyXG4gICAgICAgIH0pXHJcbiAgICAgICAgLy9EZXNjcmlwdGlvbiBQcm9qZWN0XHJcbiAgICAgICAgLndoZW4oJy9wcm9qZWN0LzppZCcsIHtcclxuICAgICAgICAgICAgdGVtcGxhdGVVcmw6ICdkaXN0L3RlbXBsYXRlcy9wcm9qZWN0L3Byb2plY3QtdGVtcGxhdGUuaHRtbCcsXHJcbiAgICAgICAgICAgIGNvbnRyb2xsZXI6ICdQcm9qZWN0Q29udHJvbGxlcicsXHJcbiAgICAgICAgICAgIGNvbnRyb2xsZXJBczogJ3Byb2plY3RDdHJsJ1xyXG4gICAgICAgIH0pXHJcbiAgICAgICAgLy8gSW5mb3MgY29udGFjdFxyXG4gICAgICAgIC53aGVuKCcvY29udGFjdCcsIHtcclxuICAgICAgICAgICAgdGVtcGxhdGVVcmw6ICdkaXN0L3RlbXBsYXRlcy9jb250YWN0LXRlbXBsYXRlLmh0bWwnXHJcbiAgICAgICAgfSlcclxuICAgICAgICAvL0RlZmF1bHQgQmVoYXZpb3JcclxuICAgICAgICAub3RoZXJ3aXNlKHtcclxuICAgICAgICAgICAgcmVkaXJlY3RUbzogJy9hY2N1ZWlsJ1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICRsb2NhdGlvblByb3ZpZGVyLmh0bWw1TW9kZSh0cnVlKTtcclxufV0pO1xyXG4iXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=
