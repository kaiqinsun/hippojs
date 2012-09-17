module('core.js');

test('invoke hippo() with no parameter',function(){
	equal(hippo.type(hippo()),'object','hippo() returns an object');
	equal(hippo()[0].tagName.toLowerCase(),'html','defaults to HTML element');
});

test('invoke hippo(\'li\') with selector string',function(){
	var hippoLi = hippo('li');
	ok(hippoLi, 'No problem passing a string selector');
	equal(hippoLi[0].nodeType,1,'Its an ELEMENT_NODE');
});

test('invoke hippo(\'li\',\'#qunit-fixture\') with selector string & string selector context',function(){
	var hippoLi = hippo('li','#qunit-fixture');
	ok(hippoLi, 'No problem passing a string selector & string selector context');
	equal(hippoLi[0].nodeType,1,'Its an ELEMENT_NODE');
});

test('invoke hippo(\'<ul><li></li></ul>\') with HTML string',function(){
	var hippoLi = hippo('<ul><li></li></ul>');
	ok(hippoLi, 'No problem passing html string selector ');
	equal(hippoLi[0].nodeType,1,'Its an ELEMENT_NODE');
});