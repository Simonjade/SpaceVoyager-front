import { Component } from "react";

// LIBS
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

// IMPORT TEXTURE
import planetTexture from "../../assets/planetTexture/planetTexture";

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
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    const renderer = new THREE.WebGLRenderer({ alpha: true });
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.mouseButtons = {
      LEFT: THREE.MOUSE.ROTATE,
      // MIDDLE: THREE.MOUSE.DOLLY,
      // RIGHT: THREE.MOUSE.PAN
    };
    controls.update(); // reuse this
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

    const geometry = new THREE.SphereGeometry(90, 128, 128);
    const material = new THREE.MeshStandardMaterial({
      side: THREE.DoubleSide,
      transparent: true,
    });

    if (!this.sphere) {
      this.createSphere(scene, geometry, material);
    } else {
      this.updateSphereMaterial();
    }

    const ambientLight = new THREE.AmbientLight(0x202020);
    scene.add(ambientLight);
    const light = new THREE.DirectionalLight(0xffffff);
    light.castShadow = true;
    scene.add(light);
    
    light.shadow.mapSize.width = 1024;
    light.shadow.mapSize.height = 1024;
    light.shadow.camera.near = 0.5;
    light.shadow.camera.far = 500;
    light.shadow.focus = 1;
    light.position.set(100, 80, 20);
    light.distance = 300;
    controls.enableZoom = false;
    controls.update();


//! PROBLEME DE BLOOM JE REFLECHIS POUR TROUVER UN AUTRE EFFET DE REFLET LUMINEUX !\\

    const animate = () => {
      requestAnimationFrame(animate);
      controls.update();
      renderer.render(scene, camera);
      this.sphere.rotation.x += 0; // Rotation
      this.sphere.rotation.y += 0.001; // Rotation
    };
    animate();

    window.addEventListener("resize", onResize);
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
    this.texture = new THREE.TextureLoader().load(planetTexture[planetName]);
    this.texture.generateMipmaps = true;
    this.texture.wrapS = THREE.RepeatWrapping;
    this.texture.repeat.x = -1;
    this.updateSphereMaterial();
  }

  render() {
    // RENDER
    return (
      <div
        className="flex justify-center relative h-96 w-full"
        ref={(ref) => (this.mount = ref)}
      />
    );
  }
}

export default ThreePlanet;
