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
        skybox.material = new BABYLON.StandardMaterial("skyBox", _scene);
        skybox.material.backFaceCulling = false;
        skybox.material.diffuseColor = new BABYLON.Color3(0, 0, 0);
        skybox.material.specularColor = new BABYLON.Color3(0, 0, 0);
        skybox.material.reflectionTexture = new BABYLON.CubeTexture("images/skybox/skybox", _scene);
        skybox.material.reflectionTexture.coordinatesMode = BABYLON.Texture.SKYBOX_MODE;
        skybox.infiniteDistance = true;
        skybox.scaling = new BABYLON.Vector3(50, 50, 50);
        
        // Cameras
        _camera = new BABYLON.FreeCamera("FreeCamera", new BABYLON.Vector3(0, 750, 550), _scene);
        _camera.keysUp = [_keyCodes.w];
        _camera.keysDown = [_keyCodes.s];
        _camera.keysLeft = [_keyCodes.a];
        _camera.keysRight = [_keyCodes.d];
        _camera.speed = 10.0;
        _camera.maxZ = 10000;
        
        // Attach camera to canvas
        _scene.activeCamera.attachControl(_dom.canvas);
    
        // Load all the models
        _loadingModels.total++;
        BABYLON.SceneLoader.ImportMesh("", "scenes/littleBoy/", "littleBoy.babylon", _scene, 
            function(newMeshes)
            {
                newMeshes[0].position = new BABYLON.Vector3(0, -30, 0);
                newMeshes[0].checkCollisions = true;
                _infos[_modelNames.littleBoy = newMeshes[0].id] = document.getElementById("infoLittleBoy");
                _loadingModels.loaded++;
            },
            function(e)
            {
                _loadingModels.loadedData[_modelNames.littleBoy] = e.loaded;
                _loadingModels.totalData[_modelNames.littleBoy] = e.total;
            }
        );
        
        _loadingModels.total++;
        BABYLON.SceneLoader.ImportMesh("", "scenes/pedestal/", "column.babylon", _scene,
            function(newMeshes)
            {
                newMeshes[0].position = new BABYLON.Vector3(0, -181, 0);
                newMeshes[0].scaling = new BABYLON.Vector3(.5, .5, .5);
                newMeshes[0].checkCollisions = true;
                _modelNames.pedestal = newMeshes[0].id;
                _loadingModels.loaded++;
            },
            function(e)
            {
                _loadingModels.loadedData[_modelNames.pedestal] = e.loaded;
                _loadingModels.totalData[_modelNames.pedestal] = e.total;
            }
        );
        
        _loadingModels.total++;
        BABYLON.SceneLoader.ImportMesh("", "scenes/fatMan/", "fatMan.babylon", _scene, 
            function(newMeshes)
            {
                newMeshes[0].position = new BABYLON.Vector3(0, -30, 100);
                newMeshes[0].checkCollisions = true;
                _infos[_modelNames.fatMan = newMeshes[0].id] = document.getElementById("infoFatMan");
                _loadingModels.loaded++;
            },
            function(e)
            {
                _loadingModels.loadedData[_modelNames.fatMan] = e.loaded;
                _loadingModels.totalData[_modelNames.fatMan] = e.total;
            }
        );
        
        _loadingModels.total++;
        BABYLON.SceneLoader.ImportMesh("", "scenes/enolaGay/", "enolaGay.babylon", _scene, 
            function(newMeshes)
            {
                newMeshes[0].position = new BABYLON.Vector3(0, 0, -1000);
                newMeshes[0].checkCollisions = true;
                _infos[_modelNames.enolaGay = newMeshes[0].id] = document.getElementById("infoEnolaGay");
                _loadingModels.loaded++;
            },
            function(e)
            {
                _loadingModels.loadedData[_modelNames.enolaGay] = e.loaded;
                _loadingModels.totalData[_modelNames.enolaGay] = e.total;
            }
        );
        
        _loadingModels.total++;
        BABYLON.SceneLoader.ImportMesh("", "scenes/museum/", "museum.babylon", _scene, 
            function(newMeshes)
            {
                newMeshes[0].position = new BABYLON.Vector3(0, 0, 0);
                newMeshes[0].scaling = new BABYLON.Vector3(1, 1, 1);
                newMeshes[0].checkCollisions = true;
                _modelNames.museum = newMeshes[0].id;
                _loadingModels.loaded++;
            },
            function(e)
            {
                _loadingModels.loadedData[_modelNames.museum] = e.loaded;
                _loadingModels.totalData[_modelNames.museum] = e.total;
            }
        );
        
        //Set gravity for the scene (G force like, on Y-axis)
        _scene.gravity = new BABYLON.Vector3(0, 0, 0);

        // Enable Collisions
        _scene.collisionsEnabled = true;

        //Then apply collisions and gravity to the active camera
        _camera.checkCollisions = true;
        _camera.applyGravity = true;

        //Set the ellipsoid around the camera (e.g. your player's size)
        _camera.ellipsoid = new BABYLON.Vector3(1, 1, 1);
        
        // Once the scene is loaded, just register a render loop to render it
        engine.runRenderLoop(function ()
        {
            updateLoading();
            
            if(_loadingModels.done)
            {               
                _scene.render();
            }
        });

        // Resize
        window.addEventListener("resize", engine.resize);
        window.addEventListener("keyup", keyUpEvent);
        window.onpagehide = window.onblur = windowLostFocusEvent;
        _dom.canvas.addEventListener("click", mouseClickEvent);
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
    _dom.loadingMenu = document.getElementById("loadingMenu");
    document.getElementById("play").onclick = initGame;
}

