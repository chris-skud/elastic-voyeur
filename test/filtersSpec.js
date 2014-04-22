describe('filters tests', function() {
  beforeEach(module('voyeurApp'));
  it('return an array of length 2',
    inject(function(startFromFilter) {
      var testArr = ['hi', 'blah', 'love'];
      var arr = startFromFilter(testArr, 1);
      expect(arr.length).toBe(2);
      expect(arr).toEqual(['blah', 'love'])
    })
  );

  it('return an empty array when param is not an array',
    inject(function(startFromFilter) {
      var testArr = -1;
      expect(startFromFilter(testArr, 0)).toEqual([]);
    })
  );
});