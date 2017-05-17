describe("login objects", () => {

    let $componentConstructor,
        scope;

    beforeEach(angular.mock.module('appMS4'));



    describe('INSIDE login object', () => {
        it('just to say', () => {
            expect(true).toBeTruthy('Yes, it\'s true');
        });
    });


    beforeEach(inject((_$component_, $rootScope) => {
        $componentConstructor = _$component_;
        scope = $rootScope.$new();

    }));


    


    it("EXPECT testFunc to return 10", () => {
        let compo = $componentConstructor('loginComponent', { $scope: scope });
        expect(compo.testFunc()).toBe(10);
        //pending('to be continue....... ');
      
    }); //--should be of type login

   

});
 