const frisby = require('../src/frisby');
var alpha3_code_IND;


var COUNTRY_URL = "http://services.groupkt.com/country/get/all";
var COUNTRY_URL_USA = "http://services.groupkt.com/state/get/USA/all";
var COUNTRY_URL_IND = "http://services.groupkt.com/state/get/{alpha3_code_IND}/all";

describe('Expectation Suite', function() {
	
	// Test1a Check Http status: 200,Rest Response,application/json
	frisby.create('Check Http status: 200,Rest Response,application/json')
	  .get(COUNTRY_URL)
	  .expectStatus(200)
	  .expectHeader('Content-Type', 'application/json;charset=utf-8')
	  .expectJSONTypes({
		  RestResponse : Object
	  })
	  .toss();
	
	// Test1b result: Array Length:249
	frisby.create('Expect Status: Result:Array Length:249')
	  .get(COUNTRY_URL)
	  .expectJSONTypes('RestResponse', {
    	 result : Array
    	  })
      .expectJSONLength('RestResponse.result',249)	
      .toss();
      
   // Test1c result: name:Turkey, alpha2_code:TR, alpha3_code:TUR
     frisby.create('Expect Status: name:Turkey, alpha2_code:TR, alpha3_code:TUR ') 
     .get(COUNTRY_URL)
	  .expectJSON('RestResponse.result.227', {
		 name : "Turkey",
		 alpha2_code : "TR",
	     alpha3_code : "TUR"
	  })	  
	  .toss();
     
  // Test1d result: result.name Sorting
 
     
  // Test2a result: USA result key array
     frisby.create('Expect Status: USA Result key is array  ') 
     .get(COUNTRY_URL_USA)
	 .expectJSONTypes('RestResponse', {
    	 result : Array
    	  })
	  .toss();
     
  // Test2b result: id type number, country type string
     frisby.create('Expect Status: "name", "abbr", "area", "largest_city" ve "capital" is available and id type is Number, country type is String') 
     .get(COUNTRY_URL_USA)
     .expectJSONTypes('RestResponse.result.1', {
    	 id : Number,
    	 country: String
    	  })	  	  
	  .toss();

  // Test3a result: Get alpha3_code to India
     frisby.create('Expect Status: Get alpha3_code to India') 
     .get(COUNTRY_URL)
       .afterJSON(function(jsonObj) {
		      var itemId = 'Default Item ID';

		      if (jsonObj) {
		          itemId = jsonObj.itemId;
		      }

		      frisby.create('After Getting First Response')
		      	    .get(SERVER_URL + '/itemList/' + itemId)
		      	    .expectJSON({
		      	    	ID : itemId 
		      	    })
		      	    .toss();
		  })
	  .toss();  
     
 // Test3b result: Check largest_city of id:65
     frisby.create('Expect Status: Check largest_city of id:65') 
     .get(COUNTRY_URL_IND)
      	.expectJSON('RestResponse.result.0.65', {
      	largest_city : "Srinagar Jammu",
	  })	         
	  .toss();    
     
});