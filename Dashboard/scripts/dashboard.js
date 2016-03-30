var apps = ["infuse", "vlc"];

var dashboard = angular.module('dashboard', []);
dashboard.controller('DataController', function() {
    this.someVar = 'SomeVar';
    this.getApps = function() {
        console.log('apps', apps);
        return apps;
    };
});