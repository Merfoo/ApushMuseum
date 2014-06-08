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
        
        // Creation of the scene 
        _scene = new BABYLON.Scene(engine);
        
        // Adding of the light on the scene
        var light0 = new BABYLON.HemisphericLight("Hemi0", new BABYLON.Vector3(0, 1, 0), _scene);
        light0.diffuse = new BABYLON.Color3(1, 1, 1);
        light0.specular = new BABYLON.Color3(1, 1, 1);
        light0.groundColor = new BABYLON.Color3(0, 0, 0);

        // Adding skybox
        var skybox = BABYLON.Mesh.CreateBox("skyBox", 100.0, _scene);
        var skyboxMaterial = new BABYLON.StandardMaterial("skyBox", _scene);
        skyboxMaterial.backFaceCulling = false;
        skybox.material = skyboxMaterial;
        skyboxMaterial.diffuseColor = new BABYLON.Color3(0, 0, 0);
        skyboxMaterial.specularColor = new BABYLON.Color3(0, 0, 0);
        skyboxMaterial.reflectionTexture = new BABYLON.CubeTexture("images/skybox/skybox", _scene);
        skyboxMaterial.reflectionTexture.coordinatesMode = BABYLON.Texture.SKYBOX_MODE;
        skybox.infiniteDistance = true;
        skybox.scaling = new BABYLON.Vector3(50, 50, 50);
        
        // Cameras
        _camera = new BABYLON.FreeCamera("FreeCamera", new BABYLON.Vector3(0, 0, 5), _scene);
        _camera.position = new BABYLON.Vector3(0, 350, 550);
        _camera.maxZ = 10000;
        
        // Attach camera to canvas
        _scene.activeCamera.attachControl(_dom.canvas);
    
        // Load all the models
        _loadingModels.total++;
        BABYLON.SceneLoader.ImportMesh("", "scenes/littleBoy/", "littleBoy.babylon", _scene, function(newMeshes)
        {
            _models.push(newMeshes[0]);
            newMeshes[0].position = new BABYLON.Vector3(0, -30, 0);
            newMeshes[0].checkCollisions = true;
            _infos[_modelNames.littleBoy = newMeshes[0].id] = document.getElementById("infoLittleBoy");
            _loadingModels.loaded++;
        });
        
        _loadingModels.total++;
        BABYLON.SceneLoader.ImportMesh("", "scenes/pedestal/", "column.babylon", _scene, function(newMeshes)
        {
            _models.push(newMeshes[0]);
            newMeshes[0].position = new BABYLON.Vector3(0, -181, 0);
            newMeshes[0].scaling = new BABYLON.Vector3(.5, .5, .5);
            newMeshes[0].checkCollisions = true;
            _loadingModels.loaded++;
        });
        
        _loadingModels.total++;
        BABYLON.SceneLoader.ImportMesh("", "scenes/fatMan/", "fatMan.babylon", _scene, function(newMeshes)
        {
            _models.push(newMeshes[0]);
            newMeshes[0].position = new BABYLON.Vector3(0, -30, 100);
            newMeshes[0].checkCollisions = true;
            _infos[_modelNames.fatMan = newMeshes[0].id] = document.getElementById("infoFatMan");
            _loadingModels.loaded++;
        });
        
        _loadingModels.total++;
        BABYLON.SceneLoader.ImportMesh("", "scenes/enolaGay/", "enolaGay.babylon", _scene, function(newMeshes)
        {
            _models.push(newMeshes[0]);
            newMeshes[0].position = new BABYLON.Vector3(0, 0, -1000);
            newMeshes[0].checkCollisions = true;
            _infos[_modelNames.enolaGay = newMeshes[0].id] = document.getElementById("infoEnolaGay");
            _loadingModels.loaded++;
        });
        
        _loadingModels.total++;
        BABYLON.SceneLoader.ImportMesh("", "scenes/museum/", "museum.babylon", _scene, function(newMeshes)
        {
            //_models.push(newMeshes[0]);
            newMeshes[0].position = new BABYLON.Vector3(0, 0, 0);
            newMeshes[0].scaling = new BABYLON.Vector3(1, 1, 1);
            newMeshes[0].checkCollisions = true;
            _loadingModels.loaded++;
        });
        
        // Set up player
        _player.body = _camera;
        _player.forward = BABYLON.Mesh.CreateBox("playerForward", 3, _scene);
        _player.forward.parent = _player.body;
        _player.forward.position.z = 3;
        _player.forward.isVisible = false;
        _player.left = BABYLON.Mesh.CreateBox("playerLeft", 3, _scene);
        _player.left.parent = _player.body;
        _player.left.position.x = -3;
        _player.left.isVisible = false;
        _player.right = BABYLON.Mesh.CreateBox("playerRight", 3, _scene);
        _player.right.parent = _player.body;
        _player.right.position.x = 3;
        _player.right.isVisible = false;
        
        // Once the scene is loaded, just register a render loop to render it
        engine.runRenderLoop(function ()
        {
            if(modelsLoaded())
            {               
                document.getElementById("debugText").innerHTML = "";
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
        window.onpagehide = window.onblur = windowLostFocusEvent;
        document.addEventListener('pointerlockchange', pointerLockChangeEvent, false);
        document.addEventListener('mozpointerlockchange', pointerLockChangeEvent, false);
        document.addEventListener('webkitpointerlockchange', pointerLockChangeEvent, false);
        _dom.canvas.addEventListener("click", mouseClickEvent);
        _dom.canvas.addEventListener("mousemove", mouseMoveEvent);
    } 
};

function initDom()
{
    _screen.width = window.innerWidth;
    _screen.height = window.innerHeight;
    _dom.canvas = document.getElementById("gameCanvas");
    _dom.hideInfo = document.getElementById("hideInfo");
    _dom.hideInfo.onclick = hideInfo;
    _dom.startMenu = document.getElementById("startMenu");
    _dom.crosshair = document.getElementById("crosshair");
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
        
        if(collides())
        {
            _player.body.position.x -= _player.vel.x;
            _player.body.position.y -= _player.vel.y;
            _player.body.position.z -= _player.vel.z;
        }
    }
    
    if(_keys.backward)
    {
        _player.body.position.x -= _player.vel.x;
        _player.body.position.y -= _player.vel.y;
        _player.body.position.z -= _player.vel.z;
        
        if(collides())
        {
            _player.body.position.x += _player.vel.x;
            _player.body.position.y += _player.vel.y;
            _player.body.position.z += _player.vel.z;
        }
    }
    
    if(_keys.left)
    {
        _player.body.position.x += _player.velLeft.x;
        _player.body.position.z += _player.velLeft.z;
        
        if(collides())
        {
            _player.body.position.x -= _player.velLeft.x;
            _player.body.position.z -= _player.velLeft.z;
        }
    }
    
    if(_keys.right)
    {
        _player.body.position.x += _player.velRight.x;
        _player.body.position.z += _player.velRight.z;
        
        if(collides())
        {
            _player.body.position.x -= _player.velRight.x;
            _player.body.position.z -= _player.velRight.z;
        }
    }
    
}

function collides()
{
    for(var i = 0, len = _models.length; i < len; i++)
        if(_models[i].intersectsPoint(_player.body.position, true))
            return true;//console.log("COLLIDED");
    
    return false;
}

function modelsLoaded()
{
    return _loadingModels.total === _loadingModels.loaded;
}