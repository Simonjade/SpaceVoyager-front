import React, { Component } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

class ThreePlanet extends Component {
  constructor(props) {
    super(props);
    this.sceneInitialized = false;
  }

  componentDidMount() {
    if (!this.sceneInitialized) {
      this.initializeScene();
      this.sceneInitialized = true;
    }
  }

  initializeScene() {
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ alpha: true });
    const controls = new OrbitControls(camera, renderer.domElement);
    renderer.clear()
    this.mount.appendChild(renderer.domElement);

    function onResize() {
      const width = this.mount.clientWidth;
      const height = this.mount.clientHeight;

      camera.aspect = width / height;
      camera.updateProjectionMatrix();

      renderer.setSize(width, height);
    }

    camera.position.set(0, 0, 150);

    // Doublez le rayon de la sphère
    const geometry = new THREE.SphereGeometry(90, 52, 52);
    const textureLoader = new THREE.TextureLoader();
    const texture = textureLoader.load('2k_mars.webp');
    texture.wrapS = THREE.RepeatWrapping;
    texture.repeat.x = -1;
    const material = new THREE.MeshStandardMaterial({
      map: texture,
      side: THREE.DoubleSide,
      transparent: true,
    });
    const sphere = new THREE.Mesh(geometry, material);
    scene.add(sphere);

    const ambientLight = new THREE.AmbientLight(0xffffff, 2);
    scene.add(ambientLight);

    controls.enableZoom = false;
    controls.update();

    function animate() {
      requestAnimationFrame(animate);
      renderer.render(scene, camera);
      sphere.rotation.x += 0.00;
      sphere.rotation.y += 0.007;
    }
    animate();

    window.addEventListener('resize', onResize.bind(this));
    onResize.call(this);
  }

  render() {
    return <div className='flex justify-center relative lg:w-2/3 w-4/5 h-96' ref={(ref) => (this.mount = ref)} />;
  }
}

export default ThreePlanet;
