// Déclaration du module "myPortfolio"
var myPortfolio = angular.module('myPortfolio', ['ngRoute', 'ngMaterial']);

// NavbarDirective
// ProjectsService
// PortfolioController
// ProjectController
// Initialisation du Service Projects avec myPortfolio.run

//Navbar Directive
myPortfolio.directive('myNavbar', function () {
    return {
        templateUrl: 'dist/templates/navbarDirective/navbar-template.html',
        restrict: 'EA',
//        link: function NavBarConfig($rootScope, $scope) {
//            $rootScope.$on('$routeChangeSuccess', function (event, current) {
//                $scope.currentLink = getCurrentLinkFromRoute(current);
//            });
//        }
    }
});

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

// Initialisation du Service Projects
myPortfolio.run(function ($http, Projects) {
    $http
        .get('assets/js/projects.json')
        .then(function (httpResponse) {
//            console.log(httpResponse.data);
            return httpResponse.data;
        }).then(function (data) {
//            console.log(data);
            angular.forEach(data.projects, function (project) {
                Projects.add(project);
//                console.log(project);
            });
        });
});

//Config Theme MaterialDesign
//
//myPortfolio.config(function ($mdThemingProvider) {
//    $mdThemingProvider.theme('charlotte')
//      .primaryPalette('teal')
//      .accentPalette('pink');
//  });

myPortfolio.config(function($mdIconProvider) {
  $mdIconProvider.fontSet('md', 'material-icons');
});

