// Déclaration du module "myPortfolio"
var myPortfolio = angular.module('myPortfolio', ['ngRoute', 'ngMaterial']);

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

// MainController
function MainController(Projects) {
    var self = this;
    self.projects = Projects;

    function NavConfig() {
        $rootScope.$on('$routeChangeSuccess', function (event, current) {
            $scope.currentLink = getCurrentLinkFromRoute(current);
        });
    }
}
myPortfolio.controller('MainController', MainController);

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
            redirectTo: '/accueil'
        });

    $locationProvider.html5Mode(true);
});

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC5qcyIsInJvdXRlLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ2xEQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJmaWxlIjoic2NyaXB0cy5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8vIETDqWNsYXJhdGlvbiBkdSBtb2R1bGUgXCJteVBvcnRmb2xpb1wiXHJcbnZhciBteVBvcnRmb2xpbyA9IGFuZ3VsYXIubW9kdWxlKCdteVBvcnRmb2xpbycsIFsnbmdSb3V0ZScsICduZ01hdGVyaWFsJ10pO1xyXG5cclxuLy8gUHJvamVjdHNTZXJ2aWNlXHJcbmZ1bmN0aW9uIFByb2plY3RzU2VydmljZSgpIHtcclxuICAgIHZhciBzZWxmID0gdGhpcztcclxuXHJcbiAgICB2YXIgcHJvamVjdHMgPSB7fTtcclxuXHJcbiAgICBzZWxmLmFkZCA9IGZ1bmN0aW9uIChkYXRhKSB7XHJcbiAgICAgICAgaWYgKHByb2plY3RzW2RhdGEuaWRdID09PSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgcHJvamVjdHNbZGF0YS5pZF0gPSBkYXRhO1xyXG4gICAgICAgIH1cclxuICAgIH07XHJcblxyXG4gICAgc2VsZi5yZW1vdmUgPSBmdW5jdGlvbiAoZGF0YUlkKSB7XHJcbiAgICAgICAgZGVsZXRlIHByb2plY3RzW2RhdGFJZF07XHJcbiAgICB9O1xyXG5cclxuICAgIHNlbGYuZ2V0ID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHJldHVybiBwcm9qZWN0cztcclxuICAgIH07XHJcbn1cclxubXlQb3J0Zm9saW8uc2VydmljZShcIlByb2plY3RzXCIsIFByb2plY3RzU2VydmljZSk7XHJcblxyXG4vLyBNYWluQ29udHJvbGxlclxyXG5mdW5jdGlvbiBNYWluQ29udHJvbGxlcihQcm9qZWN0cykge1xyXG4gICAgdmFyIHNlbGYgPSB0aGlzO1xyXG4gICAgc2VsZi5wcm9qZWN0cyA9IFByb2plY3RzO1xyXG5cclxuICAgIGZ1bmN0aW9uIE5hdkNvbmZpZygpIHtcclxuICAgICAgICAkcm9vdFNjb3BlLiRvbignJHJvdXRlQ2hhbmdlU3VjY2VzcycsIGZ1bmN0aW9uIChldmVudCwgY3VycmVudCkge1xyXG4gICAgICAgICAgICAkc2NvcGUuY3VycmVudExpbmsgPSBnZXRDdXJyZW50TGlua0Zyb21Sb3V0ZShjdXJyZW50KTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxufVxyXG5teVBvcnRmb2xpby5jb250cm9sbGVyKCdNYWluQ29udHJvbGxlcicsIE1haW5Db250cm9sbGVyKTtcclxuXHJcbi8vIEluaXRpYWxpc2F0aW9uIGR1IFNlcnZpY2UgUHJvamVjdHNcclxubXlQb3J0Zm9saW8ucnVuKGZ1bmN0aW9uICgkaHR0cCwgUHJvamVjdHMpIHtcclxuICAgICRodHRwXHJcbiAgICAgICAgLmdldCgnYXNzZXRzL2pzL3Byb2plY3RzLmpzb24nKVxyXG4gICAgICAgIC50aGVuKGZ1bmN0aW9uIChodHRwUmVzcG9uc2UpIHtcclxuICAgICAgICAgICAgcmV0dXJuIGh0dHBSZXNwb25zZS5kYXRhO1xyXG4gICAgICAgIH0pLnRoZW4oZnVuY3Rpb24gKGRhdGEpIHtcclxuICAgICAgICAgICAgYW5ndWxhci5mb3JFYWNoKGRhdGEucHJvamVjdHMsIGZ1bmN0aW9uIChwcm9qZWN0KSB7XHJcbiAgICAgICAgICAgICAgICBQcm9qZWN0cy5hZGQocHJvamVjdCk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH0pO1xyXG59KTtcclxuIiwibXlQb3J0Zm9saW8uY29uZmlnKGZ1bmN0aW9uKCRyb3V0ZVByb3ZpZGVyLCAkbG9jYXRpb25Qcm92aWRlcikge1xyXG4gICAgJHJvdXRlUHJvdmlkZXJcclxuICAgICAgICAvL0xhbmRpbmcgcGFnZVxyXG4gICAgICAgIC53aGVuKCcvYWNjdWVpbCcsIHtcclxuICAgICAgICAgICAgdGVtcGxhdGVVcmw6ICdkaXN0L3RlbXBsYXRlcy9sYW5kaW5nLXRlbXBsYXRlLmh0bWwnXHJcbiAgICAgICAgfSlcclxuICAgICAgICAvL0NWIHBhZ2VcclxuICAgICAgICAud2hlbignL2N2Jywge1xyXG4gICAgICAgICAgICB0ZW1wbGF0ZVVybDogJ2Rpc3QvdGVtcGxhdGVzL3ByZXNlbnRhdGlvbi10ZW1wbGF0ZS5odG1sJ1xyXG4gICAgICAgIH0pXHJcbiAgICAgICAgLy9HcmlkIFBvcnRmb2xpb1xyXG4gICAgICAgIC53aGVuKCcvcG9ydGZvbGlvJywge1xyXG4gICAgICAgICAgICB0ZW1wbGF0ZVVybDogJ2Rpc3QvdGVtcGxhdGVzL3BvcnRmb2xpby10ZW1wbGF0ZS5odG1sJ1xyXG4gICAgICAgIH0pXHJcbiAgICAgICAgLy9EZXNjcmlwdGlvbiBQcm9qZWN0XHJcbiAgICAgICAgLndoZW4oJy9wb3J0Zm9saW8vOmlkJywge1xyXG4gICAgICAgICAgICB0ZW1wbGF0ZVVybDogJ2Rpc3QvdGVtcGxhdGVzL3Byb2plY3QtdGVtcGxhdGUuaHRtbCdcclxuICAgICAgICB9KVxyXG4gICAgICAgIC8vIEluZm9zIGNvbnRhY3RcclxuICAgICAgICAud2hlbignL2NvbnRhY3QnLCB7XHJcbiAgICAgICAgICAgIHRlbXBsYXRlVXJsOiAnZGlzdC90ZW1wbGF0ZXMvY29udGFjdC10ZW1wbGF0ZS5odG1sJ1xyXG4gICAgICAgIH0pXHJcbiAgICAgICAgLy9EZWZhdWx0IEJlaGF2aW9yXHJcbiAgICAgICAgLm90aGVyd2lzZSh7XHJcbiAgICAgICAgICAgIHJlZGlyZWN0VG86ICcvYWNjdWVpbCdcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAkbG9jYXRpb25Qcm92aWRlci5odG1sNU1vZGUodHJ1ZSk7XHJcbn0pO1xyXG4iXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=
