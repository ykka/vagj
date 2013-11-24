
/* Game namespace */
var game = {

    data : {
        score : 0,
        level : 0
    },

    "onload" : function () {
        if (!me.video.init("screen", 720, 576, true, 'auto')) {
            alert("Your browser does not support HTML5 canvas.");
            return;
        }

        if (document.location.hash === "#debug") {
            window.onReady(function () {
                me.plugin.register.defer(debugPanel, "debug");
            });
        }

        me.audio.init("mp3,ogg");
        me.loader.onload = this.loaded.bind(this);
        me.loader.preload(game.resources);

        me.state.change(me.state.LOADING);
    },

    "loaded" : function () {
        me.state.set(me.state.MENU, new game.TitleScreen());
        me.state.set(me.state.PLAY, new game.PlayScreen());
        me.state.transition("fade", "#271900", 250);

        // add our player entity in the entity pool
        me.entityPool.add("mainPlayer", game.PlayerEntity);
        // me.entityPool.add("CoinEntity", game.CoinEntity);
        // me.entityPool.add("EnemyEntity", game.EnemyEntity);

        // enable the keyboard
         me.input.bindKey(me.input.KEY.LEFT, "left");
         me.input.bindKey(me.input.KEY.RIGHT, "right");
         me.input.bindKey(me.input.KEY.UP, "up");
         me.input.bindKey(me.input.KEY.DOWN, "down");

        me.state.change(me.state.MENU);
    }
};

