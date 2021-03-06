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
        skybox.scaling = new BABYLON.Vector3(100, 100, 100);
        
        // Cameras standard(-955, 180, -6), top(-281, 981, 173)
        _camera = new BABYLON.FreeCamera("FreeCamera", new BABYLON.Vector3(-955, 180, -6), _scene);
        _camera.speed = 20;
        _camera.maxZ = 10000;
        _camera.rotation.y = toRad(90);
        _lastCam.position.x = _camera.position.x;
        _lastCam.position.y = _camera.position.y;
        _lastCam.position.z = _camera.position.z;
        _lastCam.rotation.x = _camera.rotation.x;
        _lastCam.rotation.y = _camera.rotation.y;
        _lastCam.rotation.z = _camera.rotation.z;
        disableCameraControls();
        
        // Attach camera to canvas
        _scene.activeCamera.attachControl(_dom.canvas);
    
        // Image frame
        var plane = new BABYLON.Mesh.CreatePlane("frame", 1, _scene);
        var frame = null;
        
        // Load all the models
        _loadingModels.total++;
        BABYLON.SceneLoader.ImportMesh("", "scenes/pedestal/", "column.babylon", _scene,
            function(newMeshes)
            {
                var ped = null;
                var pedestal = newMeshes[0];
                pedestal.position = new BABYLON.Vector3(0, -1000, 0);
                pedestal.scaling = new BABYLON.Vector3(.5, .5, .5);
                pedestal.checkCollisions = true;
                _modelNames.pedestal = pedestal.id;
                _loadingModels.loaded++;
            },
            function(e)
            {
                _loadingModels.loadedData[_modelNames.pedestal] = e.loaded;
                _loadingModels.totalData[_modelNames.pedestal] = e.total;
            }
        );

        _loadingModels.total++;
        BABYLON.SceneLoader.ImportMesh("", "scenes/littleBoy/", "littleBoy.babylon", _scene, 
            function(newMeshes)
            {
                newMeshes[0].position = new BABYLON.Vector3(2123, 420, -1200);
                newMeshes[0].scaling = new BABYLON.Vector3(3, 3, 3);
                newMeshes[0].checkCollisions = true;
                _infos[_modelNames.littleBoy = newMeshes[0].id] = document.getElementById("infoLittleBoy");
                _loadingModels.loaded++;
                
                // Title
                frame = plane.clone();
                frame.id = _modelNames.littleBoy;
                frame.material = new BABYLON.StandardMaterial("mat", _scene);
                frame.material.diffuseTexture = new BABYLON.Texture("images/littleBoy/text.png", _scene);
                frame.scaling = new BABYLON.Vector3(200, 75, 1);
                frame.position = new BABYLON.Vector3(2511, 577, -1553);
                frame.rotation.y = toRad(135);
                frame.checkCollisions = true;
            },
            function(e)
            {
                _loadingModels.loadedData[_modelNames.littleBoy] = e.loaded;
                _loadingModels.totalData[_modelNames.littleBoy] = e.total;
            }
        );

        _loadingModels.total++;
        BABYLON.SceneLoader.ImportMesh("", "scenes/fatMan/", "fatMan.babylon", _scene, 
            function(newMeshes)
            {
                newMeshes[0].position = new BABYLON.Vector3(130, 450, -1200);
                newMeshes[0].scaling = new BABYLON.Vector3(3, 3, 3);
                newMeshes[0].rotation.y = toRad(180);
                newMeshes[0].checkCollisions = true;
                _infos[_modelNames.fatMan = newMeshes[0].id] = document.getElementById("infoFatMan");
                _loadingModels.loaded++;
                
                // Title
                frame = plane.clone();
                frame.id = _modelNames.fatMan;
                frame.material = new BABYLON.StandardMaterial("mat", _scene);
                frame.material.diffuseTexture = new BABYLON.Texture("images/fatMan/text.png", _scene);
                frame.scaling = new BABYLON.Vector3(200, 75, 1);
                frame.position = new BABYLON.Vector3(300, 677, -1666);
                frame.rotation.y = toRad(-180);
                frame.checkCollisions = true;
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
                newMeshes[0].position = new BABYLON.Vector3(2150, 400, 1200);
                newMeshes[0].scaling = new BABYLON.Vector3(10, 10, 10);
                newMeshes[0].rotation.y = toRad(-45);
                newMeshes[0].checkCollisions = true;
                _infos[_modelNames.enolaGay = newMeshes[0].id] = document.getElementById("infoEnolaGay");
                _loadingModels.loaded++;
                
                // Title
                frame = plane.clone();
                frame.id = _modelNames.enolaGay;
                frame.material = new BABYLON.StandardMaterial("mat", _scene);
                frame.material.diffuseTexture = new BABYLON.Texture("images/enolaGay/text.png", _scene);
                frame.scaling = new BABYLON.Vector3(200, 75, 1);
                frame.position = new BABYLON.Vector3(2511, 577, 1553);
                frame.rotation.y = toRad(45);
                frame.checkCollisions = true;
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
                newMeshes[0].scaling = new BABYLON.Vector3(2, 2, 2);
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
        
        // Decision to bomb MIDDLE
        _infos[_modelNames.decisionToBomb] = document.getElementById("infoDecisionToBomb");
        frame = plane.clone();
        frame.id = _modelNames.decisionToBomb;
        frame.material = new BABYLON.StandardMaterial("mat", _scene);
        frame.material.diffuseTexture = new BABYLON.Texture("images/decisionToBomb/img1.jpg", _scene);
        // 314 x 239
        frame.scaling = new BABYLON.Vector3(314, 239, 1);
        frame.position = new BABYLON.Vector3(-40, 500, 0);
        frame.rotation.y = toRad(-90);
        frame.checkCollisions = true;
        // Title
        frame = plane.clone();
        frame.id = _modelNames.decisionToBomb;
        frame.material = new BABYLON.StandardMaterial("mat", _scene);
        frame.material.diffuseTexture = new BABYLON.Texture("images/decisionToBomb/text.png", _scene);
        frame.scaling = new BABYLON.Vector3(200, 75, 1);
        frame.position = new BABYLON.Vector3(-40, 700, 0);
        frame.rotation.y = toRad(-90);
        frame.checkCollisions = true;
        
        // Battle of Midway BOTTOM
        _infos[_modelNames.battleOfMidway] = document.getElementById("infoBattleOfMidway");
        frame = plane.clone();
        frame.id = _modelNames.battleOfMidway;
        frame.material = new BABYLON.StandardMaterial("mat", _scene);
        frame.material.diffuseTexture = new BABYLON.Texture("images/battleOfMidway/img1.jpg", _scene);
        // 231 x 218
        frame.scaling = new BABYLON.Vector3(231, 218, 1);
        frame.position = new BABYLON.Vector3(-371, 150, -723);
        frame.rotation.y = toRad(-90);
        frame.checkCollisions = true;
        frame = plane.clone();
        frame.id = _modelNames.battleOfMidway;
        frame.material = new BABYLON.StandardMaterial("mat", _scene);
        frame.material.diffuseTexture = new BABYLON.Texture("images/battleOfMidway/img2.jpg", _scene);
        // 276 x 182
        frame.scaling = new BABYLON.Vector3(276, 182, 1);
        frame.position = new BABYLON.Vector3(120, 130, -240);
        frame.checkCollisions = true;
        // Title
        frame = plane.clone();
        frame.id = _modelNames.battleOfMidway;
        frame.material = new BABYLON.StandardMaterial("mat", _scene);
        frame.material.diffuseTexture = new BABYLON.Texture("images/battleOfMidway/text.png", _scene);
        frame.scaling = new BABYLON.Vector3(200, 75, 1);
        frame.position = new BABYLON.Vector3(-267, 130, -328);
        frame.rotation.y = toRad(-30);
        frame.checkCollisions = true;
        
        // Iwo Jima BOTTOM
        _infos[_modelNames.iwoJima] = document.getElementById("infoIwoJima");
        frame = plane.clone();
        frame.id = _modelNames.iwoJima;
        frame.material = new BABYLON.StandardMaterial("mat", _scene);
        frame.material.diffuseTexture = new BABYLON.Texture("images/iwoJima/img1.jpg", _scene);
        // 232 x 217
        frame.scaling = new BABYLON.Vector3(232, 217, 1);
        frame.position = new BABYLON.Vector3(131, 131, 243);
        frame.rotation.y = toRad(-180);
        frame.checkCollisions = true;
        frame = plane.clone();
        frame.id = _modelNames.iwoJima;
        frame.material = new BABYLON.StandardMaterial("mat", _scene);
        frame.material.diffuseTexture = new BABYLON.Texture("images/iwoJima/img2.jpg", _scene);
        // 417 x 336
        frame.scaling = new BABYLON.Vector3(333, 268, 1);
        frame.position = new BABYLON.Vector3(-368, 150, 700);
        frame.rotation.y = toRad(-90);
        frame.checkCollisions = true;
        // Title
        frame = plane.clone();
        frame.id = _modelNames.iwoJima;
        frame.material = new BABYLON.StandardMaterial("mat", _scene);
        frame.material.diffuseTexture = new BABYLON.Texture("images/iwoJima/text.png", _scene);
        frame.scaling = new BABYLON.Vector3(200, 75, 1);
        frame.position = new BABYLON.Vector3(-267, 130, 328);
        frame.rotation.y = toRad(210);
        frame.checkCollisions = true;
        
        // Leyte BOTTOM
        _infos[_modelNames.leyte] = document.getElementById("infoLeyte");
        frame = plane.clone();
        frame.id = _modelNames.leyte;
        frame.material = new BABYLON.StandardMaterial("mat", _scene);
        frame.material.diffuseTexture = new BABYLON.Texture("images/leyte/img1.jpg", _scene);
        // 259 x 195
        frame.scaling = new BABYLON.Vector3(259, 195, 1);
        frame.position = new BABYLON.Vector3(2624, 150, 1500);
        frame.rotation.y = toRad(90);
        frame.checkCollisions = true;
        frame = plane.clone();
        frame.id = _modelNames.leyte;
        frame.material = new BABYLON.StandardMaterial("mat", _scene);
        frame.material.diffuseTexture = new BABYLON.Texture("images/leyte/img2.jpg", _scene);
        // 283 x 178
        frame.scaling = new BABYLON.Vector3(283, 178, 1);
        frame.position = new BABYLON.Vector3(2624, 150, 855);
        frame.rotation.y = toRad(90);
        frame.checkCollisions = true;
        // Title
        frame = plane.clone();
        frame.id = _modelNames.leyte;
        frame.material = new BABYLON.StandardMaterial("mat", _scene);
        frame.material.diffuseTexture = new BABYLON.Texture("images/leyte/text.png", _scene);
        frame.scaling = new BABYLON.Vector3(200, 75, 1);
        frame.position = new BABYLON.Vector3(2624, 150, 1175);
        frame.rotation.y = toRad(90);
        frame.checkCollisions = true;
        
        // Manhattan MIDDLE
        _infos[_modelNames.manhattan] = document.getElementById("infoManhattan");
        frame = plane.clone();
        frame.id = _modelNames.manhattan;
        frame.material = new BABYLON.StandardMaterial("mat", _scene);
        frame.material.diffuseTexture = new BABYLON.Texture("images/manhattan/img1.jpg", _scene);
        // 193 x 182
        frame.scaling = new BABYLON.Vector3(193, 182, 1);
        frame.position = new BABYLON.Vector3(202, 450, 1666);
        frame.checkCollisions = true;
        frame = plane.clone();
        frame.id = _modelNames.manhattan;
        frame.material = new BABYLON.StandardMaterial("mat", _scene);
        frame.material.diffuseTexture = new BABYLON.Texture("images/manhattan/img2.jpg", _scene);
        // 88 x 112
        frame.scaling = new BABYLON.Vector3(88, 112, 1);
        frame.position = new BABYLON.Vector3(400, 450, 1666);
        frame.checkCollisions = true;
        // Title
        frame = plane.clone();
        frame.id = _modelNames.manhattan;
        frame.material = new BABYLON.StandardMaterial("mat", _scene);
        frame.material.diffuseTexture = new BABYLON.Texture("images/manhattan/text.png", _scene);
        frame.scaling = new BABYLON.Vector3(200, 75, 1);
        frame.position = new BABYLON.Vector3(300, 677, 1666);
        frame.checkCollisions = true;
        
        // Okinawa BOTTOM
        _infos[_modelNames.okinawa] = document.getElementById("infoOkinawa");
        frame = plane.clone();
        frame.id = _modelNames.okinawa;
        frame.material = new BABYLON.StandardMaterial("mat", _scene);
        frame.material.diffuseTexture = new BABYLON.Texture("images/okinawa/img1.jpg", _scene);
        // 682 x 499
        frame.scaling = new BABYLON.Vector3(272.8, 199.6, 1);
        frame.position = new BABYLON.Vector3(850, 150, -1244);
        frame.rotation.y = toRad(205);
        frame.checkCollisions = true;
        frame = plane.clone();
        frame.id = _modelNames.okinawa;
        frame.material = new BABYLON.StandardMaterial("mat", _scene);
        frame.material.diffuseTexture = new BABYLON.Texture("images/okinawa/img2.jpg", _scene);
        // 410 x 260
        frame.scaling = new BABYLON.Vector3(410, 260, 1);
        frame.position = new BABYLON.Vector3(875, 150, -750);
        frame.rotation.y = toRad(-53);
        frame.checkCollisions = true;
        // Title
        frame = plane.clone();
        frame.id = _modelNames.okinawa;
        frame.material = new BABYLON.StandardMaterial("mat", _scene);
        frame.material.diffuseTexture = new BABYLON.Texture("images/okinawa/text.png", _scene);
        frame.scaling = new BABYLON.Vector3(200, 75, 1);
        frame.position = new BABYLON.Vector3(720, 150, -1050);
        frame.rotation.y = toRad(-90);
        frame.checkCollisions = true;
        
        // Pearl Harbor BOTTOM
        _infos[_modelNames.pearlHarbor] = document.getElementById("infoPearlHarbor");
        frame = plane.clone();
        frame.id = _modelNames.pearlHarbor;
        frame.material = new BABYLON.StandardMaterial("mat", _scene);
        frame.material.diffuseTexture = new BABYLON.Texture("images/pearlHarbor/img1.jpg", _scene);
        // 245 x 205
        frame.scaling = new BABYLON.Vector3(245, 205, 1);
        frame.position = new BABYLON.Vector3(2624, 150, -850);
        frame.rotation.y = toRad(90);
        frame.checkCollisions = true;
        frame = plane.clone();
        frame.id = _modelNames.pearlHarbor;
        frame.material = new BABYLON.StandardMaterial("mat", _scene);
        frame.material.diffuseTexture = new BABYLON.Texture("images/pearlHarbor/img2.jpg", _scene);
        // 277 x 182
        frame.scaling = new BABYLON.Vector3(277, 182, 1);
        frame.position = new BABYLON.Vector3(2624, 150, -1500);
        frame.rotation.y = toRad(90);
        frame.checkCollisions = true;
        // Title
        frame = plane.clone();
        frame.id = _modelNames.pearlHarbor;
        frame.material = new BABYLON.StandardMaterial("mat", _scene);
        frame.material.diffuseTexture = new BABYLON.Texture("images/pearlHarbor/text.png", _scene);
        frame.scaling = new BABYLON.Vector3(200, 75, 1);
        frame.position = new BABYLON.Vector3(2624, 150, -1175);
        frame.rotation.y = toRad(90);
        frame.checkCollisions = true;
        
        // Saipan BOTTOM
        _infos[_modelNames.saipan] = document.getElementById("infoSaipan");
        frame = plane.clone();
        frame.id = _modelNames.saipan;
        frame.material = new BABYLON.StandardMaterial("mat", _scene);
        frame.material.diffuseTexture = new BABYLON.Texture("images/saipan/img1.jpg", _scene);
        // 276 x 182
        frame.scaling = new BABYLON.Vector3(276, 182, 1);
        frame.position = new BABYLON.Vector3(850, 150, 1244);
        frame.rotation.y = toRad(-25);
        frame.checkCollisions = true;
        frame = plane.clone();
        frame.id = _modelNames.saipan;
        frame.material = new BABYLON.StandardMaterial("mat", _scene);
        frame.material.diffuseTexture = new BABYLON.Texture("images/saipan/img2.jpg", _scene);
        // 259 x 194
        frame.scaling = new BABYLON.Vector3(259, 194, 1);
        frame.position = new BABYLON.Vector3(875, 150, 750);
        frame.rotation.y = toRad(233);
        frame.checkCollisions = true;
        // Title
        frame = plane.clone();
        frame.id = _modelNames.saipan;
        frame.material = new BABYLON.StandardMaterial("mat", _scene);
        frame.material.diffuseTexture = new BABYLON.Texture("images/saipan/text.png", _scene);
        frame.scaling = new BABYLON.Vector3(200, 75, 1);
        frame.position = new BABYLON.Vector3(720, 150, 1050);
        frame.rotation.y = toRad(-90);
        frame.checkCollisions = true;
        
        // Mindoro BOTTOM
        _infos[_modelNames.battleOfMindoro] = document.getElementById("infoBattleOfMindoro");
        frame = plane.clone();
        frame.id = _modelNames.battleOfMindoro;
        frame.material = new BABYLON.StandardMaterial("mat", _scene);
        frame.material.diffuseTexture = new BABYLON.Texture("images/battleOfMindoro/img1.jpg", _scene);
        // 371 x 298
        frame.scaling = new BABYLON.Vector3(296.8, 238.4, 1);
        frame.position = new BABYLON.Vector3(-360, 150, -1500);
        frame.rotation.y = toRad(-90);
        frame.checkCollisions = true;
        frame = plane.clone();
        frame.id = _modelNames.battleOfMindoro;
        frame.material = new BABYLON.StandardMaterial("mat", _scene);
        frame.material.diffuseTexture = new BABYLON.Texture("images/battleOfMindoro/img2.jpg", _scene);
        // 295 x 405
        frame.scaling = new BABYLON.Vector3(147.5, 202.5, 1);
        frame.position = new BABYLON.Vector3(-369, 150, -1200);
        frame.rotation.y = toRad(-90);
        frame.checkCollisions = true;
        // Title
        frame = plane.clone();
        frame.id = _modelNames.battleOfMindoro;
        frame.material = new BABYLON.StandardMaterial("mat", _scene);
        frame.material.diffuseTexture = new BABYLON.Texture("images/battleOfMindoro/text.png", _scene);
        frame.scaling = new BABYLON.Vector3(200, 75, 1);
        frame.position = new BABYLON.Vector3(-200, 150, -1111);
        frame.rotation.y = toRad(15);
        frame.checkCollisions = true;
        
        // Luzon BOTTOM
        _infos[_modelNames.battleOfLuzon] = document.getElementById("infoBattleOfLuzon");
        frame = plane.clone();
        frame.id = _modelNames.battleOfLuzon;
        frame.material = new BABYLON.StandardMaterial("mat", _scene);
        frame.material.diffuseTexture = new BABYLON.Texture("images/battleOfLuzon/img1.jpg", _scene);
        // 900 x 618
        frame.scaling = new BABYLON.Vector3(225, 154.5, 1);
        frame.position = new BABYLON.Vector3(-360, 150, 1500);
        frame.rotation.y = toRad(-90);
        frame.checkCollisions = true;
        frame = plane.clone();
        frame.id = _modelNames.battleOfLuzon;
        frame.material = new BABYLON.StandardMaterial("mat", _scene);
        frame.material.diffuseTexture = new BABYLON.Texture("images/battleOfLuzon/img2.jpg", _scene);
        // 738 x 768
        frame.scaling = new BABYLON.Vector3(184.5, 192, 1);
        frame.position = new BABYLON.Vector3(-369, 150, 1200);
        frame.rotation.y = toRad(-90);
        frame.checkCollisions = true;
        // Title
        frame = plane.clone();
        frame.id = _modelNames.battleOfLuzon;
        frame.material = new BABYLON.StandardMaterial("mat", _scene);
        frame.material.diffuseTexture = new BABYLON.Texture("images/battleOfLuzon/text.png", _scene);
        frame.scaling = new BABYLON.Vector3(200, 75, 1);
        frame.position = new BABYLON.Vector3(-200, 150, 1111);
        frame.rotation.y = toRad(165);
        frame.checkCollisions = true;
        
        // Rebuilding Japan TOP
        _infos[_modelNames.rebuildingJapan] = document.getElementById("infoRebuildingJapan");
        frame = plane.clone();
        frame.id = _modelNames.rebuildingJapan;
        frame.material = new BABYLON.StandardMaterial("mat", _scene);
        frame.material.diffuseTexture = new BABYLON.Texture("images/rebuildingJapan/img1.jpg", _scene);
        // 549 x 340
        frame.scaling = new BABYLON.Vector3(137.25, 85, 1);
        frame.position = new BABYLON.Vector3(-424, 980, 333);
        frame.rotation.y = toRad(0);
        frame.checkCollisions = true;
        // Title
        frame = plane.clone();
        frame.id = _modelNames.rebuildingJapan;
        frame.material = new BABYLON.StandardMaterial("mat", _scene);
        frame.material.diffuseTexture = new BABYLON.Texture("images/rebuildingJapan/text.png", _scene);
        frame.scaling = new BABYLON.Vector3(200, 75, 1);
        frame.position = new BABYLON.Vector3(-424, 1070, 333);
        frame.rotation.y = toRad(0);
        frame.checkCollisions = true;
        
        // Nagasaki after Japan TOP
        _infos[_modelNames.nagasakiAfter] = document.getElementById("infoNagasakiAfter");
        frame = plane.clone();
        frame.id = _modelNames.nagasakiAfter;
        frame.material = new BABYLON.StandardMaterial("mat", _scene);
        frame.material.diffuseTexture = new BABYLON.Texture("images/nagasakiAfter/img1.jpg", _scene);
        // 457 x 300
        frame.scaling = new BABYLON.Vector3(150.81, 99, 1);
        frame.position = new BABYLON.Vector3(-777, 980, 0);
        frame.rotation.y = toRad(-90);
        frame.checkCollisions = true;
        // Title
        frame = plane.clone();
        frame.id = _modelNames.nagasakiAfter;
        frame.material = new BABYLON.StandardMaterial("mat", _scene);
        frame.material.diffuseTexture = new BABYLON.Texture("images/nagasakiAfter/text.png", _scene);
        frame.scaling = new BABYLON.Vector3(200, 75, 1);
        frame.position = new BABYLON.Vector3(-777, 1070, 0);
        frame.rotation.y = toRad(-90);
        frame.checkCollisions = true;
        
        // Rebuilding Japan TOP
        _infos[_modelNames.hiroshimaAfter] = document.getElementById("infoHiroshimaAfter");
        frame = plane.clone();
        frame.id = _modelNames.hiroshimaAfter;
        frame.material = new BABYLON.StandardMaterial("mat", _scene);
        frame.material.diffuseTexture = new BABYLON.Texture("images/hiroshimaAfter/img1.jpg", _scene);
        // 1920 x 1280
        frame.scaling = new BABYLON.Vector3(153.6, 102.4, 1);
        frame.position = new BABYLON.Vector3(-424, 980, -333);
        frame.rotation.y = toRad(180);
        frame.checkCollisions = true;
        // Title
        frame = plane.clone();
        frame.id = _modelNames.hiroshimaAfter;
        frame.material = new BABYLON.StandardMaterial("mat", _scene);
        frame.material.diffuseTexture = new BABYLON.Texture("images/hiroshimaAfter/text.png", _scene);
        frame.scaling = new BABYLON.Vector3(200, 75, 1);
        frame.position = new BABYLON.Vector3(-424, 1070, -333);
        frame.rotation.y = toRad(180);
        frame.checkCollisions = true;
        
        // Scene collision
        _scene.gravity = new BABYLON.Vector3(0, -24.52, 0);  // Set gravity for the scene (G force like, on Y-axis)
        _scene.collisionsEnabled = true;                    // Enable Collisions
        _camera.checkCollisions = true;                     // Then apply collisions and gravity to the active camera
        _camera.applyGravity = true;
        _camera.ellipsoid = new BABYLON.Vector3(4, 60, 4);   // Set the ellipsoid around the camera (e.g. your player's size)
        
        // Once the scene is loaded, just register a render loop to render it
        engine.runRenderLoop(function ()
        {
            updateLoading();
            
            if(_loadingModels.done)
            {               
                updatePlayer();
//                console.log(_camera.position);
//                console.log(toDeg(_camera.rotation.y) + " = y");
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
    if(_modelNames.showing === null && _inGame)
    {
        _lastCam.position.x = _camera.position.x;
        _lastCam.position.y = _camera.position.y;
        _lastCam.position.z = _camera.position.z;
        _lastCam.rotation.x = _camera.rotation.x;
        _lastCam.rotation.y = _camera.rotation.y;
        _lastCam.rotation.z = _camera.rotation.z;
    }
    
    else
    {
        _camera.position.x = _lastCam.position.x;
        _camera.position.y = _lastCam.position.y;
        _camera.position.z = _lastCam.position.z;
        _camera.rotation.x = _lastCam.rotation.x;
        _camera.rotation.y = _lastCam.rotation.y;
        _camera.rotation.z = _lastCam.rotation.z;
    }
}

// Enables pointerlock controls
function enablePointerLock()
{
    _dom.canvas.requestPointerLock = _dom.canvas.requestPointerLock || _dom.canvas.webkitRequestPointerLock || _dom.canvas.mozRequestPointerLock;
    _dom.canvas.requestPointerLock();
}

// Disables pointerlock controls
function disablePointerLock()
{
    document.exitPointerLock = document.exitPointerLock || document.webkitExitPointerLock || document.mozExitPointerLock;
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
        var val = Math.floor(100 * loaded / total) || 0;
        _dom.loadingMenu.innerHTML = "LOADED: " + val + "%";
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

// Converts deg to rad
function toRad(deg)
{
    return deg * Math.PI / 180;
}

// Converts deg to rad
function toDeg(rad)
{
    return rad * 180 / Math.PI;
}