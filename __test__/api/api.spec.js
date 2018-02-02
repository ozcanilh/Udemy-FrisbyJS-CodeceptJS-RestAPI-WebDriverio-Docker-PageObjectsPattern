const frisby = require('frisby');
const Joi = frisby.Joi;

var alpha3_code_IND;
var COUNTRY_URL = "http://services.groupkt.com/country/get/all";
var COUNTRY_URL_USA = "http://services.groupkt.com/state/get/USA/all";
jest.setTimeout(10000);

// Test1a Check Http status: 200,Rest Response,application/json
	it('Check Http status: 200,Rest Response,application/json', function(done) {
		frisby.get(COUNTRY_URL).expect('status', 200).expect('header',
				'Content-Type', 'application/json;charset=utf-8').expect(
				'jsonTypes', {
					RestResponse : Joi.object(),
				})
				.done(done);
	});

// Test1b result: Array Length:249
	it('Check ArrrayLength: 249', function(done) {
		frisby.get(COUNTRY_URL).then(function(res) {
			expect(res.json.RestResponse.result).toHaveLength(249);
		})
		.done(done);
	});

// Test1c result: name:Turkey, alpha2_code:TR, alpha3_code:TUR
	it('Check ArrrayLength: 249', function(done) {
		frisby.get(COUNTRY_URL).expect('json', 'RestResponse.result.227', {
			name : "Turkey",
			alpha2_code : "TR",
			alpha3_code : "TUR"
		})
		.done(done);
	});

// Test1d result: result.name Sorting

// Test2a result: USA result key array
	it('USA result key array', function(done) {
		frisby.get(COUNTRY_URL_USA).expect('jsonTypes', 'RestResponse', {
			result : Joi.array(),
		})
		.done(done);
	});

// Test2b result: id type is Number, country type is String
	it('id type is Number, country type is String', function(done) {
		frisby.get(COUNTRY_URL_USA).expect('jsonTypes', 'RestResponse.result.1', {
			country : Joi.string(),
			id : Joi.number()
		})
		.done(done);
	});

// Test2b result: "name", "abbr", "area", "largest_city" ve "capital"
	const expectedObjectValue = {
		name : "Alaska",
		abbr : "AK",
		area : "1723337SKM",
		largest_city : "Anchorage",
		capital : "Juneau"
	};
	it('Check Elements', function(done) {
		frisby.get(COUNTRY_URL_USA).then(
				function(res) {
					// expect(res.json.RestResponse.result[1]).toEqual(expect.objectContaining(expectedObjectValue)) or
					expect(res.json.RestResponse.result[1]).toMatchObject(
							expectedObjectValue);
				})
				.done(done);
	});

// Test3a result: Get alpha3_code to India
	it('Get alpha3_code to India', function(done) {
		frisby.get(COUNTRY_URL).then(function(res) {
			alpha3_code_IND = res.json.RestResponse.result[102].alpha3_code;
			console.log("India alpha3 code is: " + alpha3_code_IND);
		}).done(done);
	});
// Test3b result: Check India largest_city of id:65
	it('Check India largest_city of id:65', function(done) {
		frisby
				.get("http://services.groupkt.com/state/get/" + alpha3_code_IND+ "/all")
				.expect('json', 'RestResponse.result.0', {
					largest_city : "Srinagar Jammu"
				})
				.done(done);
	});
