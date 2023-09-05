import React, { Component } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

class ThreePlanet extends Component {
  constructor(props) {
    super(props);
    this.sceneInitialized = false;
    this.sphere = null; // Référence à la sphère
  }

  componentDidMount() {
    if (!this.sceneInitialized) {
      this.initializeScene();
      this.sceneInitialized = true;
    }
  }

  componentDidUpdate(prevProps) {
    if (this.props.planetName !== prevProps.planetName) {
      this.updateTexture(this.props.planetName);
    }
  }

  initializeScene() {
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ alpha: true });
    const controls = new OrbitControls(camera, renderer.domElement);
    renderer.clear();
    this.mount.appendChild(renderer.domElement);

    const onResize = () => {
      const width = this.mount.clientWidth;
      const height = this.mount.clientHeight;

      camera.aspect = width / height;
      camera.updateProjectionMatrix();

      renderer.setSize(width, height);
    };

    camera.position.set(0, 0, 150);

    const geometry = new THREE.SphereGeometry(90, 52, 52);
    const material = new THREE.MeshStandardMaterial({
      side: THREE.DoubleSide,
      transparent: true,
    });

    if (!this.sphere) {
      this.createSphere(scene, geometry, material);
    } else {
      this.updateSphereMaterial();
    }

    const ambientLight = new THREE.AmbientLight(0xffffff, 2);
    scene.add(ambientLight);

    controls.enableZoom = false;
    controls.update();
    
    const animate = () => {
      requestAnimationFrame(animate);
      renderer.render(scene, camera);
      this.sphere.rotation.x += 0; // Rotation
      this.sphere.rotation.y += 0.001; // Rotation
    };

    animate();

    window.addEventListener('resize', onResize);
    onResize();
  }

  createSphere(scene, geometry, material) {
    this.sphere = new THREE.Mesh(geometry, material);
    scene.add(this.sphere);
    this.updateTexture(this.props.planetName);
  }

  updateSphereMaterial() {
    this.sphere.material.map = this.texture;
    this.sphere.material.needsUpdate = true;
  }

  updateTexture(planetName) {
    this.texture = new THREE.TextureLoader().load(`./texture_planet/${planetName}_texture.webp`);
    this.texture.wrapS = THREE.RepeatWrapping;
    this.texture.repeat.x = -1;
    this.updateSphereMaterial();
  }

  render() {
    return <div className='flex justify-center relative lg:w-2/3 w-4/5 h-96' ref={(ref) => (this.mount = ref)} />;
  }
}

export default ThreePlanet;
