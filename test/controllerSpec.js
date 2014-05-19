describe('controller tests', function() {  
  var $scope, $rootScope, createController;
  beforeEach(module('voyeurApp'));

  beforeEach(inject(function($injector) {
    $rootScope = $injector.get('$rootScope');
    $scope = $rootScope.$new();
    
    $httpBackend = $injector.get('$httpBackend');
    //$httpBackend.when('POST', '/es', 'blah').respond('data');

    var $controller = $injector.get('$controller');

    createController = function() {
        return $controller('QueryCtrl', {
            '$scope': $scope
        });
    };
  }));

  afterEach(function() {
    $httpBackend.verifyNoOutstandingExpectation();
    $httpBackend.verifyNoOutstandingRequest();
  });

  it('should have a method to check if the path is active', function() {
      var controller = createController();
      var qObj = {size: 150,query: {match_all: {}}};
      var result = {"hits": {"hits":[{"love":"hate"}]}};

      $httpBackend.expect('POST', $scope.esUri, qObj).respond(result);
      $scope.runQuery();
      $httpBackend.flush();

      expect($scope.queryResults.length()).toBeGreaterThan(0);
  });

});