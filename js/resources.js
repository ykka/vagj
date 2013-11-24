game.resources = [

    /**
     * Graphics.
     */
    // our level tileset
    {name: "map_sprite",  type:"image", src: "data/img/map/map_sprite.png"},
    {name: "metatiles32x32",  type:"image", src: "data/img/map/metatiles32x32.png"},
    {name: "artefacts_sprite",  type:"image", src: "data/img/map/artefacts_sprite.png"},
    {name: "hughs_items",  type:"image", src: "data/img/map/hughs_items.png"},


    /** Items **/
    {name: "Axe", type:"image", src: "data/img/items/Axe.png"},
{name: "Casket 2", type:"image", src: "data/img/items/Casket 2.png"},
{name: "Casket", type:"image", src: "data/img/items/Casket.png"},
{name: "Key", type:"image", src: "data/img/items/Key.png"},
{name: "Pickaxe", type:"image", src: "data/img/items/Pickaxe.png"},
{name: "Robber", type:"image", src: "data/img/items/Robber.png"},
{name: "Shovel", type:"image", src: "data/img/items/Shovel.png"},
{name: "Sword", type:"image", src: "data/img/items/Sword.png"},
{name: "Vase 2", type:"image", src: "data/img/items/Vase 2.png"},
{name: "Vase 3", type:"image", src: "data/img/items/Vase 3.png"},
{name: "Vase 4", type:"image", src: "data/img/items/Vase 4.png"},
{name: "Vase copy", type:"image", src: "data/img/items/Vase copy.PNG"},
{name: "Zeus-Sabazios", type:"image", src: "data/img/items/Zeus-Sabazios.png"},
{name: "armour-1", type:"image", src: "data/img/items/armour-1.png"},
{name: "book1", type:"image", src: "data/img/items/book1.png"},
{name: "book2", type:"image", src: "data/img/items/book2.png"},
{name: "castle", type:"image", src: "data/img/items/castle.png"},
{name: "codex", type:"image", src: "data/img/items/codex.png"},
{name: "crown1", type:"image", src: "data/img/items/crown1.png"},
{name: "crown2", type:"image", src: "data/img/items/crown2.png"},
{name: "crown3", type:"image", src: "data/img/items/crown3.png"},
{name: "dagger1", type:"image", src: "data/img/items/dagger1.png"},
{name: "grass001", type:"image", src: "data/img/items/grass001.png"},
{name: "helmet1", type:"image", src: "data/img/items/helmet1.png"},
{name: "helmet2", type:"image", src: "data/img/items/helmet2.png"},
{name: "helmet3", type:"image", src: "data/img/items/helmet3.png"},
{name: "house2", type:"image", src: "data/img/items/house2.png"},
{name: "instrument1", type:"image", src: "data/img/items/instrument1.png"},
{name: "instrument2", type:"image", src: "data/img/items/instrument2.png"},
{name: "instrument3", type:"image", src: "data/img/items/instrument3.png"},
{name: "key1", type:"image", src: "data/img/items/key1.png"},
{name: "key2", type:"image", src: "data/img/items/key2.png"},
{name: "mace", type:"image", src: "data/img/items/mace.png"},
{name: "medievelthing", type:"image", src: "data/img/items/medievelthing.png"},
{name: "path_bottom", type:"image", src: "data/img/items/path_bottom.png"},
{name: "path_bottom_left", type:"image", src: "data/img/items/path_bottom_left.png"},
{name: "path_bottom_left_corner", type:"image", src: "data/img/items/path_bottom_left_corner.png"},
{name: "path_bottom_right", type:"image", src: "data/img/items/path_bottom_right.png"},
{name: "path_bottom_right_corner", type:"image", src: "data/img/items/path_bottom_right_corner.png"},
{name: "path_left", type:"image", src: "data/img/items/path_left.png"},
{name: "path_middle", type:"image", src: "data/img/items/path_middle.png"},
{name: "path_middle_alt1", type:"image", src: "data/img/items/path_middle_alt1.png"},
{name: "path_middle_alt2", type:"image", src: "data/img/items/path_middle_alt2.png"},
{name: "path_right", type:"image", src: "data/img/items/path_right.png"},
{name: "path_top", type:"image", src: "data/img/items/path_top.png"},
{name: "path_top_left", type:"image", src: "data/img/items/path_top_left.png"},
{name: "path_top_left_corner", type:"image", src: "data/img/items/path_top_left_corner.png"},
{name: "path_top_right", type:"image", src: "data/img/items/path_top_right.png"},
{name: "path_top_right_corner", type:"image", src: "data/img/items/path_top_right_corner.png"},
{name: "shield1", type:"image", src: "data/img/items/shield1.png"},
{name: "stone1", type:"image", src: "data/img/items/stone1.png"},
{name: "stone_bottom1", type:"image", src: "data/img/items/stone_bottom1.png"},
{name: "stone_bottom2", type:"image", src: "data/img/items/stone_bottom2.png"},
{name: "stone_bottom_left_corner", type:"image", src: "data/img/items/stone_bottom_left_corner.png"},
{name: "stone_side1", type:"image", src: "data/img/items/stone_side1.png"},
{name: "stone_top_right_corner", type:"image", src: "data/img/items/stone_top_right_corner.png"},
{name: "sword1", type:"image", src: "data/img/items/sword1.png"},
{name: "tree001", type:"image", src: "data/img/items/tree001.png"},

{name: "compass_s", type:"image", src: "data/img/items/compass_s.png"},
{name: "compass_n", type:"image", src: "data/img/items/compass_n.png"},
{name: "compass_e", type:"image", src: "data/img/items/compass_e.png"},
{name: "compass_w", type:"image", src: "data/img/items/compass_w.png"},



    /*
     * Maps.
     */
    {name: "testMap", type: "tmx", src: "data/map/map1.tmx"},

    /* Graphics.
     * @example
     * {name: "example", type:"image", src: "data/img/example.png"},
     */
    {name: "title_image", type:"image", src: "data/img/gui/title_screen.png"},
    {name: "32x32_font", type:"image", src: "data/img/font/32x32_font.png"},

    // the main player spriteshee TEST!!!!!!!!
    {name: "gripe_run_right", type:"image", src: "data/img/sprite/gripe_run_right.png"},
    {name: "walking_robber", type:"image", src: "data/img/sprite/walking_robber.png"},
    // {name: "Archeologist", type:"image", src: "data/img/sprite/archeologist2.png"},
    {name: "walking_archeologist", type:"image", src: "data/img/sprite/walking_archeologist.png"},
    {name: "walking_zombie", type:"image", src: "data/img/sprite/walking_zombie.png"},
    {name: "rising_zombie", type:"image", src: "data/img/sprite/rising_zombie.png"},
    {name: "spinning_coin_gold", type:"image", src: "data/img/sprite/spinning_coin_gold.png"},

     /* @example
     * {name: "example_tps", type: "tps", src: "data/img/example_tps.json"},
     */

    /* Background music.
     * @example
     * {name: "example_bgm", type: "audio", src: "data/bgm/", channel : 1},
     */
    {name: "Va_gamejam", type: "audio", src: "data/bgm/", channel : 1},

    /* Sound effects.
     * @example
     * {name: "example_sfx", type: "audio", src: "data/sfx/", channel : 2}
     */
];
