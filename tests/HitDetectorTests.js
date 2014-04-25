/**
 * Created by myabko on 2014-04-25.
 */


module("HitDetector Tests");

test("should be a complete miss when in different zones",function(){
    var entity = Crafty.e("HitDetector");
    equal(entity.detectHit(25,-100),0);
    equal(entity.detectHit(100,-100),0);
    equal( entity.detectHit(0,-100),0);
    equal( entity.detectHit(100,0),0)
});

test("should be a partial hit when in the same zone, but hit is off",function(){
    var entity = Crafty.e("HitDetector");

    equal(entity.detectHit(50,100),0.5);
    equal(entity.detectHit(25,100),0.25);
    equal(entity.detectHit(-25,-100), 0.25);
    equal(entity.detectHit(-50,-100),0.50);

});

test("should be a full hit when right in the same area",function(){
    var entity = Crafty.e("HitDetector");

    equal(entity.detectHit(100,100),1);
    equal(entity.detectHit(50,50),1);
    equal(entity.detectHit(0,0),1);
    equal(entity.detectHit(-50,-50),1);
    equal(entity.detectHit(-100,-100), 1);
});

asyncTest("should trigger an event when a hit is landed",function(){

    expect(1);

    var entity = Crafty.e("HitDetector");

    entity.bind("hit.landed",function(e){
        equal(e,1);
        start();

    });

    entity.detectHit(100,100);
});

asyncTest("should trigger an event when a hit is missed",function(){

    expect(1);

    var entity = Crafty.e("HitDetector");

    entity.bind("hit.missed",function(){
        ok(true);
        start();

    });

    entity.detectHit(100,-100);
});