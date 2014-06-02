document.documentElement.style.overflowX = "hidden";	 // Horz scrollbar will be hidden
document.documentElement.style.overflowY = "hidden";     // Vert scrollbar will be hidden

window.onload = function()
{
    var canvas = document.getElementById("gameCanvas");

    // Check support
    if (!BABYLON.Engine.isSupported())
        window.alert('Browser not supported');

    else 
    {
        // Babylon
        var engine = new BABYLON.Engine(canvas, true);
        
        // Set map size const
        _screen.width = window.innerWidth;
        _screen.height = window.innerHeight;
        
        //Creation of the scene 
        _scene = new BABYLON.Scene(engine);
        
        //Adding of the light on the scene
        var light0 = new BABYLON.HemisphericLight("Hemi0", new BABYLON.Vector3(0, 1, 0), _scene);
        light0.diffuse = new BABYLON.Color3(1, 1, 1);
        light0.specular = new BABYLON.Color3(1, 1, 1);
        light0.groundColor = new BABYLON.Color3(0, 0, 0);

        // Cameras
        _camera = new BABYLON.FreeCamera("FreeCamera", new BABYLON.Vector3(0, 0, 5), _scene);
        _scene.activeCameras.push(_camera);

        // Once the scene is loaded, just register a render loop to render it
        engine.runRenderLoop(function ()
        {
            if(modelsLoaded())
            {                            
                _scene.render();
            }
        });

        // Resize
        window.addEventListener("resize", function ()
        {
            engine.resize();
        });
    } 
};

function modelsLoaded()
{
    return _models.total === _models.loaded;
}