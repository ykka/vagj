game.PlayScreen = me.ScreenObject.extend(
{
   // constructor
   init: function() {
      console.log('VAPLayScreen:: init() called.');

      // pass true to the parent constructor
      // as we draw our progress bar in the draw function
      this.parent(true);

      // a font logo
      this.logo = new me.Font('century gothic', 32, 'white');
      // flag to know if we need to refresh the display
      this.invalidate = false;
      // load progress in percent
      this.loadPercent = 0;
      // setup a callback
      me.loader.onProgress = this.onProgressUpdate.bind(this);
   },

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

   // will be fired by the loader each time a resource is loaded
   onProgressUpdate: function(progress) {
      this.loadPercent = progress;
      this.invalidate = true;
   },

   // make sure the screen is only refreshed on load progress
   update: function() {
      if (this.invalidate=== true)
      {
         // clear the flag
         this.invalidate = false;
         // and return true
         return true;
      }
      // else return false
      return false;
   },

   // on destroy event
   onDestroyEvent : function () {
      console.log('VAPlayScreen:: onDestroyEvent(), cancelling logo');
      // "nullify" all fonts
      this.logo = null;

      me.game.world.removeChild(me.game.world.getEntityByProp("name", "HUD")[0]);
   },

   draw : function(context) {
      me.video.clearSurface (context, "black");
      var logo_width = this.logo.measureText(context,"V&A Game Jam").width;
      this.logo.draw(context,
                     "awesome loading screen",
                     ((me.video.getWidth() - logo_width) / 2),
                     (me.video.getHeight() + 60) / 2);

      var width = Math.floor(this.loadPercent * me.video.getWidth());

      // draw the progress bar
      context.strokeStyle = "silver";
      context.strokeRect(0, (me.video.getHeight() / 2) + 40, me.video.getWidth(), 6);
      context.fillStyle = "#89b002";
      context.fillRect(2, (me.video.getHeight() / 2) + 42, width-4, 2);
   }
});
