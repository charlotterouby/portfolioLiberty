myPortfolio.factory('ProjectsFactory', ['$http', '$q', function ($http, $q) {
    var projects = {
        'projectsList': false,
        'getProjectsList': function () {
            var deffered = $q.defer();
            $http.get('assets/js/projects.json').success(
                function (data) {
                    // console.log(data.projects);
                    projects.projectsList = data.projects;
                    // console.log(projects.projectsList);
                    deffered.resolve(projects.projectsList);
                }
            ).error(
                function (data) {
                    deffered.reject('Oups, il semble y avoir un petit problème pour récupérer la liste des projets...');
                }
            );
            return deffered.promise;
        }
    };
    return projects;
}]);
