describe('services tests', function() {
  beforeEach(module('voyeurApp'));
  
  /* PropertyPathResolver creates an array of strings that can be used to create a table from a json object */
  it('should parse the keys of a complex js object into an array of fully qualified strings',
    inject(function(PropertyPathResolver) {
      var jsObj = PropertyPathResolver.resultsKeys(
        {"_index":"movies","_type":"movie","_id":"2","_score":1.0, "_source" : 
          { "title": "Lawrence of Arabia", "director": "David Lean", "year": 1962, "genres": ["Adventure", "Biography", "Drama"]}}
      );
      expect(jsObj).toEqual([ '_index', '_type', '_id', '_score', '_source.title', '_source.director', '_source.year', '_source.genres[0]', '_source.genres[1]', '_source.genres[2]' ]);
    })
  );


  it('should return an array with single 0 if passed a non object',
    inject(function(PropertyPathResolver) {
      var jsObj = PropertyPathResolver.resultsKeys('nada');
      expect(jsObj).toEqual([0]);
    })
  );


  it('should handle value type (non-objet) arrays by returning array of string indices',
    inject(function(PropertyPathResolver) {
      var jsObj = PropertyPathResolver.resultsKeys(['blah', 'howdy', 'peanuts']);
      expect(jsObj).toEqual(['0','1','2']);
    })
  );


});