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



      //todo: Complete this function
      var calculateCompletionPercentage = function (checksArray, trueCount) {

        var numOfChecks = checksArray.length;

        return numOfChecks / trueCount;


      };




      return{
        getChekList:getChekList,
        calculateCompletionPercentage: calculateCompletionPercentage
      };
    });


})();
