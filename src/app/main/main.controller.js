(function() {
  'use strict';

  angular.module('mobileDeveloperChecklist')
    .controller('MainController', function (CheckListFactory) {

      var self = this;

      this.completePercentage = 0.0;
      this.list = {};

      CheckListFactory.getChekList().then(function (data) {

        self.list = data.data;

      });
    });

})();
