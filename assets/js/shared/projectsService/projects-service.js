// ProjectsService
function ProjectsService() {
    var self = this,
        projects = {},
        video = {},
        printDesign = {},
        branding = {},
        webdesign = {},
        devWeb = {};

    self.add = function (data) {
        //console.log(data);
        if (projects[data.id] === undefined) {
            projects[data.id] = data;
            //console.log(projects);
        }

        if (data.categories.video === true && video[data.id] === undefined) {
            video[data.id] = data;
            //console.log(video);
        }
        if (data.categories.printDesign === true && printDesign[data.id] === undefined) {
            printDesign[data.id] = data;
            //console.log(printDesign);
        }
        if (data.categories.branding === true && branding[data.id] === undefined) {
            branding[data.id] = data;
            //console.log(branding);
        }
        if (data.categories.webdesign === true && webdesign[data.id] === undefined) {
            webdesign[data.id] = data;
            //console.log(webdesign);
        }
        if (data.categories.devWeb === true && devWeb[data.id] === undefined) {
            devWeb[data.id] = data;
            //console.log(devWeb);
        }

    };

    self.remove = function (dataId) {
        delete projects[dataId];
    };

    self.get = function (category) {
        switch (category) {
        case "all":
            return projects;
        case "video":
            return video;
        case "printDesign":
            return printDesign;
        case "branding":
            return branding;
        case "webdesign":
            return webdesign;
        case "devWeb":
            return devWeb;
        default:
            return projects;
        }
    };
}
myPortfolio.service("Projects", ProjectsService);
