// Déclaration du module "myPortfolio"
var myPortfolio = angular.module('myPortfolio', ['ngRoute', 'ngMaterial']);

// NavbarDirective
// ProjectsService
// PortfolioController
// ProjectController
// Initialisation du Service Projects avec myPortfolio.run

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
    var self = this;

    var projects = {};

    self.add = function (data) {
        if (projects[data.id] === undefined) {
            projects[data.id] = data;
        }
    };

    self.remove = function (dataId) {
        delete projects[dataId];
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
    console.log(self.projects);

    self.goTo = function(projectId) {
        console.log("fonction goTo");
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC5qcyIsIm5hdmJhckRpcmVjdGl2ZS9uYXZiYXItZGlyZWN0aXZlLmpzIiwicHJvamVjdHNTZXJ2aWNlL3Byb2plY3RzLXNlcnZpY2UuanMiLCJwb3J0Zm9saW8vcG9ydGZvbGlvLWNvbnRyb2xsZXIuanMiLCJwcm9qZWN0L3Byb2plY3QtY29udHJvbGxlci5qcyIsImFwcC1ydW4uanMiLCJyb3V0ZS5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUNSQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ1pBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDckJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ2RBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUNuQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ3RCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsImZpbGUiOiJzY3JpcHRzLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLy8gRMOpY2xhcmF0aW9uIGR1IG1vZHVsZSBcIm15UG9ydGZvbGlvXCJcclxudmFyIG15UG9ydGZvbGlvID0gYW5ndWxhci5tb2R1bGUoJ215UG9ydGZvbGlvJywgWyduZ1JvdXRlJywgJ25nTWF0ZXJpYWwnXSk7XHJcblxyXG4vLyBOYXZiYXJEaXJlY3RpdmVcclxuLy8gUHJvamVjdHNTZXJ2aWNlXHJcbi8vIFBvcnRmb2xpb0NvbnRyb2xsZXJcclxuLy8gUHJvamVjdENvbnRyb2xsZXJcclxuLy8gSW5pdGlhbGlzYXRpb24gZHUgU2VydmljZSBQcm9qZWN0cyBhdmVjIG15UG9ydGZvbGlvLnJ1blxyXG4iLCIvL05hdmJhciBEaXJlY3RpdmVcclxubXlQb3J0Zm9saW8uZGlyZWN0aXZlKCdteU5hdmJhcicsIGZ1bmN0aW9uICgpIHtcclxuICAgIHJldHVybiB7XHJcbiAgICAgICAgdGVtcGxhdGVVcmw6ICdkaXN0L3RlbXBsYXRlcy9uYXZiYXJEaXJlY3RpdmUvbmF2YmFyLXRlbXBsYXRlLmh0bWwnLFxyXG4gICAgICAgIHJlc3RyaWN0OiAnRUEnLFxyXG4vLyAgICAgICAgbGluazogZnVuY3Rpb24gTmF2QmFyQ29uZmlnKCRyb290U2NvcGUsICRzY29wZSkge1xyXG4vLyAgICAgICAgICAgICRyb290U2NvcGUuJG9uKCckcm91dGVDaGFuZ2VTdWNjZXNzJywgZnVuY3Rpb24gKGV2ZW50LCBjdXJyZW50KSB7XHJcbi8vICAgICAgICAgICAgICAgICRzY29wZS5jdXJyZW50TGluayA9IGdldEN1cnJlbnRMaW5rRnJvbVJvdXRlKGN1cnJlbnQpO1xyXG4vLyAgICAgICAgICAgIH0pO1xyXG4vLyAgICAgICAgfVxyXG4gICAgfVxyXG59KTtcclxuIiwiLy8gUHJvamVjdHNTZXJ2aWNlXHJcbmZ1bmN0aW9uIFByb2plY3RzU2VydmljZSgpIHtcclxuICAgIHZhciBzZWxmID0gdGhpcztcclxuXHJcbiAgICB2YXIgcHJvamVjdHMgPSB7fTtcclxuXHJcbiAgICBzZWxmLmFkZCA9IGZ1bmN0aW9uIChkYXRhKSB7XHJcbiAgICAgICAgaWYgKHByb2plY3RzW2RhdGEuaWRdID09PSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgcHJvamVjdHNbZGF0YS5pZF0gPSBkYXRhO1xyXG4gICAgICAgIH1cclxuICAgIH07XHJcblxyXG4gICAgc2VsZi5yZW1vdmUgPSBmdW5jdGlvbiAoZGF0YUlkKSB7XHJcbiAgICAgICAgZGVsZXRlIHByb2plY3RzW2RhdGFJZF07XHJcbiAgICB9O1xyXG5cclxuICAgIHNlbGYuZ2V0ID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHJldHVybiBwcm9qZWN0cztcclxuICAgIH07XHJcbn1cclxubXlQb3J0Zm9saW8uc2VydmljZShcIlByb2plY3RzXCIsIFByb2plY3RzU2VydmljZSk7XHJcbiIsIi8vIFBvcnRmb2xpb0NvbnRyb2xsZXJcclxuZnVuY3Rpb24gUG9ydGZvbGlvQ29udHJvbGxlcihQcm9qZWN0cywgJGxvY2F0aW9uKSB7XHJcbiAgICB2YXIgc2VsZiA9IHRoaXM7XHJcbiAgICBzZWxmLnByb2plY3RzID0gUHJvamVjdHMuZ2V0KCk7XHJcbiAgICBjb25zb2xlLmxvZyhzZWxmLnByb2plY3RzKTtcclxuXHJcbiAgICBzZWxmLmdvVG8gPSBmdW5jdGlvbihwcm9qZWN0SWQpIHtcclxuICAgICAgICBjb25zb2xlLmxvZyhcImZvbmN0aW9uIGdvVG9cIik7XHJcbiAgICAgICAgdmFyIG5ld0xvY2F0aW9uID0gXCJwcm9qZWN0L1wiICsgcHJvamVjdElkO1xyXG4gICAgICAgICRsb2NhdGlvbi5wYXRoKG5ld0xvY2F0aW9uKTtcclxuICAgIH1cclxuXHJcbn1cclxubXlQb3J0Zm9saW8uY29udHJvbGxlcignUG9ydGZvbGlvQ29udHJvbGxlcicsIFBvcnRmb2xpb0NvbnRyb2xsZXIpO1xyXG4iLCIvL1Byb2plY3RDb250cm9sbGVyXHJcbmZ1bmN0aW9uIFByb2plY3RDb250cm9sbGVyKFByb2plY3RzLCAkcm91dGVQYXJhbXMpIHtcclxuICAgIHZhciBzZWxmID0gdGhpcztcclxuICAgIHZhciBwcm9qZWN0cyA9IFByb2plY3RzLmdldCgpO1xyXG4gICAgdmFyIGlkU2VhcmNoID0gJHJvdXRlUGFyYW1zLmlkO1xyXG4gICAgdmFyIGN1cnJlbnRQcm9qZWN0ID0gcHJvamVjdHNbaWRTZWFyY2hdO1xyXG5cclxuICAgIGNvbnNvbGUubG9nKHByb2plY3RzKTtcclxuICAgIGNvbnNvbGUubG9nKGlkU2VhcmNoKTtcclxuICAgIGNvbnNvbGUubG9nKCRyb3V0ZVBhcmFtcy5pZCk7XHJcbiAgICBjb25zb2xlLmxvZyhjdXJyZW50UHJvamVjdCk7XHJcblxyXG4gICAgaWYgKGN1cnJlbnRQcm9qZWN0ICE9PSB1bmRlZmluZWQpIHtcclxuICAgICAgICBzZWxmLnByb2plY3QgPSBjdXJyZW50UHJvamVjdDtcclxuICAgIH1cclxuXHJcblxyXG59XHJcbm15UG9ydGZvbGlvLmNvbnRyb2xsZXIoJ1Byb2plY3RDb250cm9sbGVyJywgUHJvamVjdENvbnRyb2xsZXIpO1xyXG4iLCIvLyBJbml0aWFsaXNhdGlvbiBkdSBTZXJ2aWNlIFByb2plY3RzXHJcbm15UG9ydGZvbGlvLnJ1bihmdW5jdGlvbiAoJGh0dHAsIFByb2plY3RzKSB7XHJcbiAgICAkaHR0cFxyXG4gICAgICAgIC5nZXQoJ2Fzc2V0cy9qcy9wcm9qZWN0cy5qc29uJylcclxuICAgICAgICAudGhlbihmdW5jdGlvbiAoaHR0cFJlc3BvbnNlKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBodHRwUmVzcG9uc2UuZGF0YTtcclxuICAgICAgICB9KS50aGVuKGZ1bmN0aW9uIChkYXRhKSB7XHJcbiAgICAgICAgICAgIGFuZ3VsYXIuZm9yRWFjaChkYXRhLnByb2plY3RzLCBmdW5jdGlvbiAocHJvamVjdCkge1xyXG4gICAgICAgICAgICAgICAgUHJvamVjdHMuYWRkKHByb2plY3QpO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9KTtcclxufSk7XHJcblxyXG4vL0NvbmZpZyBUaGVtZSBNYXRlcmlhbERlc2lnblxyXG4vL1xyXG4vL215UG9ydGZvbGlvLmNvbmZpZyhmdW5jdGlvbiAoJG1kVGhlbWluZ1Byb3ZpZGVyLCAkbWRJY29uUHJvdmlkZXIpIHtcclxuLy8gICAgJG1kVGhlbWluZ1Byb3ZpZGVyLnRoZW1lKCdjaGFybG90dGUnKVxyXG4vLyAgICAgIC5wcmltYXJ5UGFsZXR0ZSgndGVhbCcpXHJcbi8vICAgICAgLmFjY2VudFBhbGV0dGUoJ3BpbmsnKTtcclxuLy8gICAgJG1kSWNvblByb3ZpZGVyXHJcbi8vICAgICAgLmRlZmF1bHRJY29uU2V0KCdpbWcvaWNvbnMvc2V0cy9zb2NpYWwtaWNvbnMuc3ZnJywgMjQpO1xyXG4vLyAgfSk7XHJcbiIsIm15UG9ydGZvbGlvLmNvbmZpZyhmdW5jdGlvbigkcm91dGVQcm92aWRlciwgJGxvY2F0aW9uUHJvdmlkZXIpIHtcclxuICAgICRyb3V0ZVByb3ZpZGVyXHJcbiAgICAgICAgLy9MYW5kaW5nIHBhZ2VcclxuICAgICAgICAud2hlbignL2FjY3VlaWwnLCB7XHJcbiAgICAgICAgICAgIHRlbXBsYXRlVXJsOiAnZGlzdC90ZW1wbGF0ZXMvbGFuZGluZy10ZW1wbGF0ZS5odG1sJ1xyXG4gICAgICAgIH0pXHJcbiAgICAgICAgLy9DViBwYWdlXHJcbiAgICAgICAgLndoZW4oJy9jdicsIHtcclxuICAgICAgICAgICAgdGVtcGxhdGVVcmw6ICdkaXN0L3RlbXBsYXRlcy9wcmVzZW50YXRpb24tdGVtcGxhdGUuaHRtbCdcclxuICAgICAgICB9KVxyXG4gICAgICAgIC8vR3JpZCBQb3J0Zm9saW9cclxuICAgICAgICAud2hlbignL3BvcnRmb2xpbycsIHtcclxuICAgICAgICAgICAgdGVtcGxhdGVVcmw6ICdkaXN0L3RlbXBsYXRlcy9wb3J0Zm9saW8vcG9ydGZvbGlvLXRlbXBsYXRlLmh0bWwnLFxyXG4gICAgICAgICAgICBjb250cm9sbGVyOiAnUG9ydGZvbGlvQ29udHJvbGxlcicsXHJcbiAgICAgICAgICAgIGNvbnRyb2xsZXJBczogJ3BvcnRmb2xpb0N0cmwnXHJcbiAgICAgICAgfSlcclxuICAgICAgICAvL0Rlc2NyaXB0aW9uIFByb2plY3RcclxuICAgICAgICAud2hlbignL3Byb2plY3QvOmlkJywge1xyXG4gICAgICAgICAgICB0ZW1wbGF0ZVVybDogJ2Rpc3QvdGVtcGxhdGVzL3Byb2plY3QvcHJvamVjdC10ZW1wbGF0ZS5odG1sJyxcclxuICAgICAgICAgICAgY29udHJvbGxlcjogJ1Byb2plY3RDb250cm9sbGVyJyxcclxuICAgICAgICAgICAgY29udHJvbGxlckFzOiAncHJvamVjdEN0cmwnXHJcbiAgICAgICAgfSlcclxuICAgICAgICAvLyBJbmZvcyBjb250YWN0XHJcbiAgICAgICAgLndoZW4oJy9jb250YWN0Jywge1xyXG4gICAgICAgICAgICB0ZW1wbGF0ZVVybDogJ2Rpc3QvdGVtcGxhdGVzL2NvbnRhY3QtdGVtcGxhdGUuaHRtbCdcclxuICAgICAgICB9KVxyXG4gICAgICAgIC8vRGVmYXVsdCBCZWhhdmlvclxyXG4gICAgICAgIC5vdGhlcndpc2Uoe1xyXG4gICAgICAgICAgICByZWRpcmVjdFRvOiAnL2FjY3VlaWwnXHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgJGxvY2F0aW9uUHJvdmlkZXIuaHRtbDVNb2RlKHRydWUpO1xyXG59KTtcclxuIl0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9
