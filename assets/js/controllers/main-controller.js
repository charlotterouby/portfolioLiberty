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