function initGame()
{
    hideStartMenu();
    enablePointerLock();
}

// enables pointerlock controls
function enablePointerLock()
{
    _dom.canvas.requestPointerLock = _dom.canvas.webkitRequestPointerLock || _dom.canvas.mozRequestPointerLock;
    _dom.canvas.requestPointerLock();
}

// disables pointerlock controls
function disablePointerLock()
{
    document.exitPointerLock = document.webkitExitPointerLock || document.mozExitPointerLock
    document.exitPointerLock();
}
// updated loading menu
function updateLoading()
{
    if(_loadingModels.done)
        return;
    
    var total = 0;
    var loaded = 0;
    
    for(var p in _loadingModels.loadedData)
    {
        if(_loadingModels.loadedData.hasOwnProperty(p))
            loaded += _loadingModels.loadedData[p] || 0;
        
        if(_loadingModels.totalData.hasOwnProperty(p))
            total += _loadingModels.totalData[p] || 0;
    }
    
    if(loaded / total !== 1)
    {
        _dom.loadingMenu.innerHTML = "LOADED: " + Math.floor(100 * loaded / total) + "%";
        _loadingModels.done = false;
    }
    
    else
    {
        hideLoading();
        showStartMenu();
        _loadingModels.done = true;
    }
}

// Converts degrees to radians
function toRad(ang)
{
    return ang * Math.PI / 180;
}

// Converts radians to degrees
function toDeg(rad)
{
    return rad * 180 / Math.PI;
}

// Handle key up event
function keyUpEvent(e)
{
    switch(e.keyCode)
    {
        case _keyCodes.esc:
            showStartMenu();
            break;
            
        case _keyCodes.enter:
            initGame();
            break;
    }
}

// Handle click event
function mouseClickEvent(e)
{
    var picked = _scene.pick(_screen.width / 2, _screen.height / 2);
    
    if(picked.hit)
    {
        switch(picked.pickedMesh.id)
        {
            case _modelNames.littleBoy:
            case _modelNames.fatMan:
            case _modelNames.enolaGay:
                showInfo(_infos[picked.pickedMesh.id]);
                _modelNames.showing = picked.pickedMesh.id;
                break;
        }
    }
}

// Handles when window loses focus
function windowLostFocusEvent()
{
    if(_loadingModels.done)
        showStartMenu();
}