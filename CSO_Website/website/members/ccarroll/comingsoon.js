"use strict";

let camera,scene,renderer
let cameraControls

let canvasWidth = window.innerWidth;
let canvasHeight = window.innerHeight;

let clock = new THREE.Clock();
let wordMesh = new THREE.Mesh();
let cursorMesh = new THREE.Mesh();

function init(){
    console.log("init")
    renderer = new THREE.WebGLRenderer( { antialias: false} )
    renderer.setSize(canvasWidth, canvasHeight)

    let canvasRatio = canvasWidth / canvasHeight
    camera = new THREE.PerspectiveCamera( 45, canvasRatio )
    camera.position.set(0,-100,0)
    camera.lookAt(new THREE.Vector3(0,0,0))

    addToDOM()
    fillScene()
}

function generateText(str){
    let fontLoader = new THREE.FontLoader()
    let font = fontLoader.load('fonts/consolas_bold.json',function(font){
        let geo = new THREE.TextGeometry(str,{
            font:font,
            size: canvasWidth/135,
            height: 5
        })
        let mat = new THREE.MeshLambertMaterial({color:0X7c5295})
        let mesh = new THREE.Mesh( geo, mat )

        mesh.rotation.x += Math.PI/2
        mesh.position.x -= canvasWidth/135*str.length/2.5
        mesh.position.z -= 2.5

        let group = new THREE.Group()

        group.add(mesh)

        wordMesh = group
        scene.add(group)
    })
}

function fillScene(){

    scene = new THREE.Scene()

    let ambientLight = new THREE.AmbientLight(0x808080)

    let light = new THREE.DirectionalLight(0x808080, 1.0)
    light.position.set(0, -100, 10)

    scene.add(ambientLight)
    scene.add(light)

    let geo = new THREE.BoxGeometry(1)
    geo.scale(0.01,0.01,0.01)
    let mat = new THREE.MeshLambertMaterial({color:0XFF0000})
    cursorMesh = new THREE.Mesh( geo, mat )
    scene.add(cursorMesh)

    generateText("Coming Soon")
}

function addToDOM() {
    let container = document.getElementById('container')
    let canvas = container.getElementsByTagName('canvas')
    if (canvas.length>0) {
        container.removeChild(canvas[0])
    }
    container.appendChild( renderer.domElement )
}

function animate() {
    window.requestAnimationFrame(animate);
    $('#debug')[0].innerText = ""
    $('#debug')[0].innerText += "cursor: (x:"+cursor[0]+",y:"+cursor[1]+")\n"

    if(canvasWidth !== window.innerWidth || canvasHeight !== window.innerHeight ) {
        canvasWidth = window.innerWidth;
        canvasHeight = window.innerHeight;
        init()
    }

    let delta = clock.getDelta();
    let areaRect = $('canvas')[0].getBoundingClientRect()

    let middle = [areaRect.x+areaRect.width/2,areaRect.y+areaRect.height/2]
    let distancetosubject = (new THREE.Vector3(camera.position.x,camera.position.y,camera.position.z)).distanceTo(new THREE.Vector3(0,0,0));
    let relativepos = [cursor[0]-middle[0],cursor[1]-middle[1]]

    $('#debug')[0].innerText += "canvas: (x:"+canvasWidth+",y:"+canvasHeight+")\n"
    $('#debug')[0].innerText += "middle: (x:"+middle[0]+",y:"+middle[1]+")\n"
    $('#debug')[0].innerText += "relative: (x:"+relativepos[0]+",y:"+relativepos[1]+")\n"

    wordMesh.setRotationFromAxisAngle( new THREE.Vector3(0,1,0), Math.atan((relativepos[0])/distancetosubject)/2 )
    wordMesh.rotateOnAxis( new THREE.Vector3(1,0,0), Math.atan((relativepos[1])/distancetosubject-Math.PI/4))

    cursorMesh.position.set(0.815*relativepos[0]/canvasWidth*2,-99,-0.415*relativepos[1]/canvasHeight*2)


    render();
}

function render(){
    renderer.render(scene, camera);
}


function main(){


    try {
        init()
        animate()

    } catch(e) {
        let errorReport = "Error:<br/><br/>";
        $('#container').append(errorReport+e);
    }
}

window.onmousemove = getCursorXY;
var cursor = [-1,-1]
function getCursorXY(event) {
    cursor[0] = event.clientX;
    cursor[1] = event.clientY;

    console.log(""+event.which)
    if(event.which === 1) {
        let geo = new THREE.BoxGeometry(1)
        geo.scale(0.01, 0.01, 0.01)
        let mat = new THREE.MeshLambertMaterial({color: 0XFF0000})
        let mesh = new THREE.Mesh(geo, mat)

        let areaRect = $('canvas')[0].getBoundingClientRect()

        let middle = [areaRect.x + areaRect.width / 2, areaRect.y + areaRect.height / 2]
        let distancetosubject = (new THREE.Vector3(camera.position.x, camera.position.y, camera.position.z)).distanceTo(new THREE.Vector3(0, 0, 0));
        let relativepos = [cursor[0] - middle[0], cursor[1] - middle[1]]
        mesh.position.set(0.815 * relativepos[0] / canvasWidth * 2, -99, -0.415 * relativepos[1] / canvasHeight * 2)
        scene.add(mesh)
    }
}

main()