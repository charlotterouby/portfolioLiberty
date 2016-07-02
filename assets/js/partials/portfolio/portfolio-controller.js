// PortfolioController
function PortfolioController(Projects, $location) {
    var self = this;
    self.projects = Projects;

    self.goTo = function(projectId){
        console.log("fonction goTo");
        var newLocation = "project/"+projectId;
        $location.path(newLocation);
    }

}
myPortfolio.controller('PortfolioController', PortfolioController);
