import '../css/style.css'
import * as THREE from '../../three';

import {Init as init} from './init.js'

let canvas = new init('threejs-canvas');

canvas.initialize();
canvas.animate();
canvas.postProcess();

// TORUS KNOT
const torusGeometry = new THREE.TorusKnotGeometry(100, 20, 100, 16);
const boxMaterial = new THREE.MeshPhysicalMaterial({
    color: 0x000000, 
    sheen: 1,
    sheenColor: 'white',
    sheenRoughness: 0.25,
    metalness:0,
    roughness:0.5,
    emissive: 0xF72585, 
    emissiveIntensity: 0.01});
const torusMesh = new THREE.Mesh(torusGeometry, boxMaterial);
canvas.scene.add(torusMesh);


var inoutEase = function(x){
    return x < 0.5 ? 4*x*x*x: 1-Math.pow(-2*x+2, 3)/2;
}

function torusAnimation(){
    // let t represent time
    let t = 0;
    torusMesh.rotation.x += 0.1*Math.sin(++t/50);
    torusMesh.rotation.y += 0.1*Math.sin(t/50);
    canvas.render();
    requestAnimationFrame(torusAnimation)
}
//canvas.renderer.setAnimationLoop(torusAnimation);
torusAnimation();

