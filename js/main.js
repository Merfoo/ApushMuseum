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
        _camera.speed = 10.0;
        _camera.maxZ = 10000;
        disableCameraControls();
        
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
        
        // Image frame
        var plane = new BABYLON.Mesh.CreatePlane("frame", 1, _scene);
        var frame = null;
        
        // Battle of Midway
        _infos[_modelNames.battleOfMidway] = document.getElementById("infoBattleOfMidway");
        frame = plane.clone();
        frame.id = _modelNames.battleOfMidway;
        frame.material = new BABYLON.StandardMaterial("mat", _scene);
        frame.material.diffuseTexture = new BABYLON.Texture("images/battleOfMidway/img1.jpg", _scene);
        frame.scaling = new BABYLON.Vector3(250, 250, 1);
        frame.position = new BABYLON.Vector3(300, 0, -1000);
        frame.checkCollisions = true;
        frame = plane.clone();
        frame.id = _modelNames.battleOfMidway;
        frame.material = new BABYLON.StandardMaterial("mat", _scene);
        frame.material.diffuseTexture = new BABYLON.Texture("images/battleOfMidway/img2.jpg", _scene);
        frame.scaling = new BABYLON.Vector3(250, 250, 1);
        frame.position = new BABYLON.Vector3(600, 0, -1000);
        frame.checkCollisions = true;
        
        // Iwo Jima
        _infos[_modelNames.iwoJima] = document.getElementById("infoIwoJima");
        frame = plane.clone();
        frame.id = _modelNames.iwoJima;
        frame.material = new BABYLON.StandardMaterial("mat", _scene);
        frame.material.diffuseTexture = new BABYLON.Texture("images/iwoJima/img1.jpg", _scene);
        frame.scaling = new BABYLON.Vector3(250, 250, 1);
        frame.position = new BABYLON.Vector3(0, 0, -1000);
        frame.checkCollisions = true;
        frame = plane.clone();
        frame.id = _modelNames.iwoJima;
        frame.material = new BABYLON.StandardMaterial("mat", _scene);
        frame.material.diffuseTexture = new BABYLON.Texture("images/iwoJima/img2.jpg", _scene);
        frame.scaling = new BABYLON.Vector3(250, 250, 1);
        frame.position = new BABYLON.Vector3(-300, 0, -1000);
        frame.checkCollisions = true;
        
        // Leyte
        _infos[_modelNames.leyte] = document.getElementById("infoLeyte");
        frame = plane.clone();
        frame.id = _modelNames.leyte;
        frame.material = new BABYLON.StandardMaterial("mat", _scene);
        frame.material.diffuseTexture = new BABYLON.Texture("images/leyte/img1.jpg", _scene);
        frame.scaling = new BABYLON.Vector3(250, 250, 1);
        frame.position = new BABYLON.Vector3(-600, 0, -1000);
        frame.checkCollisions = true;
        frame = plane.clone();
        frame.id = _modelNames.leyte;
        frame.material = new BABYLON.StandardMaterial("mat", _scene);
        frame.material.diffuseTexture = new BABYLON.Texture("images/leyte/img2.jpg", _scene);
        frame.scaling = new BABYLON.Vector3(250, 250, 1);
        frame.position = new BABYLON.Vector3(-900, 0, -1000);
        frame.checkCollisions = true;
        
        // Manhattan
        _infos[_modelNames.manhattan] = document.getElementById("infoManhattan");
        frame = plane.clone();
        frame.id = _modelNames.manhattan;
        frame.material = new BABYLON.StandardMaterial("mat", _scene);
        frame.material.diffuseTexture = new BABYLON.Texture("images/manhattan/img1.jpg", _scene);
        frame.scaling = new BABYLON.Vector3(250, 250, 1);
        frame.position = new BABYLON.Vector3(-1200, 0, -1000);
        frame.checkCollisions = true;
        frame = plane.clone();
        frame.id = _modelNames.manhattan;
        frame.material = new BABYLON.StandardMaterial("mat", _scene);
        frame.material.diffuseTexture = new BABYLON.Texture("images/manhattan/img2.jpg", _scene);
        frame.scaling = new BABYLON.Vector3(250, 250, 1);
        frame.position = new BABYLON.Vector3(-1500, 0, -1000);
        frame.checkCollisions = true;
        
        // Okinawa
        _infos[_modelNames.okinawa] = document.getElementById("infoOkinawa");
        frame = plane.clone();
        frame.id = _modelNames.okinawa;
        frame.material = new BABYLON.StandardMaterial("mat", _scene);
        frame.material.diffuseTexture = new BABYLON.Texture("images/okinawa/img1.jpg", _scene);
        frame.scaling = new BABYLON.Vector3(250, 250, 1);
        frame.position = new BABYLON.Vector3(-1800, 0, -1000);
        frame.checkCollisions = true;
        frame = plane.clone();
        frame.id = _modelNames.okinawa;
        frame.material = new BABYLON.StandardMaterial("mat", _scene);
        frame.material.diffuseTexture = new BABYLON.Texture("images/okinawa/img2.jpg", _scene);
        frame.scaling = new BABYLON.Vector3(250, 250, 1);
        frame.position = new BABYLON.Vector3(-2100, 0, -1000);
        frame.checkCollisions = true;
        
        // Pearl Harbor
        _infos[_modelNames.pearlHabor] = document.getElementById("infoPearlHarbor");
        frame = plane.clone();
        frame.id = _modelNames.pearlHabor;
        frame.material = new BABYLON.StandardMaterial("mat", _scene);
        frame.material.diffuseTexture = new BABYLON.Texture("images/pearlHarbor/img1.jpg", _scene);
        frame.scaling = new BABYLON.Vector3(250, 250, 1);
        frame.position = new BABYLON.Vector3(-2400, 0, -1000);
        frame.checkCollisions = true;
        frame = plane.clone();
        frame.id = _modelNames.pearlHabor;
        frame.material = new BABYLON.StandardMaterial("mat", _scene);
        frame.material.diffuseTexture = new BABYLON.Texture("images/pearlHarbor/img2.jpg", _scene);
        frame.scaling = new BABYLON.Vector3(250, 250, 1);
        frame.position = new BABYLON.Vector3(-2700, 0, -1000);
        frame.checkCollisions = true;
        
        // Saipan
        _infos[_modelNames.saipan] = document.getElementById("infoSaipan");
        frame = plane.clone();
        frame.id = _modelNames.saipan;
        frame.material = new BABYLON.StandardMaterial("mat", _scene);
        frame.material.diffuseTexture = new BABYLON.Texture("images/saipan/img1.jpg", _scene);
        frame.scaling = new BABYLON.Vector3(250, 250, 1);
        frame.position = new BABYLON.Vector3(-3000, 0, -1000);
        frame.checkCollisions = true;
        frame = plane.clone();
        frame.id = _modelNames.saipan;
        frame.material = new BABYLON.StandardMaterial("mat", _scene);
        frame.material.diffuseTexture = new BABYLON.Texture("images/saipan/img2.jpg", _scene);
        frame.scaling = new BABYLON.Vector3(250, 250, 1);
        frame.position = new BABYLON.Vector3(-3300, 0, -1000);
        frame.checkCollisions = true;
        
        // Scene collision
        _scene.gravity = new BABYLON.Vector3(0, 0, 0);      // Set gravity for the scene (G force like, on Y-axis)
        _scene.collisionsEnabled = true;                    // Enable Collisions
        _camera.checkCollisions = true;                     // Then apply collisions and gravity to the active camera
        _camera.applyGravity = true;
        _camera.ellipsoid = new BABYLON.Vector3(1, 1, 1);   // Set the ellipsoid around the camera (e.g. your player's size)
        
        // Once the scene is loaded, just register a render loop to render it
        engine.runRenderLoop(function ()
        {
            updateLoading();
            
            if(_loadingModels.done)
            {               
                updatePlayer();
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

// Starts the game
function initGame()
{
    hideStartMenu();
    enablePointerLock();
}

// Updates player (camera)
function updatePlayer()
{
    if(_modelNames.showing === null)
    {
        _lastCam.position.x = _camera.position.x;
        _lastCam.position.y = _camera.position.y;
        _lastCam.position.z = _camera.position.z;
        _lastCam.rotation.x = _camera.rotation.x;
        _lastCam.rotation.y = _camera.rotation.y;
        _lastCam.rotation.z = _camera.rotation.z;
        console.log("not null");
    }
    
    else
    {
        _camera.position.x = _lastCam.position.x;
        _camera.position.y = _lastCam.position.y;
        _camera.position.z = _lastCam.position.z;
        _camera.rotation.x = _lastCam.rotation.x;
        _camera.rotation.y = _lastCam.rotation.y;
        _camera.rotation.z = _lastCam.rotation.z;
        console.log("null");
    }
}

// Enables pointerlock controls
function enablePointerLock()
{
    _dom.canvas.requestPointerLock = _dom.canvas.webkitRequestPointerLock || _dom.canvas.mozRequestPointerLock;
    _dom.canvas.requestPointerLock();
}

// Disables pointerlock controls
function disablePointerLock()
{
    document.exitPointerLock = document.webkitExitPointerLock || document.mozExitPointerLock
    document.exitPointerLock();
}

// Updated loading menu
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
        for(var p in _modelNames)
        {
            if(_modelNames.hasOwnProperty(p))
            {
                if(picked.pickedMesh.id === _modelNames[p] && _modelNames[p] !== _modelNames.pedestal && _modelNames[p] !== _modelNames.museum)
                {
                    showInfo(_infos[picked.pickedMesh.id]);
                    _modelNames.showing = picked.pickedMesh.id;
                    break; 
                }
            }
        }
    }
}

// Handles when window loses focus
function windowLostFocusEvent()
{
    if(_loadingModels.done)
        showStartMenu();
}

// Removes camera controls
function disableCameraControls()
{
    _camera.keysUp = [];
    _camera.keysDown = [];
    _camera.keysLeft = [];
    _camera.keysRight = [];
}

// Adds camera controls
function enableCameraControls()
{
    _camera.keysUp = [_keyCodes.w];
    _camera.keysDown = [_keyCodes.s];
    _camera.keysLeft = [_keyCodes.a];
    _camera.keysRight = [_keyCodes.d];
}