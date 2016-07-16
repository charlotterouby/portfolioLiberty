// PortfolioController
function PortfolioController(Projects, $location) {
    var self = this;
    self.projects = Projects.get();
//    console.log(self.projects);

    // Fonction permettant de naviguer vers une page projet en particulier
    self.goTo = function(projectId) {
//        console.log("fonction goTo");
        var newLocation = "project/" + projectId;
        $location.path(newLocation);
    }
}
myPortfolio.controller('PortfolioController', PortfolioController);
