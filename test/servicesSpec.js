describe('services tests', function() {
  beforeEach(module('voyeurApp'));
  
  it('should parse the keys of a complex js object into an array of fully qualified strings',
    inject(function(PropertyPathResolver) {
      var propertyArr = PropertyPathResolver.resultsKeys(
        {"_index":"movies","_type":"movie","_id":"2","_score":1.0, "_source" :
          { "title": "Lawrence of Arabia", "director": "David Lean", "year": 1962, "genres": ["Adventure", "Biography", "Drama"]}}
      );
      expect(propertyArr).toEqual([ '_index', '_type', '_id', '_score', '_source.title', '_source.director', '_source.year', '_source.genres[0]', '_source.genres[1]', '_source.genres[2]' ]);
    })
  );


  it('should return an array with single 0 if passed a non object',
    inject(function(PropertyPathResolver) {
      var propertyArr = PropertyPathResolver.resultsKeys('nada');
      expect(propertyArr).toEqual([0]);
    })
  );


  it('should handle value type (non-objet) arrays by returning array of string indices',
    inject(function(PropertyPathResolver) {
      var propertyArr = PropertyPathResolver.resultsKeys(['blah', 'howdy', 'peanuts']);
      expect(propertyArr).toEqual(['0','1','2']);
    })
  );
});