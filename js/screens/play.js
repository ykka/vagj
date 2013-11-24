game.PlayScreen = me.ScreenObject.extend(
{
   // constructor
   init: function() {
      console.log('VAPLayScreen:: init() called.');
      this.parent(true);

      this.invalidate = false;
      this.loadPercent = 0;
      me.input.registerPointerEvent("mouseup", me.game.viewport, function(event) {
          console.log('TRUE EVENT');
            addItem(event.gameX -20, event.gameY-20);
            return false;
        });
        setTimeout(function(){
         game.data.isLive = true;   
        }, 1000);
      me.loader.onProgress = this.onProgressUpdate.bind(this);
   },

    onResetEvent: function() {
        me.levelDirector.loadLevel("testMap");
        game.data.score = 0;
        game.data.level = 0;

        // Disabling game music for development.
        // me.audio.playTrack("va_gamejam");

        // add our HUD to the game world
        this.HUD = new game.HUD.Container();
        me.game.world.addChild(this.HUD);
    },

   // will be fired by the loader each time a resource is loaded
   onProgressUpdate: function(progress) {
      console.log('On progress update');
      this.loadPercent = progress;
      this.invalidate = true;
   },

   // make sure the screen is only refreshed on load progress
   update: function() {
      if (this.invalidate=== true) {
         this.invalidate = false;
         return true;
      }
      return false;
   },

   // on destroy event
   onDestroyEvent : function () {
      me.game.world.removeChild(this.HUD);
   },

   draw : function(context) {
   }
});
