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
        this.addChild(new game.HUD.PauseButton(290, 15));
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
        this.font.draw(context, 'MENU', this.pos.x, this.pos.y);
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


