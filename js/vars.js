var _scene = null;
var _camera = null;
var _lastCam = { position: { x: 0, y: 0, z: 0 }, rotation: { x: 0, y: 0, z: 0 } };
var _loadingModels = { done: false, total: 0, loaded: 0, totalData: {}, loadedData: {} };
var _screen = { width: 0, height: 0 };
var _infos = {};
var _dom = { canvas: null, startMenu: null, hideInfo: null, crosshair: null, loadingMenu: null };
var _anims = {
    upToCenter: "animUpToCenter",
    centerToUp: "animCenterToUp",
    rightToCenter: "animRightToCenter",
    centerToRight: "animCenterToRight",
    leftToCenter: "animLeftToCenter",
    centerToLeft: "animCenterToLeft",
    fadeIn: "animFadeIn",
    fadeOut: "animFadeOut"
};
var _keyCodes = { 
    esc: 27,
    back: 8, 
    enter: 13,
    a: 65, 
    w: 87,
    s: 83,
    d: 68
};
var _modelNames = {
    showing: null,
    enolaGay: "enolaGay",
    museum: "museum",
    pedestal: "column",
    littleBoy: "littleBoy", 
    fatMan: "fatMan",
    battleOfMidway: "battleOfMidway",
    iwoJima: "iwoJima",
    leyte: "leyte",
    manhattan: "manhattan",
    okinawa: "okinawa",
    pearlHabor: "pearlHarbor",
    saipan: "saipan",
    battleOfMindoro: "battleOfMindoro",
    battleOfLuzon: "battleOfLuzon"
};