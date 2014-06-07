document.documentElement.style.overflowX = "hidden";	 // Horz scrollbar will be hidden
document.documentElement.style.overflowY = "hidden";     // Vert scrollbar will be hidden

window.onload = function()
{
    initDom();

    // Check support
    if (!BABYLON.Engine.isSupported())
        window.alert('Browser not supported');

    else 
    {        
        // Babylon
        var engine = new BABYLON.Engine(_dom.canvas, true);
        
        // Set map size const
        _screen.width = window.innerWidth;
        _screen.height = window.innerHeight;
        
        // Creation of the scene 
        _scene = new BABYLON.Scene(engine);
        
        // Adding of the light on the scene
        var light0 = new BABYLON.HemisphericLight("Hemi0", new BABYLON.Vector3(0, 1, 0), _scene);
        light0.diffuse = new BABYLON.Color3(1, 1, 1);
        light0.specular = new BABYLON.Color3(1, 1, 1);
        light0.groundColor = new BABYLON.Color3(0, 0, 0);

        // Cameras
        _camera = new BABYLON.FreeCamera("FreeCamera", new BABYLON.Vector3(0, 0, 5), _scene);
        
        // Attach camera to canvas
        _scene.activeCamera.attachControl(_dom.canvas);

        // Load all the models
        _models.total++;
        BABYLON.SceneLoader.ImportMesh("", "scenes/littleBoy/", "littleBoy.babylon", _scene, function(newMeshes)
        {
            newMeshes[0].position = new BABYLON.Vector3(0, -30, 0);
            _infos[_modelNames.littleBoy = newMeshes[0].id] = document.getElementById("infoLittleBoy");
            _models.loaded++;
        });
        
        _models.total++;
        BABYLON.SceneLoader.ImportMesh("", "scenes/pedestal/", "column.babylon", _scene, function(newMeshes)
        {
            newMeshes[0].position = new BABYLON.Vector3(0, -310, 0);        
            _models.loaded++;
        });
        
        _models.total++;
        BABYLON.SceneLoader.ImportMesh("", "scenes/fatMan/", "fatMan.babylon", _scene, function(newMeshes)
        {
            newMeshes[0].position = new BABYLON.Vector3(0, -30, 100);
            _infos[_modelNames.fatMan = newMeshes[0].id] = document.getElementById("infoFatMan");
            _models.loaded++;
        });
        
        _models.total++;
        BABYLON.SceneLoader.ImportMesh("", "scenes/enolaGay/", "enolaGay.babylon", _scene, function(newMeshes)
        {
            newMeshes[0].position = new BABYLON.Vector3(0, -30, -500);
            _infos[_modelNames.enolaGay = newMeshes[0].id] = document.getElementById("infoEnolaGay");
            _models.loaded++;
        });
        
        _models.total++;
        BABYLON.SceneLoader.ImportMesh("", "scenes/museum/", "museum.babylon", _scene, function(newMeshes)
        {
            newMeshes[0].position = new BABYLON.Vector3(0, -30, 500);
            newMeshes[0].scaling = new BABYLON.Vector3(.5, .5, .5);
            _models.loaded++;
        });
        
        // Set up player
        _player.body = _camera;
        _player.forward = BABYLON.Mesh.CreateBox("playerForward", 3, _scene);
        _player.forward.parent = _player.body;
        _player.forward.position.z = 1;
        _player.forward.isVisible = false;
        _player.left = BABYLON.Mesh.CreateBox("playerLeft", 3, _scene);
        _player.left.parent = _player.body;
        _player.left.position.x = -1;
        _player.left.isVisible = false;
        _player.right = BABYLON.Mesh.CreateBox("playerRight", 3, _scene);
        _player.right.parent = _player.body;
        _player.right.position.x = 1;
        _player.right.isVisible = false;
        
        // Once the scene is loaded, just register a render loop to render it
        engine.runRenderLoop(function ()
        {
            if(modelsLoaded())
            {                   
                updatePlayer();
                _scene.render();
            }
        });

        // Resize
        window.addEventListener("resize", function ()
        {
            engine.resize();
        });
        
        window.addEventListener("keyup", keyUpEvent);
        window.addEventListener("keydown", keyDownEvent);
        document.addEventListener('pointerlockchange', pointerLockChangeEvent, false);
        document.addEventListener('mozpointerlockchange', pointerLockChangeEvent, false);
        document.addEventListener('webkitpointerlockchange', pointerLockChangeEvent, false);
        _dom.canvas.addEventListener("click", mouseClickEvent);
        _dom.canvas.addEventListener("mousemove", mouseMoveEvent);
        window.onpagehide = window.onblur = windowLostFocusEvent;
    } 
};

function initDom()
{
    _dom.canvas = document.getElementById("gameCanvas");
    _dom.hideInfo = document.getElementById("hideInfo");
    _dom.hideInfo.onclick = hideInfo;
    _dom.startMenu = document.getElementById("startMenu");
    document.getElementById("play").onclick = initGame;
}

function initGame()
{
    hideStartMenu();
    enablePointerLock();
}

function enablePointerLock()
{
    _dom.canvas.requestPointerLock = _dom.canvas.webkitRequestPointerLock || _dom.canvas.mozRequestPointerLock;
    _dom.canvas.requestPointerLock();
}

function disablePointerLock()
{
    document.exitPointerLock = document.exitPointerLock || document.mozExitPointerLock || document.webkitExitPointerLock;
    document.exitPointerLock();
}

function updatePlayer()
{
    if(!_game.inGame)
        return;
    
    _player.updateVelocity();
    
    if(_keys.forward)
    {
        _player.body.position.x += _player.vel.x;
        _player.body.position.y += _player.vel.y;
        _player.body.position.z += _player.vel.z;
    }
    
    if(_keys.backward)
    {
        _player.body.position.x -= _player.vel.x;
        _player.body.position.y -= _player.vel.y;
        _player.body.position.z -= _player.vel.z;
    }
    
    if(_keys.left)
    {
        _player.body.position.x += _player.velLeft.x;
        _player.body.position.z += _player.velLeft.z;
    }
    
    if(_keys.right)
    {
        _player.body.position.x += _player.velRight.x;
        _player.body.position.z += _player.velRight.z;
    }
    
    if(_viewAngle.vertSum > _viewAngle.vertMax)
        _viewAngle.vertSum = _viewAngle.vertMax;
    
    else if(_viewAngle.vertSum < _viewAngle.vertMin)
        _viewAngle.vertSum = _viewAngle.vertMin;
    
    // x is up/down, y is left/right
    _player.body.rotation.y = toRad(_viewAngle.horzSum);
    _player.body.rotation.x = toRad(_viewAngle.vertSum);
}

function modelsLoaded()
{
    return _models.total === _models.loaded;
}