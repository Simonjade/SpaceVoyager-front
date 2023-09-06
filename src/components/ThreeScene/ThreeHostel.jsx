import React, { Component } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import hostelTexture from "../../assets/hostelTexture/hostelTexture";

class ThreeHostel extends Component {
  constructor(props) {
    super(props);
    this.sceneInitialized = false;
    this.sphere = null;
  }

  componentDidMount() {
    if (!this.sceneInitialized) {
      this.initializeScene();
      this.sceneInitialized = true;
    }
  }

  componentDidUpdate(prevProps) {
    if (this.props.hostelName !== prevProps.hostelName) {
      const formattedHostelName = this.props.hostelName.replace(/['\s]/g, '_'); // Remplace les espaces et les apostrophes par des underscores
      this.updateTexture(formattedHostelName);
    }
  }

  initializeScene() {
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      75,
      this.mount.clientWidth / this.mount.clientHeight,
      0.1,
      1000
    );
    const renderer = new THREE.WebGLRenderer();
    const controls = new OrbitControls(camera, renderer.domElement);

    renderer.clear();
    renderer.setSize(this.mount.clientWidth, this.mount.clientHeight);
    this.mount.appendChild(renderer.domElement);

    camera.position.set(-1, 0, 0);

    const geometry = new THREE.SphereGeometry(50, 64, 64);
    const textureLoader = new THREE.TextureLoader();
    const texture = textureLoader.load(hostelTexture[this.props.hostelName]);
    texture.wrapS = THREE.RepeatWrapping;
    texture.repeat.x = -1;
    const material = new THREE.MeshBasicMaterial({
      map: texture,
      side: THREE.DoubleSide,
    });

    if (!this.sphere) {
      this.createSphere(scene, geometry, material);
    } else {
      this.updateSphereMaterial();
    }

    controls.enableZoom = false;
    controls.update();

    const onResize = () => {
      const width = this.mount.clientWidth;
      const height = this.mount.clientHeight;

      camera.aspect = width / height;
      camera.updateProjectionMatrix();

      renderer.setSize(width, height);
    };
    window.addEventListener("resize", onResize);

    const animate = () => {
      requestAnimationFrame(animate);
      renderer.render(scene, camera);
      this.sphere.rotation.x += 0.0;
      this.sphere.rotation.y += 0.0003;
    };
    animate();
  }

  createSphere(scene, geometry, material) {
    this.sphere = new THREE.Mesh(geometry, material);
    scene.add(this.sphere);
  }

  updateSphereMaterial() {
    this.sphere.material.map = this.texture;
    this.sphere.material.needsUpdate = true;
  }

  updateTexture(hostelName) {
    const texture = new THREE.TextureLoader().load(hostelTexture[hostelName]);
    texture.wrapS = THREE.RepeatWrapping;
    texture.repeat.x = -1;
    this.sphere.material.map = texture;
    this.sphere.material.needsUpdate = true;
  }

  render() {
    return (
      <div
        className="flex justify-center lg:w-full w-full h-[35rem] mx-4"
        ref={(ref) => (this.mount = ref)}
      />
    );
  }
}

export default ThreeHostel;
