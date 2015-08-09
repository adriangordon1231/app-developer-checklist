(function() {
  'use strict';

  describe('ChecklistFactory', function(){

    var httpBackend, CheckListFactory, checklistJson;

    beforeEach(module('mobileDeveloperChecklist'));

    beforeEach(inject(function ($injector, $httpBackend) {

      CheckListFactory = $injector.get('CheckListFactory');
      httpBackend = $httpBackend;

      // mock
      httpBackend.when("GET","checklist.json").respond([
        {
            "sectionTitle":"Fake Checks 1",
            "sectionAlias":"fake_checks_1",
            "thumbnail":"assets/images/network.png",
            "checks_completed":"0",
            "checks":[
              {
                "description":"Lorem ipsum dolor sit amet, consectetuer adipiscing elit.",
                "value":false,
                "links":[]
              },
              {
                "description":"Lorem ipsum dolor sit amet, consectetuer adipiscing elit.",
                "value":false,
                "links":[]
              }
            ]
          },
          {
          "sectionTitle":"Fake Checks 2",
          "sectionAlias":"fake_checks_2",
          "thumbnail":"assets/images/fake.png",
          "checks_completed":"0",
          "checks":[
            {
              "description":"Lorem ipsum dolor sit amet, consectetuer adipiscing elit.",
              "value":true,
              "links":[]
            },
            {
              "description":"Lorem ipsum dolor sit amet, consectetuer adipiscing elit.",
              "value":false,
              "links":[]
            }
          ]
        }
      ]);
    }));

    beforeEach(function () {

      CheckListFactory.getChekList().then(function (checklist) {
        checklistJson = checklist;
      });
    })




    it("The 'getChekList' method returns the contents of 'checklist.json'", function () {

      httpBackend.flush();

      expect(checklistJson).toBeDefined();
      expect(checklistJson.config.url === "checklist.json").toBe(true);
      expect(checklistJson.config.headers.Accept).toMatch(/application\/json/);
    });




    it("The 'calculateCompletionPercentage' method returns the percentage of checks that have been completed in the checklist ... aka 'value === true'",function () {

      httpBackend.flush();

      var completionPercentage = CheckListFactory.calculateCompletionPercentage(checklistJson.data);

      expect(completionPercentage === 0.25).toBe(true);
    });




    it("The 'updateChecksCompleted' updates the 'checks_completed' value of the section the checklist that has been passed to it to match the number of checks that have been completed",function () {

      httpBackend.flush();

      var completionFraction = CheckListFactory.updateChecksCompleted(checklistJson.data,checklistJson.data[1]);

      // the function should return a String representation of the amount of cheks that have been completed in the section
      expect(typeof completionFraction[1].checks_completed === "string").toBe(true);
      expect(completionFraction[1].checks_completed === "1/2").toBe(true);
    });

  });
})();
