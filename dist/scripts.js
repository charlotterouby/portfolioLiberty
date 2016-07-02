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
    self.projects = Projects;

    self.goTo = function(projectId){
        console.log("fonction goTo");
        var newLocation = "project/"+projectId;
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC5qcyIsIm5hdmJhckRpcmVjdGl2ZS9uYXZiYXItZGlyZWN0aXZlLmpzIiwicHJvamVjdHNTZXJ2aWNlL3Byb2plY3RzLXNlcnZpY2UuanMiLCJwb3J0Zm9saW8vcG9ydGZvbGlvLWNvbnRyb2xsZXIuanMiLCJwcm9qZWN0L3Byb2plY3QtY29udHJvbGxlci5qcyIsImFwcC1ydW4uanMiLCJyb3V0ZS5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUNSQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ1pBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDckJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUNiQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDbkJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUN0QkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJmaWxlIjoic2NyaXB0cy5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8vIETDqWNsYXJhdGlvbiBkdSBtb2R1bGUgXCJteVBvcnRmb2xpb1wiXHJcbnZhciBteVBvcnRmb2xpbyA9IGFuZ3VsYXIubW9kdWxlKCdteVBvcnRmb2xpbycsIFsnbmdSb3V0ZScsICduZ01hdGVyaWFsJ10pO1xyXG5cclxuLy8gTmF2YmFyRGlyZWN0aXZlXHJcbi8vIFByb2plY3RzU2VydmljZVxyXG4vLyBQb3J0Zm9saW9Db250cm9sbGVyXHJcbi8vIFByb2plY3RDb250cm9sbGVyXHJcbi8vIEluaXRpYWxpc2F0aW9uIGR1IFNlcnZpY2UgUHJvamVjdHMgYXZlYyBteVBvcnRmb2xpby5ydW5cclxuIiwiLy9OYXZiYXIgRGlyZWN0aXZlXHJcbm15UG9ydGZvbGlvLmRpcmVjdGl2ZSgnbXlOYXZiYXInLCBmdW5jdGlvbiAoKSB7XHJcbiAgICByZXR1cm4ge1xyXG4gICAgICAgIHRlbXBsYXRlVXJsOiAnZGlzdC90ZW1wbGF0ZXMvbmF2YmFyRGlyZWN0aXZlL25hdmJhci10ZW1wbGF0ZS5odG1sJyxcclxuICAgICAgICByZXN0cmljdDogJ0VBJyxcclxuLy8gICAgICAgIGxpbms6IGZ1bmN0aW9uIE5hdkJhckNvbmZpZygkcm9vdFNjb3BlLCAkc2NvcGUpIHtcclxuLy8gICAgICAgICAgICAkcm9vdFNjb3BlLiRvbignJHJvdXRlQ2hhbmdlU3VjY2VzcycsIGZ1bmN0aW9uIChldmVudCwgY3VycmVudCkge1xyXG4vLyAgICAgICAgICAgICAgICAkc2NvcGUuY3VycmVudExpbmsgPSBnZXRDdXJyZW50TGlua0Zyb21Sb3V0ZShjdXJyZW50KTtcclxuLy8gICAgICAgICAgICB9KTtcclxuLy8gICAgICAgIH1cclxuICAgIH1cclxufSk7XHJcbiIsIi8vIFByb2plY3RzU2VydmljZVxyXG5mdW5jdGlvbiBQcm9qZWN0c1NlcnZpY2UoKSB7XHJcbiAgICB2YXIgc2VsZiA9IHRoaXM7XHJcblxyXG4gICAgdmFyIHByb2plY3RzID0ge307XHJcblxyXG4gICAgc2VsZi5hZGQgPSBmdW5jdGlvbiAoZGF0YSkge1xyXG4gICAgICAgIGlmIChwcm9qZWN0c1tkYXRhLmlkXSA9PT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgIHByb2plY3RzW2RhdGEuaWRdID0gZGF0YTtcclxuICAgICAgICB9XHJcbiAgICB9O1xyXG5cclxuICAgIHNlbGYucmVtb3ZlID0gZnVuY3Rpb24gKGRhdGFJZCkge1xyXG4gICAgICAgIGRlbGV0ZSBwcm9qZWN0c1tkYXRhSWRdO1xyXG4gICAgfTtcclxuXHJcbiAgICBzZWxmLmdldCA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICByZXR1cm4gcHJvamVjdHM7XHJcbiAgICB9O1xyXG59XHJcbm15UG9ydGZvbGlvLnNlcnZpY2UoXCJQcm9qZWN0c1wiLCBQcm9qZWN0c1NlcnZpY2UpO1xyXG4iLCIvLyBQb3J0Zm9saW9Db250cm9sbGVyXHJcbmZ1bmN0aW9uIFBvcnRmb2xpb0NvbnRyb2xsZXIoUHJvamVjdHMsICRsb2NhdGlvbikge1xyXG4gICAgdmFyIHNlbGYgPSB0aGlzO1xyXG4gICAgc2VsZi5wcm9qZWN0cyA9IFByb2plY3RzO1xyXG5cclxuICAgIHNlbGYuZ29UbyA9IGZ1bmN0aW9uKHByb2plY3RJZCl7XHJcbiAgICAgICAgY29uc29sZS5sb2coXCJmb25jdGlvbiBnb1RvXCIpO1xyXG4gICAgICAgIHZhciBuZXdMb2NhdGlvbiA9IFwicHJvamVjdC9cIitwcm9qZWN0SWQ7XHJcbiAgICAgICAgJGxvY2F0aW9uLnBhdGgobmV3TG9jYXRpb24pO1xyXG4gICAgfVxyXG5cclxufVxyXG5teVBvcnRmb2xpby5jb250cm9sbGVyKCdQb3J0Zm9saW9Db250cm9sbGVyJywgUG9ydGZvbGlvQ29udHJvbGxlcik7XHJcbiIsIi8vUHJvamVjdENvbnRyb2xsZXJcclxuZnVuY3Rpb24gUHJvamVjdENvbnRyb2xsZXIoUHJvamVjdHMsICRyb3V0ZVBhcmFtcykge1xyXG4gICAgdmFyIHNlbGYgPSB0aGlzO1xyXG4gICAgdmFyIHByb2plY3RzID0gUHJvamVjdHMuZ2V0KCk7XHJcbiAgICB2YXIgaWRTZWFyY2ggPSAkcm91dGVQYXJhbXMuaWQ7XHJcbiAgICB2YXIgY3VycmVudFByb2plY3QgPSBwcm9qZWN0c1tpZFNlYXJjaF07XHJcblxyXG4gICAgY29uc29sZS5sb2cocHJvamVjdHMpO1xyXG4gICAgY29uc29sZS5sb2coaWRTZWFyY2gpO1xyXG4gICAgY29uc29sZS5sb2coJHJvdXRlUGFyYW1zLmlkKTtcclxuICAgIGNvbnNvbGUubG9nKGN1cnJlbnRQcm9qZWN0KTtcclxuXHJcbiAgICBpZiAoY3VycmVudFByb2plY3QgIT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgIHNlbGYucHJvamVjdCA9IGN1cnJlbnRQcm9qZWN0O1xyXG4gICAgfVxyXG5cclxuXHJcbn1cclxubXlQb3J0Zm9saW8uY29udHJvbGxlcignUHJvamVjdENvbnRyb2xsZXInLCBQcm9qZWN0Q29udHJvbGxlcik7XHJcbiIsIi8vIEluaXRpYWxpc2F0aW9uIGR1IFNlcnZpY2UgUHJvamVjdHNcclxubXlQb3J0Zm9saW8ucnVuKGZ1bmN0aW9uICgkaHR0cCwgUHJvamVjdHMpIHtcclxuICAgICRodHRwXHJcbiAgICAgICAgLmdldCgnYXNzZXRzL2pzL3Byb2plY3RzLmpzb24nKVxyXG4gICAgICAgIC50aGVuKGZ1bmN0aW9uIChodHRwUmVzcG9uc2UpIHtcclxuICAgICAgICAgICAgcmV0dXJuIGh0dHBSZXNwb25zZS5kYXRhO1xyXG4gICAgICAgIH0pLnRoZW4oZnVuY3Rpb24gKGRhdGEpIHtcclxuICAgICAgICAgICAgYW5ndWxhci5mb3JFYWNoKGRhdGEucHJvamVjdHMsIGZ1bmN0aW9uIChwcm9qZWN0KSB7XHJcbiAgICAgICAgICAgICAgICBQcm9qZWN0cy5hZGQocHJvamVjdCk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH0pO1xyXG59KTtcclxuXHJcbi8vQ29uZmlnIFRoZW1lIE1hdGVyaWFsRGVzaWduXHJcbi8vXHJcbi8vbXlQb3J0Zm9saW8uY29uZmlnKGZ1bmN0aW9uICgkbWRUaGVtaW5nUHJvdmlkZXIsICRtZEljb25Qcm92aWRlcikge1xyXG4vLyAgICAkbWRUaGVtaW5nUHJvdmlkZXIudGhlbWUoJ2NoYXJsb3R0ZScpXHJcbi8vICAgICAgLnByaW1hcnlQYWxldHRlKCd0ZWFsJylcclxuLy8gICAgICAuYWNjZW50UGFsZXR0ZSgncGluaycpO1xyXG4vLyAgICAkbWRJY29uUHJvdmlkZXJcclxuLy8gICAgICAuZGVmYXVsdEljb25TZXQoJ2ltZy9pY29ucy9zZXRzL3NvY2lhbC1pY29ucy5zdmcnLCAyNCk7XHJcbi8vICB9KTtcclxuIiwibXlQb3J0Zm9saW8uY29uZmlnKGZ1bmN0aW9uKCRyb3V0ZVByb3ZpZGVyLCAkbG9jYXRpb25Qcm92aWRlcikge1xyXG4gICAgJHJvdXRlUHJvdmlkZXJcclxuICAgICAgICAvL0xhbmRpbmcgcGFnZVxyXG4gICAgICAgIC53aGVuKCcvYWNjdWVpbCcsIHtcclxuICAgICAgICAgICAgdGVtcGxhdGVVcmw6ICdkaXN0L3RlbXBsYXRlcy9sYW5kaW5nLXRlbXBsYXRlLmh0bWwnXHJcbiAgICAgICAgfSlcclxuICAgICAgICAvL0NWIHBhZ2VcclxuICAgICAgICAud2hlbignL2N2Jywge1xyXG4gICAgICAgICAgICB0ZW1wbGF0ZVVybDogJ2Rpc3QvdGVtcGxhdGVzL3ByZXNlbnRhdGlvbi10ZW1wbGF0ZS5odG1sJ1xyXG4gICAgICAgIH0pXHJcbiAgICAgICAgLy9HcmlkIFBvcnRmb2xpb1xyXG4gICAgICAgIC53aGVuKCcvcG9ydGZvbGlvJywge1xyXG4gICAgICAgICAgICB0ZW1wbGF0ZVVybDogJ2Rpc3QvdGVtcGxhdGVzL3BvcnRmb2xpby9wb3J0Zm9saW8tdGVtcGxhdGUuaHRtbCcsXHJcbiAgICAgICAgICAgIGNvbnRyb2xsZXI6ICdQb3J0Zm9saW9Db250cm9sbGVyJyxcclxuICAgICAgICAgICAgY29udHJvbGxlckFzOiAncG9ydGZvbGlvQ3RybCdcclxuICAgICAgICB9KVxyXG4gICAgICAgIC8vRGVzY3JpcHRpb24gUHJvamVjdFxyXG4gICAgICAgIC53aGVuKCcvcHJvamVjdC86aWQnLCB7XHJcbiAgICAgICAgICAgIHRlbXBsYXRlVXJsOiAnZGlzdC90ZW1wbGF0ZXMvcHJvamVjdC9wcm9qZWN0LXRlbXBsYXRlLmh0bWwnLFxyXG4gICAgICAgICAgICBjb250cm9sbGVyOiAnUHJvamVjdENvbnRyb2xsZXInLFxyXG4gICAgICAgICAgICBjb250cm9sbGVyQXM6ICdwcm9qZWN0Q3RybCdcclxuICAgICAgICB9KVxyXG4gICAgICAgIC8vIEluZm9zIGNvbnRhY3RcclxuICAgICAgICAud2hlbignL2NvbnRhY3QnLCB7XHJcbiAgICAgICAgICAgIHRlbXBsYXRlVXJsOiAnZGlzdC90ZW1wbGF0ZXMvY29udGFjdC10ZW1wbGF0ZS5odG1sJ1xyXG4gICAgICAgIH0pXHJcbiAgICAgICAgLy9EZWZhdWx0IEJlaGF2aW9yXHJcbiAgICAgICAgLm90aGVyd2lzZSh7XHJcbiAgICAgICAgICAgIHJlZGlyZWN0VG86ICcvYWNjdWVpbCdcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAkbG9jYXRpb25Qcm92aWRlci5odG1sNU1vZGUodHJ1ZSk7XHJcbn0pO1xyXG4iXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=
