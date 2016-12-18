

var sharedapp = require('../shared');

var loginapp = angular.module('ocaApp.Login', [sharedapp.name]);

loginapp.controller('loginController', ['$scope','APPCONFIG', require('./controllers/loginController')]);

loginapp.factory('loginService', require('./services/loginService'));

var constantList=require("./constants");

constantList.forEach(function(item){
    loginapp.constant(item.constantName,item.constantValue);
});


module.exports=loginapp;

