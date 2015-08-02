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



      /**
       * [updates the values being reflected by controllers models based on the current state of the checklist]
       * @param  {[Object]} sectionObject [*Optional* section Obeject]
       * @return {[Void]}                
       */
      this.updateCompletionStatus = function (sectionObject) {
        self.completePercentage = CheckListFactory.calculateCompletionPercentage(self.list);
        self.list = CheckListFactory.updateChecksCompletedValue(self.list,sectionObject);
      };




      this.updateCompletionColor = function (percentCompleted) {
        return {
          'brightRed': percentCompleted < 0.1,
          'orange':percentCompleted > 0.1 ,
          'yellow': percentCompleted > 0.5,
          'green': percentCompleted > 0.8,
          'black': percentCompleted === 1
        };
      };

    });

})();
