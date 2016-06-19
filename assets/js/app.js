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
