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
