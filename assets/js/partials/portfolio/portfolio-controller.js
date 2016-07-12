// PortfolioController
function PortfolioController(Projects, $location) {
    var self = this;
    self.projects = Projects.get("all");
//    console.log(self.projects);

    self.goTo = function(projectId) {
//        console.log("fonction goTo");
        var newLocation = "project/" + projectId;
        $location.path(newLocation);
    }

    self.filterBy = function(category){
        self.projects = Projects.get(category);
        console.log(self.projects);
    }

}
myPortfolio.controller('PortfolioController', PortfolioController);
