(function() {
  'use strict';

  angular.module('mobileDeveloperChecklist')
    .controller('MainController', function (CheckListFactory) {

      var self = this;

      this.completePercentage = 0.0;
      this.list = {};



      this.getDefaultChecklist = function () {
        CheckListFactory.getChekList().then(function (data) {

          self.list = data.data;

        });
      }



      /**
       * [updates the values being reflected by controllers models based on the current state of the checklist]
       * @param  {[Object]} sectionObject [*Optional* section Obeject]
       * @return {[Void]}
       */
      this.updateCompletionStatus = function (sectionObject) {
        self.completePercentage = CheckListFactory.calculateCompletionPercentage(self.list);

        if(sectionObject){
          self.list = CheckListFactory.updateChecksCompleted(self.list,sectionObject);
        }

      };




      /**
       * [clears the checklist by resetting all of the models in this controller]
       * @param  {[Function]} callback [*Optional* callback function]
       * @return {[Void]}
       */
      this.clearSelections = function (callback) {

        CheckListFactory.getChekList().then(function (data) {
          self.list = data.data;
        });

        self.completePercentage = 0.0;

        if(callback){
          callback();
        }

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

      this.getDefaultChecklist();

    });

})();
