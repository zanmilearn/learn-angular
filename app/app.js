
    var app = require("./modules");

    app.config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {

        $urlRouterProvider.otherwise('/login');

        var  routeList= require("./routes");

        routeList.forEach(function(item) {
            if (item.routeName && item.routeValue) {
                $stateProvider.state(item.routeName, item.routeValue);
            }
        });
   
    }]);