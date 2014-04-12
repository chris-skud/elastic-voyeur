describe('filter', function() {
  beforeEach(module('voyeurApp.filters'));
  describe('startFrom', function() {
    it('should return an array sliced at the passed position',
        inject(function(startFromFilter) {
      var testArr = ['hi', 'blah', 'love'];
      expect(startFromFilter(testArr, 1).length).toBe(2);
 
    }));
  });
});