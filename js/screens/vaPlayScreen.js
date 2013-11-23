// create a custom loading screen
game.VAPlayScreen = me.ScreenObject.extend(
{
   // constructor
   init: function()
   {

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

   // will be fired by the loader each time a resource is loaded
   onProgressUpdate: function(progress)
   {
      this.loadPercent = progress;
      this.invalidate = true;
   },

   // make sure the screen is only refreshed on load progress
   update: function()
   {
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
   onDestroyEvent : function ()
   {
      console.log('VAPlayScreen:: onDestroyEvent(), cancelling logo');
      // "nullify" all fonts
      this.logo = null;
   },

   // draw function
   draw : function(context)
   {
      console.log('VAPLayScreen:: draw()');

      console.log('  clearing surface, to black');
      me.video.clearSurface (context, "black");

      console.log('  measuring logo');
      logo_width = this.logo.measureText(context,"V&A Game Jam").width;

      console.log('  drawing logo');
      this.logo.draw(context,
                     "awesome loading screen",
                     ((me.video.getWidth() - logo_width) / 2),
                     (me.video.getHeight() + 60) / 2);

      // display a progressive loading bar
      console.log('   drawing progress par');
      var width = Math.floor(this.loadPercent * me.video.getWidth());

      // draw the progress bar
      context.strokeStyle = "silver";
      context.strokeRect(0, (me.video.getHeight() / 2) + 40, me.video.getWidth(), 6);
      context.fillStyle = "#89b002";
      context.fillRect(2, (me.video.getHeight() / 2) + 42, width-4, 2);
   },
});
