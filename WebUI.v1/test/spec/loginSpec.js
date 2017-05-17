describe("login objects", () => {

    let $componentConstructor,
        scope;

    beforeEach(angular.mock.module('appMS4'));



    describe('INSIDE login object', () => {
        it('just to say', () => {
            expect(true).toBeTruthy('Yes, it\'s true');
        });
    });


    beforeEach(inject(($componentController, $rootScope) => {
        $componentConstructor = $componentController;
        scope = $rootScope.$new();

    }));


    it("expect testFunc to return 10", () => {
        let compo = $componentConstructor('loginComponent', { $scope: scope });
        expect(compo.testFunc()).toBe(10);
        //pending('to be continue....... ');
      
    }); //--should be of type login

    //it("2nd test, expect testFunc to return 12", () => {
    //    let compo = $componentConstructor('loginComponent', { $scope: scope });
    //    expect(compo.testFunc()).toEqual(12);
       

    //}); //--should be of type login

});
 