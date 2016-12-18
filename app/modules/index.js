var loginModule=require("./login");
var doctorModule=require("./doctor");


module.exports= angular.module('ocaApp', ['ui.router',
loginModule.name,doctorModule.name
]);