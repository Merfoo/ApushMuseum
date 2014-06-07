Player = function()
{
    this.body = null;
    this.forward = null;
    this.vel = { x: 0, y: 0, z: 0 };
    
    this.getVelocity = function()
    {
        var headPos = this.forward.getAbsolutePosition();
        return { x: headPos.x - this.body.position.x, y: headPos.y - this.body.position.y, z: headPos.z - this.body.position.z };
    };
    
    this.updateVelocity = function()
    {
        var newVel = this.getVelocity();
        this.vel.x = newVel.x;
        this.vel.y = newVel.y;
        this.vel.z = newVel.z;
    };
};

var _scene = { width: 0, height: 0 };
var _viewAngle = { horzMax: 80, horzSum: 0, horzInc: 2, horz: 0, vert: 0, vertMin: -80, vertMax: 80 };
var _models = { total: 0, loaded: 0 };
var _screen = { width: 0, height: 0 };
var _player = new Player();
var _keys = { forward: false, backward: false };
var _infos = {};
var _dom = {
    hideInfo: null
};
var _anims = {
    rightToCenter: "animRightToCenter",
    centerToRight: "animCenterToRight",
    fadeIn: "animFadeIn",
    fadeOut: "animFadeOut"
};
var _keyCodes = { 
    space: 32, 
    a: 65, 
    w: 87,
    s: 83,
    d: 68, 
    enter: 13, 
    esc: 27
};
var _modelNames = {
    showing: null,
    littleBoy: "littleBoy"
};