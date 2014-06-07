// Handle key up event
function keyUpEvent(e)
{
    switch(e.keyCode)
    {
        case _keyCodes.w:
            _keys.forward = false;
            break;
            
        case _keyCodes.s:
            _keys.backward = false;
            break;
            
        case _keyCodes.a:
            _keys.left = false;
            break;
            
        case _keyCodes.d:
            _keys.right = false;
            break;
            
        case _keyCodes.back:
            hideInfo();
            break;
    }
}

// Handle key down event
function keyDownEvent(e)
{
    switch(e.keyCode)
    {
        case _keyCodes.w:
            _keys.forward = true;
            break;
            
        case _keyCodes.s:
            _keys.backward = true;
            break;
            
        case _keyCodes.a:
            _keys.left = true;
            break;
            
        case _keyCodes.d:
            _keys.right = true;
            break;
    }
}

// Handle click event
function mouseClickEvent(e)
{
    var picked = _scene.pick(e.clientX, e.clientY);
    
    if(picked.hit)
    {
        switch(picked.pickedMesh.id)
        {
            case _modelNames.littleBoy:
            case _modelNames.fatMan:
                showInfo(_infos[picked.pickedMesh.id]);
                _modelNames.showing = picked.pickedMesh.id;
                break;
        }
    }
}

// Handles mouse move event
function mouseMoveEvent(e)
{
    var x = e.clientX;
    var y = e.clientY;
    _viewAngle.horz = ((x - (_screen.width / 2))/ (_screen.width / 2)) * 90;
    _viewAngle.vert = ((y - (_screen.height / 2))/ (_screen.height / 2)) * 90;
}