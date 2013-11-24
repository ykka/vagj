game.TitleScreen = me.ScreenObject.extend({
    // constructor
    init: function() {
        this.parent(true);

        this.title = null;
        this.font = null;
    },

    // reset function
    onResetEvent: function() {

        if (this.title === null) {
            this.title = me.loader.getImage("title_image");
        }

        if (this.font === null) {
            this.font = new me.BitmapFont("32x32_font", 32);
        }

        me.input.bindKey(me.input.KEY.ENTER, "enter", true);
        me.input.bindTouch(me.input.KEY.ENTER);

        // play something
        // me.audio.play("cling");

    },

    update: function() {
        // Check what triggers
        if (me.input.isKeyPressed('enter')) {
            me.state.change(me.state.PLAY);
        }
        return true;
    },

    draw: function(context) {
        context.drawImage(this.title, 0, 0);
        this.font.draw(context, "PRESS ENTER TO PLAY", 50, 300);
    },

    onDestroyEvent: function() {
        me.input.unbindKey(me.input.KEY.ENTER);
        me.input.unbindTouch(me.input.KEY.ENTER);
    }

});
