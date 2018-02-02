Feature('Project1');

//Enums
var colorList = {
		Gri: 			"Gri",
		  Beyaz: 		"Beyaz",
		  Bordo: 		"Bordo",
		};
var securityList = {
		  ABS: 			"ABS",
		  Airbag: 		"Airbag",
		  Alarm: 		"Alarm",
		  CBS: 			"CBS",
		  SirtDesteği:	"Sırt Desteği",
		  CekisKontrolu:"Çekiş Kontrolü",	  
		};
var categoryList = {
		  Emlak: 		"Emlak",
		  Vasita: 		"Vasıta",
		  YedekParca: 	"Yedek Parça",
		};
var vehicleList = {
		  Otomobil: 	"Otomobil",
		  Motosiklet: 	"Motosiklet",
		};

Before((I) => { 
	I.amOnPage('/');
});

Scenario('Test1', (I, pageObjectPage) => {
	pageObjectPage.checkElementsVisible();
	pageObjectPage.checkLinkofPosts();	
});

Scenario('Test2', (I, pageObjectPage) => {	
	pageObjectPage.clickDetailSearchLink();
	pageObjectPage.selectProductInList(categoryList.Vasita, pageObjectPage.wrapper.secondCategoryWrapper);
	pageObjectPage.selectProductInList(vehicleList.Motosiklet, pageObjectPage.wrapper.thirdCategoryWrapper);
	
	I.executeScript(function() {
		 $("li:nth-of-type(158) > span").click()	 
	});
	I.waitForElement(pageObjectPage.wrapper.fourthCategoryWrapper);	
	I.executeScript(function() {
		 $("li:nth-of-type(52) > span").click()	 
	});
	
	pageObjectPage.typeMinMaxYears("1998","1999");
	pageObjectPage.selectColor(colorList.Gri);
	pageObjectPage.selectSecurity(securityList.CekisKontrolu);
	pageObjectPage.clickSearchButton();
	pageObjectPage.compareFilterResult();
   
});

//DataDriven
 let products = new DataTable(['productName','productExpectedCount']);
 products.add(['Yamaha MT07','37']);
 products.add(['Yamaha MT09','17']);
 products.add(['Yamaha MT25','57']);

 Data(products).Scenario('Test3', (I,pageObjectPage,current) => {
	
	pageObjectPage.clickSearchTextArea();
	I.fillField(pageObjectPage.textArea.searchArea, current.productName);
	pageObjectPage.clickSearchIcon();
	I.waitForElement('//li[1]/div/a/strong/span');
	
	let co = require('co');
	let productActualCount;
	co.wrap(function*() {
		productActualCount = yield I.grabTextFrom('//li[1]/div/a/strong/span');
		pageObjectPage.compareCountOfResult(current.productName,current.productExpectedCount,productActualCount);
 	})();
	
});






