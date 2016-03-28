var alquitrackApp =
    angular.module('alquitrackApp')
        .config(
        [
            '$controllerProvider', '$compileProvider', '$filterProvider', '$provide',
            function($controllerProvider, $compileProvider, $filterProvider, $provide) {
                alquitrackApp.controller = $controllerProvider.register;
                alquitrackApp.directive = $compileProvider.directive;
                alquitrackApp.filter = $filterProvider.register;
                alquitrackApp.factory = $provide.factory;
                alquitrackApp.service = $provide.service;
                alquitrackApp.constant = $provide.constant;
                alquitrackApp.value = $provide.value;
            }
        ]);


alquitrackApp.config(function($breadcrumbProvider) {
    $breadcrumbProvider.setOptions({
        template: '<ul class="breadcrumb"><li><i class="fa fa-home"></i><a ui-sref="app.dashboard">Home</a></li><li ng-repeat="step in steps" ng-class="{active: $last}" ng-switch="$last || !!step.abstract"><a ng-switch-when="false" href="{{step.ncyBreadcrumbLink}}">{{step.ncyBreadcrumbLabel}}</a><span ng-switch-when="true">{{step.ncyBreadcrumbLabel}}</span></li></ul>'
    });
});

alquitrackApp.factory('ShareData', function () {
    return { value: 0 };
})
