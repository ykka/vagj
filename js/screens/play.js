game.PlayScreen = me.ScreenObject.extend({
    /**
     *  action to perform on state change
     */
    onResetEvent: function() {
        console.log('Reset Event Called');

        console.log('Loading TestMap');
        // load a level
        me.levelDirector.loadLevel("testMap");


        console.log('Resetting both score and level, both to 0!');
        // reset the score
        game.data.score = 0;
        game.data.level = 0;

        console.log('Adding HUD inside playscreen');
        // add our HUD to the game world
        this.HUD = new game.HUD.Container();
        me.game.world.addChild(this.HUD);
    },


    /**
     *  action to perform when leaving this screen (state change)
     */
    onDestroyEvent: function() {
        // remove the HUD from the game world
        me.game.world.removeChild(this.HUD);
    }
});
