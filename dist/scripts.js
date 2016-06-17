var myPortfolio = angular.module('myPortfolio', ['ngRoute']);

myPortfolio.factory('ProjectsFactory', ['$http', '$q', function ($http, $q) {
    var projects = {
        'projectsList': false,
        'getProjectsList': function () {
            var deffered = $q.defer();
            $http.get('assets/js/projects.json').success(
                function (data) {
                    // console.log(data.projects);
                    projects.projectsList = data.projects;
                    // console.log(projects.projectsList);
                    deffered.resolve(projects.projectsList);
                }
            ).error(
                function (data) {
                    deffered.reject('Oups, il semble y avoir un petit problème pour récupérer la liste des projets...');
                }
            );
            return deffered.promise;
        }
    };
    return projects;
}]);

myPortfolio.controller('MainController', ['$scope', 'ProjectsFactory', MainController]);

function MainController($scope, ProjectsFactory) {
    this.projects = [];

    // Récupération de la liste des projets
    var getProjects = ProjectsFactory.getProjectsList().then(function (projects) {
        this.projects = projects;
        console.log(this.projects[0].title);
    }, function (msg) {
        alert(msg);
    });

    console.log(this.projects);
}

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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC5qcyIsInByb2plY3RzLWZhY3RvcnkuanMiLCJtYWluLWNvbnRyb2xsZXIuanMiLCJyb3V0ZS5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQUNBO0FDREE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ3RCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ2ZBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsImZpbGUiOiJzY3JpcHRzLmpzIiwic291cmNlc0NvbnRlbnQiOlsidmFyIG15UG9ydGZvbGlvID0gYW5ndWxhci5tb2R1bGUoJ215UG9ydGZvbGlvJywgWyduZ1JvdXRlJ10pO1xyXG4iLCJteVBvcnRmb2xpby5mYWN0b3J5KCdQcm9qZWN0c0ZhY3RvcnknLCBbJyRodHRwJywgJyRxJywgZnVuY3Rpb24gKCRodHRwLCAkcSkge1xyXG4gICAgdmFyIHByb2plY3RzID0ge1xyXG4gICAgICAgICdwcm9qZWN0c0xpc3QnOiBmYWxzZSxcclxuICAgICAgICAnZ2V0UHJvamVjdHNMaXN0JzogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICB2YXIgZGVmZmVyZWQgPSAkcS5kZWZlcigpO1xyXG4gICAgICAgICAgICAkaHR0cC5nZXQoJ2Fzc2V0cy9qcy9wcm9qZWN0cy5qc29uJykuc3VjY2VzcyhcclxuICAgICAgICAgICAgICAgIGZ1bmN0aW9uIChkYXRhKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gY29uc29sZS5sb2coZGF0YS5wcm9qZWN0cyk7XHJcbiAgICAgICAgICAgICAgICAgICAgcHJvamVjdHMucHJvamVjdHNMaXN0ID0gZGF0YS5wcm9qZWN0cztcclxuICAgICAgICAgICAgICAgICAgICAvLyBjb25zb2xlLmxvZyhwcm9qZWN0cy5wcm9qZWN0c0xpc3QpO1xyXG4gICAgICAgICAgICAgICAgICAgIGRlZmZlcmVkLnJlc29sdmUocHJvamVjdHMucHJvamVjdHNMaXN0KTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgKS5lcnJvcihcclxuICAgICAgICAgICAgICAgIGZ1bmN0aW9uIChkYXRhKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgZGVmZmVyZWQucmVqZWN0KCdPdXBzLCBpbCBzZW1ibGUgeSBhdm9pciB1biBwZXRpdCBwcm9ibMOobWUgcG91ciByw6ljdXDDqXJlciBsYSBsaXN0ZSBkZXMgcHJvamV0cy4uLicpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICApO1xyXG4gICAgICAgICAgICByZXR1cm4gZGVmZmVyZWQucHJvbWlzZTtcclxuICAgICAgICB9XHJcbiAgICB9O1xyXG4gICAgcmV0dXJuIHByb2plY3RzO1xyXG59XSk7XHJcbiIsIm15UG9ydGZvbGlvLmNvbnRyb2xsZXIoJ01haW5Db250cm9sbGVyJywgWyckc2NvcGUnLCAnUHJvamVjdHNGYWN0b3J5JywgTWFpbkNvbnRyb2xsZXJdKTtcclxuXHJcbmZ1bmN0aW9uIE1haW5Db250cm9sbGVyKCRzY29wZSwgUHJvamVjdHNGYWN0b3J5KSB7XHJcbiAgICB0aGlzLnByb2plY3RzID0gW107XHJcblxyXG4gICAgLy8gUsOpY3Vww6lyYXRpb24gZGUgbGEgbGlzdGUgZGVzIHByb2pldHNcclxuICAgIHZhciBnZXRQcm9qZWN0cyA9IFByb2plY3RzRmFjdG9yeS5nZXRQcm9qZWN0c0xpc3QoKS50aGVuKGZ1bmN0aW9uIChwcm9qZWN0cykge1xyXG4gICAgICAgIHRoaXMucHJvamVjdHMgPSBwcm9qZWN0cztcclxuICAgICAgICBjb25zb2xlLmxvZyh0aGlzLnByb2plY3RzWzBdLnRpdGxlKTtcclxuICAgIH0sIGZ1bmN0aW9uIChtc2cpIHtcclxuICAgICAgICBhbGVydChtc2cpO1xyXG4gICAgfSk7XHJcblxyXG4gICAgY29uc29sZS5sb2codGhpcy5wcm9qZWN0cyk7XHJcbn1cclxuIiwibXlQb3J0Zm9saW8uY29uZmlnKGZ1bmN0aW9uKCRyb3V0ZVByb3ZpZGVyLCAkbG9jYXRpb25Qcm92aWRlcikge1xyXG4gICAgJHJvdXRlUHJvdmlkZXJcclxuICAgICAgICAvL0xhbmRpbmcgcGFnZVxyXG4gICAgICAgIC53aGVuKCcvJywge1xyXG4gICAgICAgICAgICB0ZW1wbGF0ZVVybDogJ2Rpc3QvdGVtcGxhdGVzL2xhbmRpbmctdGVtcGxhdGUuaHRtbCdcclxuICAgICAgICB9KVxyXG4gICAgICAgIC8vQ1YgcGFnZVxyXG4gICAgICAgIC53aGVuKCcvY3YnLCB7XHJcbiAgICAgICAgICAgIHRlbXBsYXRlVXJsOiAnZGlzdC90ZW1wbGF0ZXMvcHJlc2VudGF0aW9uLXRlbXBsYXRlLmh0bWwnXHJcbiAgICAgICAgfSlcclxuICAgICAgICAvL0dyaWQgUG9ydGZvbGlvXHJcbiAgICAgICAgLndoZW4oJy9wb3J0Zm9saW8nLCB7XHJcbiAgICAgICAgICAgIHRlbXBsYXRlVXJsOiAnZGlzdC90ZW1wbGF0ZXMvcG9ydGZvbGlvLXRlbXBsYXRlLmh0bWwnXHJcbiAgICAgICAgfSlcclxuICAgICAgICAvL0Rlc2NyaXB0aW9uIFByb2plY3RcclxuICAgICAgICAud2hlbignL3BvcnRmb2xpby86aWQnLCB7XHJcbiAgICAgICAgICAgIHRlbXBsYXRlVXJsOiAnZGlzdC90ZW1wbGF0ZXMvcHJvamVjdC10ZW1wbGF0ZS5odG1sJ1xyXG4gICAgICAgIH0pXHJcbiAgICAgICAgLy8gSW5mb3MgY29udGFjdFxyXG4gICAgICAgIC53aGVuKCcvY29udGFjdCcsIHtcclxuICAgICAgICAgICAgdGVtcGxhdGVVcmw6ICdkaXN0L3RlbXBsYXRlcy9jb250YWN0LXRlbXBsYXRlLmh0bWwnXHJcbiAgICAgICAgfSlcclxuICAgICAgICAvL0RlZmF1bHQgQmVoYXZpb3JcclxuICAgICAgICAub3RoZXJ3aXNlKHtcclxuICAgICAgICAgICAgcmVkaXJlY3RUbzogJy8nXHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgJGxvY2F0aW9uUHJvdmlkZXIuaHRtbDVNb2RlKHRydWUpO1xyXG59KTtcclxuIl0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9
