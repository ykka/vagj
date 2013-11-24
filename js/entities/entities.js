/*-------------------
a player entity
-------------------------------- */
game.PlayerEntity = me.ObjectEntity.extend({
    /* constructor */
    init: function(x, y, settings) {
        console.log('playerEntity::init()')
        // call the constructor
        this.parent(x, y, settings);
        this.gravity = 0;

        // set the default horizontal & vertical speed (accel vector)
        this.setVelocity(3, 3);

        // set the display to follow our position on both axis
        me.game.viewport.follow(this.pos, me.game.viewport.AXIS.BOTH);

    },

    update: function() {

        if (me.input.isKeyPressed('left')) {
            // flip the sprite on horizontal axis
            this.flipX(true);
            // update the entity velocity
            this.vel.x -= this.accel.x * me.timer.tick;
        } else if (me.input.isKeyPressed('right')) {
            // unflip the sprite
            this.flipX(false);
            // update the entity velocity
            this.vel.x += this.accel.x * me.timer.tick;
        } else {
            this.vel.x = 0;
        }
        if (me.input.isKeyPressed('down')) {
            // flip the sprite on horizontal axis
            this.flipY(true);
            // update the entity velocity
            this.vel.y += this.accel.y * me.timer.tick;
        } else if (me.input.isKeyPressed('up')) {
            // unflip the sprite
            this.flipY(false);
            // update the entity velocity
            this.vel.y -= this.accel.y * me.timer.tick;
        } else {
            this.vel.y = 0;
        }

        // check & update player movement
        this.updateMovement();

        // update animation if necessary
        if (this.vel.x!=0 || this.vel.y!=0) {
            // update object animation
            this.parent();
            return true;
        }
        // else inform the engine we did not perform
        // any update (e.g. position, animation)
        return false;
    }

});
