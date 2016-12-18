
var sharedapp = angular.module('ocaApp.Shared', []);


//common services
sharedapp.factory('commonService', require('./services/commonservice'));
sharedapp.factory('dataService', require('./services/dataservice'));

//common directives
sharedapp.directive('testdirective',require('./directives/testdirective'));

//common constants
var constantList=require("./constants");

constantList.forEach(function(item){
    sharedapp.constant(item.constantName,item.constantValue);
});

module.exports=sharedapp;

