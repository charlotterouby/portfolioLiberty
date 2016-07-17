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
