import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

export class Init {
    constructor(canvasId) {
        this.fov = 45;
        this.canvasId = canvasId;
        this.nearPlane = 1;
        this.farPlane = 2000;
    
        this.scene = undefined;
        this.stats = undefined;
        this.camera = undefined;
        this.controls = undefined;
        this.renderer = undefined;

        this.renderScene = undefined;
        this.composer = undefined;

        this.ambientLight = undefined;
        this.directionalLight = undefined;
    } 
    
    initialize(){
        this.camera = new THREE.PerspectiveCamera(this.fov, 
            window.innerWidth / window.innerHeight, 1, 1000);
        this.camera.position.set(0,0,90);
        this.camera.focus = 20.0;

        this.clock = new THREE.Clock();
        this.scene = new THREE.Scene();
        this.scene.background = new THREE.Color('black');

        // RENDERER, SCENE, CAMERA
        const canvas = document.getElementById(this.canvasId);
        this.renderer = new THREE.WebGLRenderer({antialias: true});
        this.renderer.setSize(window.innerWidth, window.innerHeight, window.innerHeight);
        canvas.appendChild(this.renderer.domElement);

        // STATS, CONTROLS
        this.controls = new OrbitControls(this.camera, this.renderer.domElement);

        // LIGHTING
        // note for future self: try the contre-jour style of lighting
        this.ambientLight = new THREE.AmbientLight(0xffffff, 0.3);
        this.ambientLight.castShadow = true;
        this.scene.add(this.ambientLight);

        let spotLight = new THREE.DirectionalLight(0xF72585,10);
        spotLight.castShadow = true;
        spotLight.position.set(0,7000,0);
        this.scene.add(spotLight);

        let backLight = new THREE.DirectionalLight(0x4CC9F0, 10);
        backLight.castShadow = true;
        backLight.position.set(0, -7000, 0);
        this.scene.add(backLight);

        let thirdLight = new THREE.DirectionalLight(0x7209B7, 10);
        thirdLight.castShadow = true;
        thirdLight.position.set(0, 0, 1000);
        this.scene.add(thirdLight);

        window.addEventListener('resize', () => this.onWindowResize(), false);
    }

    // ANIMATION
    animate() {
        window.requestAnimationFrame(this.animate.bind(this));
        this.stats.update();
        this.controls.update();
        this.render();
    };

    render(){
        //this.renderer.render(this.scene, this.camera);
        this.composer.render();
    };

    onWindowResize(){
        this.camera.aspect = window.innerWidth/window.innerHeight;
        this.camera.updateProjectionMatrix();
        this.renderer.setSize(window.innerWidth, window.innerHeight);
    };
}

