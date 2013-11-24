game.HUD = game.HUD || {};

// ,---.          |         o
// |    ,---.,---.|--- ,---..,---.,---.,---.,---.
// |    |   ||   ||    ,---|||   ||---'|    `---.
// `---'`---'`   '`---'`---^``   '`---'`    `---'

game.HUD.Container = me.ObjectContainer.extend({

    init: function() {
        this.parent();
        this.isPersistent = true;
        this.collidable = false;
        this.z = Infinity;
        this.name = "HUD";

        this.addChild(new game.HUD.TopBar(0,0));
        this.addChild(new game.HUD.BottomBar(0,0));
    }
});

game.HUD.PauseContainer = me.ObjectContainer.extend({

    init: function() {
        this.parent();
        this.isPersistent = true;
        this.collidable = false;
        this.z = Infinity;
        this.name = "PAUSEHUD";

        this.addChild(new game.HUD.Restarting(200, 200));
    }
});

game.HUD.WinningContainer = me.ObjectContainer.extend({

    init: function() {
        this.parent();
        this.isPersistent = true;
        this.collidable = false;
        this.z = Infinity;
        this.name = "WINNINGHUD";

        this.addChild(new game.HUD.Winning(300, 300));

    }
});

// Top Bar contains level and score
game.HUD.TopBar = me.ObjectContainer.extend({
   init: function() {
        this.parent();
        this.isPersistent = true;
        this.collidable = false;
        this.z = Infinity;
        this.name = "TOPBAR";

        this.addChild(new game.HUD.ScoreItem(710, 15));
        this.addChild(new game.HUD.LevelItem(10, 15));
        this.addChild(new game.HUD.PauseButton(250, 15));

        this.pauseButtonRectangle = new me.Rect(new me.Vector2d(290, 15), 150, 50);

        // register on the 'mousemove' event
        me.input.registerPointerEvent('click', this.pauseButtonRectangle, this.mouseMove.bind(this));
    },

    onDestroyEvent: function() {
        me.input.releasePointerEvent('click', this.pauseButtonRectangle, this.mouseMove.bind(this));
    },

    mouseMove: function() {
        me.state.change(me.state.PAUSE);

        setTimeout(function(){
            me.state.change(me.state.PLAY);
        }, 1500);

    }
});

// Bottom bar contains the traps/objects belt
game.HUD.BottomBar = me.ObjectContainer.extend({
   init: function() {
        this.parent();
        this.isPersistent = true;
        this.collidable = false;
        this.z = Infinity;
        this.name = "BOTTOMBAR";

        this.addChild(new game.HUD.Belt(10, 540));
    }
});


// ,---.|        o          |
// |   ||---.    .,---.,---.|--- ,---.
// |   ||   |    ||---'|    |    `---.
// `---'`---'    |`---'`---'`---'`---'
//           `---'


game.HUD.LevelItem = me.Renderable.extend({

    init: function(x, y) {
        this.parent(new me.Vector2d(x, y), 10, 10);
        this.font = new me.BitmapFont("32x32_font", 32);
        this.font.set("left");
        this.level = -1;
        this.floating = true;
    },

    update : function () {
        if (this.level !== game.data.level) {
            this.level = game.data.level;
            return true;
        }
        return false;
    },

    draw : function (context) {
        this.levelText = 'L:' + this.level;
        this.font.draw(context, this.levelText, this.pos.x, this.pos.y);
    }

});

game.HUD.ScoreItem = me.Renderable.extend({
    init: function(x, y) {

        this.parent(new me.Vector2d(x, y), 10, 10);
        this.anchorPoint = new me.Vector2d(1,1);
        this.font = new me.BitmapFont("32x32_font", 32);
        this.font.set("right");
        this.score = -1;
        this.floating = true;
    },

    update : function () {
        if (this.score !== game.data.score) {
            this.score = game.data.score;
            return true;
        }
        return false;
    },

    draw : function (context) {
        this.scoreText = '$' + this.score;
        this.font.draw(context, this.scoreText, this.pos.x, this.pos.y);
    }
});


game.HUD.PauseButton = me.Renderable.extend({
    init: function(x, y) {

        this.parent(new me.Vector2d(x, y), 10, 10);
        this.anchorPoint = new me.Vector2d(1,1);
        this.font = new me.BitmapFont("32x32_font", 32);
        this.font.set("left");
        this.floating = true;
    },

    update : function () {
        // if (this.score !== game.data.score) {
        //     this.score = game.data.score;
        //     return true;
        // }
        // return false;
    },

    draw : function (context) {
        this.font.draw(context, 'RESTART', this.pos.x, this.pos.y);
    }
});



game.HUD.Belt = me.Renderable.extend({
    init: function(x, y) {

        this.parent(new me.Vector2d(x, y), 10, 10);
        this.anchorPoint = new me.Vector2d(1,1);
        this.font = new me.BitmapFont("32x32_font", 32);
        this.font.set("left");
        this.floating = true;
    },

    update : function () {
        // if (this.score !== game.data.score) {
        //     this.score = game.data.score;
        //     return true;
        // }
        // return false;
    },

    draw : function (context) {
        this.font.draw(context, 'BELT', this.pos.x, this.pos.y);
    }
});


game.HUD.Restarting = me.Renderable.extend({
    init: function(x, y) {
        console.log('restarting called');

        this.parent(new me.Vector2d(x, y), 10, 10);
        this.anchorPoint = new me.Vector2d(1,1);
        this.font = new me.BitmapFont("32x32_font", 32);
        this.font.set("left");
        this.floating = true;
    },

    draw : function (context) {
        this.font.draw(context, 'RESTARTING', this.pos.x, this.pos.y);
    }
});


game.HUD.Winning = me.Renderable.extend({
    init: function(x, y) {

        this.parent(new me.Vector2d(x, y), 10, 10);
        this.anchorPoint = new me.Vector2d(1,1);
        this.font = new me.BitmapFont("32x32_font", 32);
        this.font.set("left");
        this.floating = true;
    },

    draw : function (context) {
        this.font.draw(context, 'YOU WIN', this.pos.x, this.pos.y);
    }
});



