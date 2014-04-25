/**
 * Created by myabko on 2014-04-25.
 */


var attribute = Crafty.e("Attributes");

var firstID = "One";
var secondID = "Two";

module("Attribute Tests");

asyncTest("should trigger an event when an attribute is first created",function(){

    expect(2);

    attribute.bind(firstID + ".attribute.created",function(e){
        equal(e.name,"attr");
        equal(e.value,1);
        start();

    });

    attribute.assignAttribute(firstID,"attr",1);
});

asyncTest("should trigger an event when an attribute is changed",function(){

    expect(3);

    var elem = Crafty.e("Attributes");

    elem.bind("ID3.attribute.changed",function(e){
        console.log("This is run");
        equal(e.name,"attr");
        equal(e.oldValue,1);
        equal(e.newValue,2);
        start();
    });

    elem.assignAttribute("ID3","attr",1);
    elem.assignAttribute("ID3","attr",2);
});

test("should assign a value to attribute",function(){
   attribute.assignAttribute(firstID,"attr",1);
   equal(attribute.getAttribute(firstID,"attr"),1);

});

test("should throw error when you try to retrieve a value with an improper ID",function(){
    throws(function(){
        attribute.assignAttribute(firstID,"attr",1);
        attribute.getAttribute(secondID,"attr");
    },"attribute does not exist");
});




