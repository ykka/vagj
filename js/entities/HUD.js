game.HUD = game.HUD || {};

game.HUD.Container = me.ObjectContainer.extend({

    init: function() {
        this.parent();
        this.isPersistent = true;
        this.collidable = false;
        this.z = Infinity;
        this.name = "HUD";

        this.addChild(new game.HUD.ScoreItem(5, 5));
        this.addChild(new game.HUD.LeveltItem(700,700));
    }
});

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
        this.font.draw(context, 'Level: ' + this.level, this.pos.x, this.pos.y);
    }

});


game.HUD.ScoreItem = me.Renderable.extend({

    init: function(x, y) {
        this.parent(new me.Vector2d(x, y), 10, 10);
        this.font = new me.BitmapFont("32x32_font", 32);
        this.font.set("right");
        this.score = -1;
        this.floating = true;
    },

    update : function () {
        // we don't do anything fancy here, so just
        // return true if the score has been updated
        if (this.score !== game.data.score) {
            this.score = game.data.score;
            return true;
        }
        return false;
    },

    draw : function (context) {
        this.font.draw(context, 'Score: ' + this.score, this.pos.x, this.pos.y);
    }

});
