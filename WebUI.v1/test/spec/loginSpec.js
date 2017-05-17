describe("login objects", () => {

    let $controllerConstructor,
        scope;




    beforEach(module('app'));

    beforeEach(inject(($controller, $rootScope) => {
        $controllerConstructor = $controller;    
        scope = $rootScope.$new();
        
    })); 

    it("should be of type login", () => {
        
        expect(scope.testFunc()).toBe(10);
        

    }); //--should be of type login

});