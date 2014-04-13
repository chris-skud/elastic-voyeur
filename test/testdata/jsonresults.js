var valArrayAsFirstLevel = '["blah", "howdy", "peanuts"]';

var singleValResult = "hi";

var typicalElasticSearchResult = '{"took":2,"timed_out":false,"_shards":{"total":5,"successful":5,"failed":0},"hits":{"total":6,"max_score":1.0,"hits":[{"_index":"movies","_type":"movie","_id":"2","_score":1.0, "_source" : 
{
    "title": "Lawrence of Arabia",
    "director": "David Lean",
    "year": 1962,
    "genres": ["Adventure", "Biography", "Drama"]
}},{"_index":"movies","_type":"movie","_id":"3","_score":1.0, "_source" : 
{
    "title": "To Kill a Mockingbird",
    "director": "Robert Mulligan",
    "year": 1962,
    "genres": ["Crime", "Drama", "Mystery"]
}},{"_index":"movies","_type":"movie","_id":"1","_score":1.0, "_source" : 
{
    "title": "The Godfather",
    "director": "Francis Ford Coppola",
    "year": 1972,
    "genres": ["Crime", "Drama"]
}},{"_index":"movies","_type":"movie","_id":"6","_score":1.0, "_source" : 
{
    "title": "The Assassination of Jesse James by the Coward Robert Ford",
    "director": "Andrew Dominik",
    "year": 2007,
    "genres": ["Biography", "Crime", "Drama"]
}},{"_index":"movies","_type":"movie","_id":"5","_score":1.0, "_source" : 
{
    "title": "Kill Bill: Vol. 1",
    "director": "Quentin Tarantino",
    "year": 2003,
    "genres": ["Action", "Crime", "Thriller"]
}},{"_index":"movies","_type":"movie","_id":"4","_score":1.0, "_source" : 
{
    "title": "Apocalypse Now",
    "director": "Francis Ford Coppola",
    "year": 1979,
    "genres": ["Drama", "War"]
}}]}}';