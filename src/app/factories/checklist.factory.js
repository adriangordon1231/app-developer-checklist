(function () {

  "use strict";

  angular.module('mobileDeveloperChecklist')
    .factory('CheckListFactory', function ($q,$http) {




      /**
       * [returns the checklist json object]
       * @return {[Object]} [javascript promise]
       */
      var getChekList = function () {

        var deferred = $q.defer();

        $http.get("checklist.json").then(function (data) {
          deferred.resolve(data);

        },function (err) {
          deferred.reject(err);
        });

        return deferred.promise;
      };




      /**
       * [calculateCompletionPercentage description]
       * @param  {[Object]} checklist [the checklist object ... the one retured from the getCheckList function]
       * @return {[Number]}           [a decimal that represents the completion percetage (1 = 100%)]
       */
      var calculateCompletionPercentage = function (checklist) {

        var listChecks = _.pluck(checklist,'checks');

        // array of all the boolean values contained the checklist
        // basically, they represent the true/false state of every 'check' in the object
        var valuesArray = [];

        listChecks.forEach(function (section) {

          section.forEach(function (item) {
            valuesArray.push(item.value);
          });
        });

        var totalChecks = valuesArray.length;
        var totalCompletedChecks = 0;

        valuesArray.forEach(function (item) {
          if(item === true){
            totalCompletedChecks++;
          }
        });

        return totalCompletedChecks / totalChecks;

      };



      /**
       * [
       * 	returns a checklist object where the entered section's 'checks_completed' valus is set to a string
       * 	represetation of the object's state of completion.
       *
       * 	E.G. if 5 of 20 objects in the sections 'checks' array has a 'value' of true, the function will
       * 	return a complete checklist object where the 'checks_completed' value for the specificed section
       * 	will be === 5/25 (String)
       * ]
       * @param  {[Object]} checklistObject [The entire checklist JSON object]
       * @param  {[Object]} sectionObject   [object representation of a specific section of the checkslist JSON obeject]
       * @return {[Object]}                 [checkList object with mutated 'checks_completed' value]
       */
      var updateChecksCompleted = function (checklistObject,sectionObject) {

        var completionFraction = "";
        var totalChecks = sectionObject.checks.length;
        var completedChecks = 0;

        var selectedSection = sectionObject.sectionAlias;

        checklistObject.forEach(function (element) {

          if(element.sectionAlias === selectedSection){

            var checkedItems = _.filter(element.checks,function (n) {
              return n.value === true;
            });

            completedChecks = checkedItems.length;
            completionFraction = completedChecks + "/" + totalChecks;
            element.checks_completed = completionFraction;
          }
        });

        return checklistObject;
      };




      return{
        getChekList:getChekList,
        calculateCompletionPercentage: calculateCompletionPercentage,
        updateChecksCompleted: updateChecksCompleted
      };
    });


})();
