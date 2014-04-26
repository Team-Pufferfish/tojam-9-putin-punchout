/**
 * Created by myabko on 2014-04-25.
 */
module("Punch Tests");
asyncTest("when a punch goes in the wrong direction it should miss",function(){
    expect(2);
    
    var attacker = Crafty.e("Punch")
        .setPunchAnimation(false)
        .setCallbacks();
    
    var defender = Crafty.e("Zonable");


    attacker.bind("punch.end",function(e){
        equal(e.damage,0);
        equal(e.result, attacker.PUNCH_MISS);
        start();

    });
    
    defender.setZone("dID",-100);
    
    attacker.ThrowPunch("pID","dID",attacker.HOOK,attacker.LEFT_PUNCH,0,100);
});

asyncTest("when a punch goes in the right direction it should hit",function(){
    expect(2);

    var attacker = Crafty.e("Punch")
        .setPunchAnimation(false)
        .setCallbacks();
    var defender = Crafty.e("Zonable");

    attacker.bind("punch.end",function(e){
        equal(e.damage,100);
        equal(e.result, attacker.PUNCH_HIT);
        start();

    });

    defender.setZone("dID",100);

    attacker.ThrowPunch("pID","dID",attacker.HOOK,attacker.LEFT_PUNCH,0,100);
});

asyncTest("when a punch goes in the right direction but is a near hit it should do limited damage",function(){
    expect(2);

    var attacker = Crafty.e("Punch")
        .setPunchAnimation(false)
        .setCallbacks();

    var defender = Crafty.e("Zonable");

    attacker.bind("punch.end",function(e){
        equal(e.damage,25);
        equal(e.result, attacker.PUNCH_HIT);
        start();

    });

    defender.setZone("dID",100);

    attacker.ThrowPunch("pID","dID",attacker.STRAIGHT,attacker.LEFT_PUNCH,0,100);
});

