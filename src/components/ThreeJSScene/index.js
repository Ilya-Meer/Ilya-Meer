import React from "react";
import * as THREE from "three";

import ObjectControls from './ObjectControls';
import styles from './styles.module.css';


THREE.ObjectControls = ObjectControls;

class ThreeJSScene extends React.Component {
  componentDidMount(){
    const {
      font: JSONFont, 
      displayText,
      color,
      size
    } = this.props;

    window.addEventListener('resize', this.onWindowResize, false);

    //ADD SCENE
    this.scene = new THREE.Scene()
    //ADD CAMERA
    this.camera = new THREE.PerspectiveCamera(35, window.innerWidth/window.innerHeight, 0.1, 3000);
    this.camera.position.z = 250;
    
    //ADD RENDERER
    this.renderer = new THREE.WebGLRenderer({ antialias: true })
    this.renderer.setClearColor('#fff')
    this.renderer.setSize(window.innerWidth,window.innerHeight);
    this.mount.appendChild(this.renderer.domElement)

    // ADD LIGHTING

    this.amlight = new THREE.AmbientLight(0xffffff, 0.5);
    this.scene.add(this.amlight);

    const params = {color: "#ffffff" };
    const colorObj = new THREE.Color(params.color);
    this.ptlight = new THREE.PointLight(colorObj, 0.75);

    this.scene.add(this.ptlight);


    //ADD GEOMETRY
    this.loader = new THREE.FontLoader();

    const font = this.loader.parse(JSONFont);
    
    const geometry = new THREE.TextGeometry(displayText, { font, size, height: 20, curveSegments: 12, bevelEnabled: true, bevelThickness: 9, bevelSize: 2, bevelSegments: 5 });
    const material = new THREE.MeshPhongMaterial({ color, shininess: 500 });

    geometry.center();

    this.mesh = new THREE.Mesh(geometry, material);
    this.mesh.position.z = -400;    
    this.mesh.rotation.x = 3;
    this.mesh.rotation.y = 3;
    this.mesh.rotation.z = 3;

    this.scene.add(this.mesh);

    // ADD CONTROLS
    this.controls = new THREE.ObjectControls(this.camera, this.renderer.domElement, this.mesh);
    this.controls.enableVerticalRotation();
    this.controls.setRotationSpeed(0.05);
  
    this.start()
  }

  onWindowResize = () => {
    this.windowHalfX = window.innerWidth / 2;
    this.windowHalfY = window.innerHeight / 2;
  
    this.camera.aspect = window.innerWidth / window.innerHeight;
    this.camera.updateProjectionMatrix();
  
    this.renderer.setSize(window.innerWidth, window.innerHeight);
  }

  componentWillUnmount(){
    this.stop()
    this.mount.removeChild(this.renderer.domElement)
  }

  start = () => {
    if (!this.frameId) {
      this.frameId = requestAnimationFrame(this.animate)
    }
  }

  stop = () => {
    cancelAnimationFrame(this.frameId)
  }

  animate = () => {
    this.mesh.rotation.x += 0.001;
    this.mesh.rotation.y += 0.003;
    this.mesh.rotation.z += 0.005;  

    this.renderScene()
    this.frameId = window.requestAnimationFrame(this.animate)
  }

  renderScene = () => {
    this.renderer.render(this.scene, this.camera)
  }

  render() {
    return (
      <div
        className={styles.canvas}
        ref={(mount) => { this.mount = mount }}
      />
    )
  }
}

export default ThreeJSScene;