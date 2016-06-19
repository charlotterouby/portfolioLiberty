// Déclaration du module "myPortfolio"
var myPortfolio = angular.module('myPortfolio', ['ngRoute']);

// ProjectsService
function ProjectsService() {
    var self = this;

    var projects = {};

    self.add = function(data) {
        if (projects[data.id] === undefined) {
            projects[data.id] = data;
        }
    };

    self.remove = function(dataId) {
        delete projects[dataId];
    };

    self.get = function() {
        return projects;
    };
}
myPortfolio.service("Projects", ProjectsService);

// MainController
function MainController(Projects) {
    var self = this;
    self.projects = Projects;
}
myPortfolio.controller('MainController', MainController);

// Initialisation du Service Projects
myPortfolio.run(function($http, Projects) {
    $http
        .get('assets/js/projects.json')
        .then(function(httpResponse) {
            return httpResponse.data;
        }).then(function(data){
            angular.forEach(data.projects, function(project) {
                Projects.add(project);
            });
        });
});

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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC5qcyIsInJvdXRlLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQzVDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJmaWxlIjoic2NyaXB0cy5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8vIETDqWNsYXJhdGlvbiBkdSBtb2R1bGUgXCJteVBvcnRmb2xpb1wiXHJcbnZhciBteVBvcnRmb2xpbyA9IGFuZ3VsYXIubW9kdWxlKCdteVBvcnRmb2xpbycsIFsnbmdSb3V0ZSddKTtcclxuXHJcbi8vIFByb2plY3RzU2VydmljZVxyXG5mdW5jdGlvbiBQcm9qZWN0c1NlcnZpY2UoKSB7XHJcbiAgICB2YXIgc2VsZiA9IHRoaXM7XHJcblxyXG4gICAgdmFyIHByb2plY3RzID0ge307XHJcblxyXG4gICAgc2VsZi5hZGQgPSBmdW5jdGlvbihkYXRhKSB7XHJcbiAgICAgICAgaWYgKHByb2plY3RzW2RhdGEuaWRdID09PSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgcHJvamVjdHNbZGF0YS5pZF0gPSBkYXRhO1xyXG4gICAgICAgIH1cclxuICAgIH07XHJcblxyXG4gICAgc2VsZi5yZW1vdmUgPSBmdW5jdGlvbihkYXRhSWQpIHtcclxuICAgICAgICBkZWxldGUgcHJvamVjdHNbZGF0YUlkXTtcclxuICAgIH07XHJcblxyXG4gICAgc2VsZi5nZXQgPSBmdW5jdGlvbigpIHtcclxuICAgICAgICByZXR1cm4gcHJvamVjdHM7XHJcbiAgICB9O1xyXG59XHJcbm15UG9ydGZvbGlvLnNlcnZpY2UoXCJQcm9qZWN0c1wiLCBQcm9qZWN0c1NlcnZpY2UpO1xyXG5cclxuLy8gTWFpbkNvbnRyb2xsZXJcclxuZnVuY3Rpb24gTWFpbkNvbnRyb2xsZXIoUHJvamVjdHMpIHtcclxuICAgIHZhciBzZWxmID0gdGhpcztcclxuICAgIHNlbGYucHJvamVjdHMgPSBQcm9qZWN0cztcclxufVxyXG5teVBvcnRmb2xpby5jb250cm9sbGVyKCdNYWluQ29udHJvbGxlcicsIE1haW5Db250cm9sbGVyKTtcclxuXHJcbi8vIEluaXRpYWxpc2F0aW9uIGR1IFNlcnZpY2UgUHJvamVjdHNcclxubXlQb3J0Zm9saW8ucnVuKGZ1bmN0aW9uKCRodHRwLCBQcm9qZWN0cykge1xyXG4gICAgJGh0dHBcclxuICAgICAgICAuZ2V0KCdhc3NldHMvanMvcHJvamVjdHMuanNvbicpXHJcbiAgICAgICAgLnRoZW4oZnVuY3Rpb24oaHR0cFJlc3BvbnNlKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBodHRwUmVzcG9uc2UuZGF0YTtcclxuICAgICAgICB9KS50aGVuKGZ1bmN0aW9uKGRhdGEpe1xyXG4gICAgICAgICAgICBhbmd1bGFyLmZvckVhY2goZGF0YS5wcm9qZWN0cywgZnVuY3Rpb24ocHJvamVjdCkge1xyXG4gICAgICAgICAgICAgICAgUHJvamVjdHMuYWRkKHByb2plY3QpO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9KTtcclxufSk7XHJcbiIsIm15UG9ydGZvbGlvLmNvbmZpZyhmdW5jdGlvbigkcm91dGVQcm92aWRlciwgJGxvY2F0aW9uUHJvdmlkZXIpIHtcclxuICAgICRyb3V0ZVByb3ZpZGVyXHJcbiAgICAgICAgLy9MYW5kaW5nIHBhZ2VcclxuICAgICAgICAud2hlbignLycsIHtcclxuICAgICAgICAgICAgdGVtcGxhdGVVcmw6ICdkaXN0L3RlbXBsYXRlcy9sYW5kaW5nLXRlbXBsYXRlLmh0bWwnXHJcbiAgICAgICAgfSlcclxuICAgICAgICAvL0NWIHBhZ2VcclxuICAgICAgICAud2hlbignL2N2Jywge1xyXG4gICAgICAgICAgICB0ZW1wbGF0ZVVybDogJ2Rpc3QvdGVtcGxhdGVzL3ByZXNlbnRhdGlvbi10ZW1wbGF0ZS5odG1sJ1xyXG4gICAgICAgIH0pXHJcbiAgICAgICAgLy9HcmlkIFBvcnRmb2xpb1xyXG4gICAgICAgIC53aGVuKCcvcG9ydGZvbGlvJywge1xyXG4gICAgICAgICAgICB0ZW1wbGF0ZVVybDogJ2Rpc3QvdGVtcGxhdGVzL3BvcnRmb2xpby10ZW1wbGF0ZS5odG1sJ1xyXG4gICAgICAgIH0pXHJcbiAgICAgICAgLy9EZXNjcmlwdGlvbiBQcm9qZWN0XHJcbiAgICAgICAgLndoZW4oJy9wb3J0Zm9saW8vOmlkJywge1xyXG4gICAgICAgICAgICB0ZW1wbGF0ZVVybDogJ2Rpc3QvdGVtcGxhdGVzL3Byb2plY3QtdGVtcGxhdGUuaHRtbCdcclxuICAgICAgICB9KVxyXG4gICAgICAgIC8vIEluZm9zIGNvbnRhY3RcclxuICAgICAgICAud2hlbignL2NvbnRhY3QnLCB7XHJcbiAgICAgICAgICAgIHRlbXBsYXRlVXJsOiAnZGlzdC90ZW1wbGF0ZXMvY29udGFjdC10ZW1wbGF0ZS5odG1sJ1xyXG4gICAgICAgIH0pXHJcbiAgICAgICAgLy9EZWZhdWx0IEJlaGF2aW9yXHJcbiAgICAgICAgLm90aGVyd2lzZSh7XHJcbiAgICAgICAgICAgIHJlZGlyZWN0VG86ICcvJ1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICRsb2NhdGlvblByb3ZpZGVyLmh0bWw1TW9kZSh0cnVlKTtcclxufSk7XHJcbiJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==
