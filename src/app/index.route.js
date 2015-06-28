(function() {
  'use strict';

  angular
    .module('mobileDeveloperChecklist')
    .config(routeConfig);

  /** @ngInject */
  function routeConfig($stateProvider, $urlRouterProvider) {
    $stateProvider
      .state('home', {
        url: '/',
        templateUrl: 'app/main/main.html',
        controller: 'MainController',
        controllerAs: 'checklist'
      });

    $urlRouterProvider.otherwise('/');
  }

})();
