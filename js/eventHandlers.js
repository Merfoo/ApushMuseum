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
            _player.body.rotation.y += toRad(20);
            break;
            
        case _keyCodes.d:
            _player.body.rotation.y -= toRad(20);
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