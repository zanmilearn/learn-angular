
var sharedapp = require('../shared');

var doctorapp = angular.module('ocaApp.Doctor', [sharedapp.name]);

doctorapp.controller('doctorController', ['$scope','APPCONFIG', require('./controllers/doctorController')]);

doctorapp.factory('doctorService', require('./services/doctorService'));

var constantList=require("./constants");

constantList.forEach(function(item){
    doctorapp.constant(item.constantName,item.constantValue);
});


module.exports=doctorapp;