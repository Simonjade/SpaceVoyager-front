// import * as THREE from 'three';
// import { OrbitControls } from 'three/addons/controls/OrbitControls.js';



// // ici je crée une caméra
// const scene = new THREE.Scene();
// const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
// const renderer = new THREE.WebGLRenderer();
// const controls = new OrbitControls( camera, renderer.domElement );
// renderer.setSize( window.innerWidth, window.innerHeight );
// document.body.appendChild( renderer.domElement );
// camera.position.set( 1,0,0 );

// // // ici je crée ma sphère
// const geometry = new THREE.SphereGeometry( 50, 32, 32 );
// const textureLoader = new THREE.TextureLoader()
// const texture = textureLoader.load('8k_mars.jpg')
// texture.wrapS = THREE.RepeatWrapping
// texture.repeat.x = -1
// const material = new THREE.MeshBasicMaterial( { map: texture, side: THREE.DoubleSide } );
// const sphere = new THREE.Mesh( geometry, material );
// scene.add( sphere );
// controls.enableZoom = false
// controls.update();

// function animate() {
// 	requestAnimationFrame( animate );
// 	renderer.render( scene, camera );
//     sphere.rotation.x += 0.00;
//     sphere.rotation.y += 0.00;
// }
// animate();

// function onResize () {
//     renderer.setSize(window.innerWidth, window.innerHeight)
//     camera.aspect = window.innerWidth / window.innerHeight
//     camera.updateProjectionMatrix()
// }
// window.addEventListener('resize', onResize)