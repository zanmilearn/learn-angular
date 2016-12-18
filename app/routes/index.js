module.exports=
        [{ 
          routeName:'login',
          routeValue:{
                url: '/login',
                templateUrl: 'views/login.html',
                controller: 'loginController',
                controllerAs: 'logCtrl'
                }
        },
        { routeName:'patient',
          routeValue:{
                url: '/patient',
                templateUrl: 'views/patient.html'
                }
        },
        { routeName:'doctor',
          routeValue:{
                url: '/doctor',
                templateUrl: 'views/doctordashboard.html',
                controller: 'doctorController',
                controllerAs: 'docCtrl'
                }
        }];
