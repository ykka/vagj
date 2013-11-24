game.PauseScreen = me.ScreenObject.extend({
    // constructor
    init: function() {
        this.parent(true);
    },

    onResetEvent: function() {

        console.log('Reset called');
        me.audio.pauseTrack();
        // add our HUD to the game world
        this.PauseHUD = new game.HUD.PauseContainer();
        me.game.world.addChild(this.PauseHUD);
    },

    onDestroyEvent: function() {
        me.audio.resumeTrack("va_gamejam");
        me.game.world.removeChild(this.PauseHUD);
    },

    draw: function(context) {}
});
