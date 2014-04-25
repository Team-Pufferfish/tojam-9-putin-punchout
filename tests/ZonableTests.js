/**
 * Created by myabko on 2014-04-25.
 */

module("Zoneable Tests");
test("should throw error when trying to set a zone that is too high or too low",function(){

    var entity = Crafty.e("Zonable");

    throws(function(){
        entity.setZone("ID",120);
    },"cannot set zone");

    throws(function(){
        entity.setZone("ID",-120);
    },"cannot set zone");
});

test("should set zone properly with appropriately valued zone",function(){
   var entity = Crafty.e("Zonable");

    entity.setZone("ID",50);

    equal(entity.getZone("ID"),50);

});

asyncTest("should trigger an event on zone change",function(){
    var entity = Crafty.e("Zonable");

    expect(2);

    entity.bind("newID.zoneChange",function(e){
        equal(e.oldZone,0);
        equal(e.newZone,100);
        start();
    });

    entity.setZone("newID",100);

});

