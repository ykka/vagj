game.WinningScreen = me.ScreenObject.extend({
    // constructor
    init: function() {
        this.parent(true);
    },

    onResetEvent: function() {

        console.log('WIN');
        me.audio.pauseTrack();
        // add our HUD to the game world
        this.WinningHUD = new game.HUD.WinningContainer();
        me.game.world.addChild(this.WinningHUD);
    },

    onDestroyEvent: function() {
        me.audio.resumeTrack("va_gamejam");
        me.game.world.removeChild(this.WinningHUD);
    },

    draw: function(context) {}
});
