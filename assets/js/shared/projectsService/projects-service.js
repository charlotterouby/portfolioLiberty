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
