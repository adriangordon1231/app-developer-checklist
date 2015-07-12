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

        var listChecks = _.pluck(checklist,'checks')

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




      return{
        getChekList:getChekList,
        calculateCompletionPercentage: calculateCompletionPercentage
      };
    });


})();
