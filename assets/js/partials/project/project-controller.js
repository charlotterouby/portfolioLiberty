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
