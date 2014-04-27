/**
 * Created by myabko on 2014-04-27.
 */
Crafty.c("SoundEffects",{
    init: function(){
        Crafty.audio.add({
            softPunch: ["sounds/softPunch.wav"],
            hardPunch: ["sounds/hardPunch.wav"],
            punchSwoosh: ["sounds/punchSwoosh.wav"],
            dodgeSwoosh: ["sounds/dodgeSwoosh.wav"]
        });
    }
});