/**
 * Created by myabko on 2014-04-25.
 */



module("Attribute Tests");

asyncTest("should trigger an event when an attribute is first created",function(){

    expect(2);


    var attribute = Crafty.e("Attributes");

    var firstID = "One";

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


asyncTest("should trigger an event when an auto incrementor is set",function(){


    expect(6);

    Crafty.init(480,320);
    var elem = Crafty.e("Attributes");

    var hasLooped = false;

    elem.bind("AUT.attribute.changed",function(e){
        if (!hasLooped){
            equal(e.name,"attr");
            equal(e.oldValue,1);
            equal(e.newValue,2);
            hasLooped = true;
        } else {
            equal(e.name,"attr");
            equal(e.oldValue,2);
            equal(e.newValue,3);
            start();
        }


    });

    elem.runAutoIncrementorLoop(1000);

    elem.assignAttribute("AUT","attr",1);
    elem.createAttributeAutoIncrementor("AUT","attr",1);


});


test("should assign a value to attribute",function(){

    var attribute = Crafty.e("Attributes");

    var firstID = "One";

    attribute.assignAttribute(firstID,"attr",1);
   equal(attribute.getAttribute(firstID,"attr"),1);

});

test("should throw error when you try to retrieve a value with an improper ID",function(){
    throws(function(){

        var attribute = Crafty.e("Attributes");

        var firstID = "One";
        var secondID = "Two";

        attribute.assignAttribute(firstID,"attr",1);
        attribute.getAttribute(secondID,"attr");
    },"attribute does not exist: Two.attr");
});




