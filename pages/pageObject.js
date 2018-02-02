'use strict';
let I;
let assert = require('assert');

module.exports = {

  _init() {
    // I = require('../steps_file.js')();
	  I = actor(); 	  
  },
  
// locators
  logo: {
    sahibindenLogo: 	'.logo',    
  },
  textArea: {
	searchArea:			'#searchText',  
	minYear:			"input[placeholder='Min Yıl']",
	maxYear:			"input[placeholder='Max Yıl']",	
  },
  dropDown: {
	color:				'//tr[11]/td[2]/dl/dd/div/div/span',  	
	  },
  link: {
	detailSearchLink:	'#searchSuggestionForm>a', 
	loginLink:			'.login-text>a',
	registrationLink:	'.register-text>a',
	vehicle:			"a[href='/kategori/vasita']",
	motorcycle:			"a[href='/kategori/motosiklet']",
	auto:				"a[href='/kategori/otomobil']",
	suv:				"a[href='/kategori/arazi-suv-pick-up']",	
  },
  button: {
	freePostAd:			'#post-new-classified', 
	searchButton:		"button[value='Arama Yap']",
	result50Button:     '.paging-size.Limit50Passive',
  },
  icon: {
	searchIcon:			'#searchSuggestionForm>button',
	  },  
  text: {
	showcase:			'.uiBox.showcase>h3',  
	countArea:			"//*[@class='js-category-tree']/ul/li/ul/li/a/span",
  },
  list: {
	vitrinList: 		'ul.vitrin-list>li:nth-of-type(@value)',  
	secondCategoryList:	'div.category-selection-wrapper>div:nth-child(2)',
	thirdCategoryList:	'div.category-selection-wrapper>div:nth-child(3)',
	fourthCategoryList:	'div.category-selection-wrapper>div:nth-child(4)',
  },
  content: {
	detailSearchContent: '.detailedSearchPageWrapper', 
  },
  select: {
	 categoryVehicle:     'div.jspPane>ul>li:nth-of-type(3)',  
	 categoryMotor: 	  'div.jspPane>ul>li:nth-of-type(4)',
	 motorBrand: 		  'div.jspPane>ul>li:nth-of-type(158)',
	 motorName: 		  'div.jspPane>ul>li:nth-of-type(52)',
  },
  loading: {
	 opening:			 'div.opening',  
  },
  container:{
	 listColor:			 '.jspContainer',  
  },
  wrapper:{
	 secondCategoryWrapper: 'div.category-selection-wrapper>div:nth-child(2)',
	 thirdCategoryWrapper:  'div.category-selection-wrapper>div:nth-child(3)',
	 fourthCategoryWrapper: 'div.category-selection-wrapper>div:nth-child(4)',
  },
  
  
  // methods - Scenario 1
 checkElementsVisible(){	
	 var myStringArray = [this.logo.sahibindenLogo,this.textArea.searchArea,this.link.detailSearchLink,this.link.loginLink,
	 this.link.registrationLink,this.button.freePostAd,this.text.showcase,this.link.vehicle,this.link.motorcycle,this.link.auto,this.link.suv]   
	 var arrayLength = myStringArray.length;  
	 
	 for (var i = 0; i < arrayLength; i++) {
		 I.waitForElement(myStringArray[i],10);
		 I.seeElement(myStringArray[i]);
	   }	  
	 },
	   
 checkLinkofPosts(){
     var path = this.list.vitrinList;	  
		
	 for (var i = 1; i < 57; i++) {
	 	 var newPath=path.replace("@value",i);
	     console.log(newPath);
	     I.waitForElement(newPath,10)
	     I.seeElement(newPath);
	 }	  	   		 
   },
  
// methods - Scenario 2 
 clickDetailSearchLink(){
	  I.click(this.link.detailSearchLink);
	  I.waitForElement(this.content.detailSearchContent);	  
	  I.amOnPage('arama/detayli');
  },
   
 selectProductInList(productName,categoryWrapper){
	  I.click('//span[contains(text(), "'+productName+'")]'); 
	  I.waitForInvisible(this.loading.opening);
	  I.waitForElement(categoryWrapper);	
  },
  
 typeMinMaxYears(minYear,maxYear){
	  I.waitForInvisible(this.loading.opening);
	  I.fillField(this.textArea.minYear,minYear);
	  I.fillField(this.textArea.maxYear,maxYear);
  },
  
 selectColor(color){	
	  I.executeScript(function() {
			 $("tr:nth-child(11) > td:nth-child(2) > dl:nth-child(1) > dd:nth-child(1) > div > div > span").click()	 
		});
	  I.waitForElement(this.container.listColor);
	  I.click("//label[contains(text(),'"+color+"')]");
	  I.click(".first.selected");
  },
  
 selectSecurity(securityName){
	  I.scrollPageToBottom();
	  I.click("//label[contains(text(),'"+securityName+"')]"); 
  },
  
 clickSearchButton(){
	  I.click(this.button.searchButton);  
  },
  
 compareFilterResult(){
	  var expectedResult = "Arama filtrelerinize uygun ilan bulunamadı.";
	  var actualResultTrim; 
				 
	  let co = require('co');
	  var actualResult;
	  var actualResultTrim;
		 co.wrap(function*() {
		     actualResult = yield I.grabTextFrom('#saveSearchResult');
		     actualResultTrim = actualResult.trim();
		     assert.equal(actualResultTrim,expectedResult);
		     
//	     if(actualResultTrim == expectedResult){
//		        console.log(expectedResult + "expected Warning is displayed");      
//		    }
//		 else {
//		        console.log("Expected warning is not displayed");	       
//		       }		
		 })();  
  },

//methods - Scenario 3  
 clickSearchTextArea(){
	  I.waitForElement(this.textArea.searchArea);
	  I.click(this.textArea.searchArea); 
  },
  
  clickSearchIcon(){
	  I.click(this.icon.searchIcon); 
  },
 
 compareCountOfResult(productName,productExpectedCount,productActualCount){
	  console.log("Expected Count of "+productName+" is : "+productExpectedCount);  
	  console.log("Actual Count of "+productName+" is : "+ productActualCount);  
	  var a = parseInt(productExpectedCount);
	  var b = parseInt(productActualCount);
	  
	  if (a == b) {
		  console.log("Expected and Actual Counts are same: Actual counts "+productActualCount+" .Expected Count is "+productExpectedCount+" for " +productName);  
		} else {
		  console.log("Expected and Actual Counts are not same: Actual counts "+productActualCount+" .Expected Count is "+productExpectedCount+" for " +productName);  
		}  
  }
  
}