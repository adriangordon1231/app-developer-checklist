(function() {
  'use strict';

  angular
    .module('mobileDeveloperChecklist')
    .config(config);

  /** @ngInject */
  function config($logProvider) {
    // Enable log
    $logProvider.debugEnabled(true);

  }

})();