myPortfolio.config(function($routeProvider, $locationProvider) {
    $routeProvider
        //Landing page
        .when('/accueil', {
            templateUrl: 'dist/templates/landing-template.html'
        })
        //CV page
        .when('/cv', {
            templateUrl: 'dist/templates/presentation-template.html'
        })
        //Grid Portfolio
        .when('/portfolio', {
            templateUrl: 'dist/templates/portfolio/portfolio-template.html',
            controller: 'PortfolioController',
            controllerAs: 'portfolioCtrl'
        })
        //Description Project
        .when('/project/:id', {
            templateUrl: 'dist/templates/project/project-template.html',
            controller: 'ProjectController',
            controllerAs: 'projectCtrl'
        })
        // Infos contact
        .when('/contact', {
            templateUrl: 'dist/templates/contact-template.html'
        })
        //Default Behavior
        .otherwise({
            redirectTo: '/accueil'
        });

    $locationProvider.html5Mode(true);
});

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC5qcyIsIm5hdmJhckRpcmVjdGl2ZS9uYXZiYXItZGlyZWN0aXZlLmpzIiwicHJvamVjdHNTZXJ2aWNlL3Byb2plY3RzLXNlcnZpY2UuanMiLCJwb3J0Zm9saW8vcG9ydGZvbGlvLWNvbnRyb2xsZXIuanMiLCJwcm9qZWN0L3Byb2plY3QtY29udHJvbGxlci5qcyIsImFwcC1ydW4uanMiLCJyb3V0ZS5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUNSQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ1pBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUNoRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ25CQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDbkJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDM0JBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwiZmlsZSI6InNjcmlwdHMuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvLyBEw6ljbGFyYXRpb24gZHUgbW9kdWxlIFwibXlQb3J0Zm9saW9cIlxyXG52YXIgbXlQb3J0Zm9saW8gPSBhbmd1bGFyLm1vZHVsZSgnbXlQb3J0Zm9saW8nLCBbJ25nUm91dGUnLCAnbmdNYXRlcmlhbCddKTtcclxuXHJcbi8vIE5hdmJhckRpcmVjdGl2ZVxyXG4vLyBQcm9qZWN0c1NlcnZpY2VcclxuLy8gUG9ydGZvbGlvQ29udHJvbGxlclxyXG4vLyBQcm9qZWN0Q29udHJvbGxlclxyXG4vLyBJbml0aWFsaXNhdGlvbiBkdSBTZXJ2aWNlIFByb2plY3RzIGF2ZWMgbXlQb3J0Zm9saW8ucnVuXHJcbiIsIi8vTmF2YmFyIERpcmVjdGl2ZVxyXG5teVBvcnRmb2xpby5kaXJlY3RpdmUoJ215TmF2YmFyJywgZnVuY3Rpb24gKCkge1xyXG4gICAgcmV0dXJuIHtcclxuICAgICAgICB0ZW1wbGF0ZVVybDogJ2Rpc3QvdGVtcGxhdGVzL25hdmJhckRpcmVjdGl2ZS9uYXZiYXItdGVtcGxhdGUuaHRtbCcsXHJcbiAgICAgICAgcmVzdHJpY3Q6ICdFQScsXHJcbi8vICAgICAgICBsaW5rOiBmdW5jdGlvbiBOYXZCYXJDb25maWcoJHJvb3RTY29wZSwgJHNjb3BlKSB7XHJcbi8vICAgICAgICAgICAgJHJvb3RTY29wZS4kb24oJyRyb3V0ZUNoYW5nZVN1Y2Nlc3MnLCBmdW5jdGlvbiAoZXZlbnQsIGN1cnJlbnQpIHtcclxuLy8gICAgICAgICAgICAgICAgJHNjb3BlLmN1cnJlbnRMaW5rID0gZ2V0Q3VycmVudExpbmtGcm9tUm91dGUoY3VycmVudCk7XHJcbi8vICAgICAgICAgICAgfSk7XHJcbi8vICAgICAgICB9XHJcbiAgICB9XHJcbn0pO1xyXG4iLCIvLyBQcm9qZWN0c1NlcnZpY2VcclxuZnVuY3Rpb24gUHJvamVjdHNTZXJ2aWNlKCkge1xyXG4gICAgdmFyIHNlbGYgPSB0aGlzLFxyXG4gICAgICAgIHByb2plY3RzID0ge30sXHJcbiAgICAgICAgdmlkZW8gPSB7fSxcclxuICAgICAgICBwcmludERlc2lnbiA9IHt9LFxyXG4gICAgICAgIGJyYW5kaW5nID0ge30sXHJcbiAgICAgICAgd2ViZGVzaWduID0ge30sXHJcbiAgICAgICAgZGV2V2ViID0ge307XHJcblxyXG4gICAgc2VsZi5hZGQgPSBmdW5jdGlvbiAoZGF0YSkge1xyXG4gICAgICAgIC8vY29uc29sZS5sb2coZGF0YSk7XHJcbiAgICAgICAgaWYgKHByb2plY3RzW2RhdGEuaWRdID09PSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgcHJvamVjdHNbZGF0YS5pZF0gPSBkYXRhO1xyXG4gICAgICAgICAgICAvL2NvbnNvbGUubG9nKHByb2plY3RzKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmIChkYXRhLmNhdGVnb3JpZXMudmlkZW8gPT09IHRydWUgJiYgdmlkZW9bZGF0YS5pZF0gPT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICB2aWRlb1tkYXRhLmlkXSA9IGRhdGE7XHJcbiAgICAgICAgICAgIC8vY29uc29sZS5sb2codmlkZW8pO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAoZGF0YS5jYXRlZ29yaWVzLnByaW50RGVzaWduID09PSB0cnVlICYmIHByaW50RGVzaWduW2RhdGEuaWRdID09PSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgcHJpbnREZXNpZ25bZGF0YS5pZF0gPSBkYXRhO1xyXG4gICAgICAgICAgICAvL2NvbnNvbGUubG9nKHByaW50RGVzaWduKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKGRhdGEuY2F0ZWdvcmllcy5icmFuZGluZyA9PT0gdHJ1ZSAmJiBicmFuZGluZ1tkYXRhLmlkXSA9PT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgIGJyYW5kaW5nW2RhdGEuaWRdID0gZGF0YTtcclxuICAgICAgICAgICAgLy9jb25zb2xlLmxvZyhicmFuZGluZyk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmIChkYXRhLmNhdGVnb3JpZXMud2ViZGVzaWduID09PSB0cnVlICYmIHdlYmRlc2lnbltkYXRhLmlkXSA9PT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgIHdlYmRlc2lnbltkYXRhLmlkXSA9IGRhdGE7XHJcbiAgICAgICAgICAgIC8vY29uc29sZS5sb2cod2ViZGVzaWduKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKGRhdGEuY2F0ZWdvcmllcy5kZXZXZWIgPT09IHRydWUgJiYgZGV2V2ViW2RhdGEuaWRdID09PSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgZGV2V2ViW2RhdGEuaWRdID0gZGF0YTtcclxuICAgICAgICAgICAgLy9jb25zb2xlLmxvZyhkZXZXZWIpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICB9O1xyXG5cclxuICAgIHNlbGYucmVtb3ZlID0gZnVuY3Rpb24gKGRhdGFJZCkge1xyXG4gICAgICAgIGRlbGV0ZSBwcm9qZWN0c1tkYXRhSWRdO1xyXG4gICAgfTtcclxuXHJcbiAgICBzZWxmLmdldCA9IGZ1bmN0aW9uIChjYXRlZ29yeSkge1xyXG4gICAgICAgIHN3aXRjaCAoY2F0ZWdvcnkpIHtcclxuICAgICAgICBjYXNlIFwiYWxsXCI6XHJcbiAgICAgICAgICAgIHJldHVybiBwcm9qZWN0cztcclxuICAgICAgICBjYXNlIFwidmlkZW9cIjpcclxuICAgICAgICAgICAgcmV0dXJuIHZpZGVvO1xyXG4gICAgICAgIGNhc2UgXCJwcmludERlc2lnblwiOlxyXG4gICAgICAgICAgICByZXR1cm4gcHJpbnREZXNpZ247XHJcbiAgICAgICAgY2FzZSBcImJyYW5kaW5nXCI6XHJcbiAgICAgICAgICAgIHJldHVybiBicmFuZGluZztcclxuICAgICAgICBjYXNlIFwid2ViZGVzaWduXCI6XHJcbiAgICAgICAgICAgIHJldHVybiB3ZWJkZXNpZ247XHJcbiAgICAgICAgY2FzZSBcImRldldlYlwiOlxyXG4gICAgICAgICAgICByZXR1cm4gZGV2V2ViO1xyXG4gICAgICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgICAgIHJldHVybiBwcm9qZWN0cztcclxuICAgICAgICB9XHJcbiAgICB9O1xyXG59XHJcbm15UG9ydGZvbGlvLnNlcnZpY2UoXCJQcm9qZWN0c1wiLCBQcm9qZWN0c1NlcnZpY2UpO1xyXG4iLCIvLyBQb3J0Zm9saW9Db250cm9sbGVyXHJcbmZ1bmN0aW9uIFBvcnRmb2xpb0NvbnRyb2xsZXIoUHJvamVjdHMsICRsb2NhdGlvbikge1xyXG4gICAgdmFyIHNlbGYgPSB0aGlzO1xyXG4gICAgc2VsZi5wcm9qZWN0cyA9IFByb2plY3RzLmdldChcImFsbFwiKTtcclxuLy8gICAgY29uc29sZS5sb2coc2VsZi5wcm9qZWN0cyk7XHJcblxyXG4gICAgc2VsZi5nb1RvID0gZnVuY3Rpb24ocHJvamVjdElkKSB7XHJcbi8vICAgICAgICBjb25zb2xlLmxvZyhcImZvbmN0aW9uIGdvVG9cIik7XHJcbiAgICAgICAgdmFyIG5ld0xvY2F0aW9uID0gXCJwcm9qZWN0L1wiICsgcHJvamVjdElkO1xyXG4gICAgICAgICRsb2NhdGlvbi5wYXRoKG5ld0xvY2F0aW9uKTtcclxuICAgIH1cclxuXHJcbiAgICBzZWxmLmZpbHRlckJ5ID0gZnVuY3Rpb24oY2F0ZWdvcnkpe1xyXG4gICAgICAgIHNlbGYucHJvamVjdHMgPSBQcm9qZWN0cy5nZXQoY2F0ZWdvcnkpO1xyXG4gICAgICAgIGNvbnNvbGUubG9nKHNlbGYucHJvamVjdHMpO1xyXG4gICAgfVxyXG5cclxufVxyXG5teVBvcnRmb2xpby5jb250cm9sbGVyKCdQb3J0Zm9saW9Db250cm9sbGVyJywgUG9ydGZvbGlvQ29udHJvbGxlcik7XHJcbiIsIi8vUHJvamVjdENvbnRyb2xsZXJcclxuZnVuY3Rpb24gUHJvamVjdENvbnRyb2xsZXIoUHJvamVjdHMsICRyb3V0ZVBhcmFtcykge1xyXG4gICAgdmFyIHNlbGYgPSB0aGlzO1xyXG4gICAgdmFyIHByb2plY3RzID0gUHJvamVjdHMuZ2V0KCk7XHJcbiAgICB2YXIgaWRTZWFyY2ggPSAkcm91dGVQYXJhbXMuaWQ7XHJcbiAgICB2YXIgY3VycmVudFByb2plY3QgPSBwcm9qZWN0c1tpZFNlYXJjaF07XHJcblxyXG4gICAgY29uc29sZS5sb2cocHJvamVjdHMpO1xyXG4gICAgY29uc29sZS5sb2coaWRTZWFyY2gpO1xyXG4gICAgY29uc29sZS5sb2coJHJvdXRlUGFyYW1zLmlkKTtcclxuICAgIGNvbnNvbGUubG9nKGN1cnJlbnRQcm9qZWN0KTtcclxuXHJcbiAgICBpZiAoY3VycmVudFByb2plY3QgIT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgIHNlbGYucHJvamVjdCA9IGN1cnJlbnRQcm9qZWN0O1xyXG4gICAgfVxyXG5cclxuXHJcbn1cclxubXlQb3J0Zm9saW8uY29udHJvbGxlcignUHJvamVjdENvbnRyb2xsZXInLCBQcm9qZWN0Q29udHJvbGxlcik7XHJcbiIsIi8vIEluaXRpYWxpc2F0aW9uIGR1IFNlcnZpY2UgUHJvamVjdHNcclxubXlQb3J0Zm9saW8ucnVuKGZ1bmN0aW9uICgkaHR0cCwgUHJvamVjdHMpIHtcclxuICAgICRodHRwXHJcbiAgICAgICAgLmdldCgnYXNzZXRzL2pzL3Byb2plY3RzLmpzb24nKVxyXG4gICAgICAgIC50aGVuKGZ1bmN0aW9uIChodHRwUmVzcG9uc2UpIHtcclxuLy8gICAgICAgICAgICBjb25zb2xlLmxvZyhodHRwUmVzcG9uc2UuZGF0YSk7XHJcbiAgICAgICAgICAgIHJldHVybiBodHRwUmVzcG9uc2UuZGF0YTtcclxuICAgICAgICB9KS50aGVuKGZ1bmN0aW9uIChkYXRhKSB7XHJcbi8vICAgICAgICAgICAgY29uc29sZS5sb2coZGF0YSk7XHJcbiAgICAgICAgICAgIGFuZ3VsYXIuZm9yRWFjaChkYXRhLnByb2plY3RzLCBmdW5jdGlvbiAocHJvamVjdCkge1xyXG4gICAgICAgICAgICAgICAgUHJvamVjdHMuYWRkKHByb2plY3QpO1xyXG4vLyAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhwcm9qZWN0KTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfSk7XHJcbn0pO1xyXG5cclxuLy9Db25maWcgVGhlbWUgTWF0ZXJpYWxEZXNpZ25cclxuLy9cclxuLy9teVBvcnRmb2xpby5jb25maWcoZnVuY3Rpb24gKCRtZFRoZW1pbmdQcm92aWRlcikge1xyXG4vLyAgICAkbWRUaGVtaW5nUHJvdmlkZXIudGhlbWUoJ2NoYXJsb3R0ZScpXHJcbi8vICAgICAgLnByaW1hcnlQYWxldHRlKCd0ZWFsJylcclxuLy8gICAgICAuYWNjZW50UGFsZXR0ZSgncGluaycpO1xyXG4vLyAgfSk7XHJcblxyXG5teVBvcnRmb2xpby5jb25maWcoZnVuY3Rpb24oJG1kSWNvblByb3ZpZGVyKSB7XHJcbiAgJG1kSWNvblByb3ZpZGVyLmZvbnRTZXQoJ21kJywgJ21hdGVyaWFsLWljb25zJyk7XHJcbn0pO1xyXG4iLCJteVBvcnRmb2xpby5jb25maWcoZnVuY3Rpb24oJHJvdXRlUHJvdmlkZXIsICRsb2NhdGlvblByb3ZpZGVyKSB7XHJcbiAgICAkcm91dGVQcm92aWRlclxyXG4gICAgICAgIC8vTGFuZGluZyBwYWdlXHJcbiAgICAgICAgLndoZW4oJy9hY2N1ZWlsJywge1xyXG4gICAgICAgICAgICB0ZW1wbGF0ZVVybDogJ2Rpc3QvdGVtcGxhdGVzL2xhbmRpbmctdGVtcGxhdGUuaHRtbCdcclxuICAgICAgICB9KVxyXG4gICAgICAgIC8vQ1YgcGFnZVxyXG4gICAgICAgIC53aGVuKCcvY3YnLCB7XHJcbiAgICAgICAgICAgIHRlbXBsYXRlVXJsOiAnZGlzdC90ZW1wbGF0ZXMvcHJlc2VudGF0aW9uLXRlbXBsYXRlLmh0bWwnXHJcbiAgICAgICAgfSlcclxuICAgICAgICAvL0dyaWQgUG9ydGZvbGlvXHJcbiAgICAgICAgLndoZW4oJy9wb3J0Zm9saW8nLCB7XHJcbiAgICAgICAgICAgIHRlbXBsYXRlVXJsOiAnZGlzdC90ZW1wbGF0ZXMvcG9ydGZvbGlvL3BvcnRmb2xpby10ZW1wbGF0ZS5odG1sJyxcclxuICAgICAgICAgICAgY29udHJvbGxlcjogJ1BvcnRmb2xpb0NvbnRyb2xsZXInLFxyXG4gICAgICAgICAgICBjb250cm9sbGVyQXM6ICdwb3J0Zm9saW9DdHJsJ1xyXG4gICAgICAgIH0pXHJcbiAgICAgICAgLy9EZXNjcmlwdGlvbiBQcm9qZWN0XHJcbiAgICAgICAgLndoZW4oJy9wcm9qZWN0LzppZCcsIHtcclxuICAgICAgICAgICAgdGVtcGxhdGVVcmw6ICdkaXN0L3RlbXBsYXRlcy9wcm9qZWN0L3Byb2plY3QtdGVtcGxhdGUuaHRtbCcsXHJcbiAgICAgICAgICAgIGNvbnRyb2xsZXI6ICdQcm9qZWN0Q29udHJvbGxlcicsXHJcbiAgICAgICAgICAgIGNvbnRyb2xsZXJBczogJ3Byb2plY3RDdHJsJ1xyXG4gICAgICAgIH0pXHJcbiAgICAgICAgLy8gSW5mb3MgY29udGFjdFxyXG4gICAgICAgIC53aGVuKCcvY29udGFjdCcsIHtcclxuICAgICAgICAgICAgdGVtcGxhdGVVcmw6ICdkaXN0L3RlbXBsYXRlcy9jb250YWN0LXRlbXBsYXRlLmh0bWwnXHJcbiAgICAgICAgfSlcclxuICAgICAgICAvL0RlZmF1bHQgQmVoYXZpb3JcclxuICAgICAgICAub3RoZXJ3aXNlKHtcclxuICAgICAgICAgICAgcmVkaXJlY3RUbzogJy9hY2N1ZWlsJ1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICRsb2NhdGlvblByb3ZpZGVyLmh0bWw1TW9kZSh0cnVlKTtcclxufSk7XHJcbiJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==
