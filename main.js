import './style.css'


import * as THREE from 'three';


import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';


import { GridHelper } from 'three';




import starsBack from './img/stars.jpg'
import sunTexture from './img/sun.jpg';
import mercuryTexture from './img/mercury.jpg';
import venusTexture from './img/venus.jpg';
import earthTexture from './img/earth.jpg';
import moonTexture from './img/moon.jpg';
import marsTexture from './img/mars.jpg';
import jupiterTexture from './img/jupiter.jpg';
import saturnTexture from './img/saturn.jpg';
import saturnRingTexture from './img/saturn-ring.png'
import uranusTexture from './img/uranus.jpg';
import uranusRingTexture from './img/uranus-ring.png'
import neptuneTexture from './img/neptune.jpg';
import plutoTexture from './img/pluto.jpg';




const scene = new THREE.Scene();


const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000);


const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector('#bg'),
  antialias: true
});


renderer.setPixelRatio( window.devicePixelRatio );
renderer.setSize( window.innerWidth, window.innerHeight );
camera.position.set(-90, 140, 140);


renderer.render( scene, camera );

const ambientLight = new THREE.AmbientLight(0x333333);
scene.add(ambientLight)


const pointLight = new THREE.PointLight(0xffffff, 2, 300);
scene.add(pointLight);


const textureLoader = new THREE.TextureLoader();


const sunGeo = new THREE.SphereGeometry( 16, 64, 32, 0, 6.283185307179586, 0, 3.141592653589793)
const sunMaterial = new THREE.MeshBasicMaterial( {map: textureLoader.load(sunTexture)})
const sun = new THREE.Mesh( sunGeo, sunMaterial );


scene.add(sun)

function createPlanet (size, texture, position, ring){
    const geo = new THREE.SphereGeometry(size, 64, 32, 0, 6.283185307179586, 0, 3.141592653589793)
    const material = new THREE.MeshStandardMaterial({
      map: textureLoader.load(texture)
    });
    const mesh = new THREE.Mesh(geo, material);
    const obj = new THREE.Object3D();
    obj.add(mesh);
    if(ring){
      const ringGeo = new THREE.RingGeometry(
        ring.innerRadius,
        ring.outerRadius,
        32
      );
      const ringMat = new THREE.MeshBasicMaterial({
        map: textureLoader.load(ring.texture),
        side: THREE.DoubleSide
      });
      const ringMesh = new THREE.Mesh(ringGeo, ringMat);
      obj.add(ringMesh);
      ringMesh.position.x = position;
      ringMesh.rotation.x = -0.5 * Math.PI;
    }
    scene.add(obj);
    mesh.position.x = position;
    return {mesh, obj}
}

const mercury = createPlanet(1.5, mercuryTexture, 28);
const venus = createPlanet(3, venusTexture, 45);
const earth = createPlanet(3.5, earthTexture, 60);
const mars = createPlanet(2, marsTexture, 75);
const jupiter = createPlanet(10, jupiterTexture, 100);
const saturn = createPlanet(8, saturnTexture, 150, {
  innerRadius: 10,
  outerRadius: 20,
  texture: saturnRingTexture
});
const uranus = createPlanet(5, uranusTexture, 190, {
  innerRadius: 7,
  outerRadius: 12,
  texture: uranusRingTexture
});
const neptune = createPlanet(4, neptuneTexture, 225);
const pluto = createPlanet(1, plutoTexture, 300);

const controls = new OrbitControls(camera, renderer.domElement);


function addStar () {
  const geometry = new THREE.SphereGeometry(0.5, 24, 24);
  const material = new THREE.MeshBasicMaterial( { color: 0xffffff })
  const star = new THREE.Mesh( geometry, material );


  const [x, y, z] = Array(3).fill().map( () => THREE.MathUtils.randFloatSpread( 1000 ) );


  star.position.set(x, y, z);
  scene.add(star)
}


Array(500).fill().forEach(addStar)


// const spaceTexture = new THREE.TextureLoader().load('stars.jpg');
scene.background = textureLoader.load(starsBack);


function animate() {
  requestAnimationFrame( animate );

  // SELF ROTATION


  sun.rotateY(0.004);
  mercury.mesh.rotateY(0.004);
  venus.mesh.rotateY(0.004);
  earth.mesh.rotateY(0.004);
  mars.mesh.rotateY(0.004);
  jupiter.mesh.rotateY(0.004);
  saturn.mesh.rotateY(0.004);
  uranus.mesh.rotateY(0.004);
  neptune.mesh.rotateY(0.032);
  pluto.mesh.rotateY(0.008);
 
  // ORBIT ROTATION
 
  mercury.obj.rotateY(0.02);
  venus.obj.rotateY(0.01);
  earth.obj.rotateY(0.008);
  mars.obj.rotateY(0.0016);
  jupiter.obj.rotateY(0.002);
  saturn.obj.rotateY(0.0009);
  uranus.obj.rotateY(0.0004);
  neptune.obj.rotateY(0.0001);
  pluto.obj.rotateY(0.00007);



  controls.update();


  renderer.render( scene, camera);
}

function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize( window.innerWidth, window.innerHeight );


}

window.addEventListener('resize', onWindowResize, false)

animate()

//TOGGLE NAVBAR CODE

const toggleButton = document.querySelector('.toggle-button')
const toggleButtonIcon = document.querySelector('.toggle-button i')
const dropDownMenu =  document.querySelector('.dropdown-menu')

toggleButton.onclick = function () {
  dropDownMenu.classList.toggle('open')
  const isOpen = dropDownMenu.classList.contains('open')

  toggleButtonIcon.classList = isOpen
  ? 'fa-solid fa-xmark'
  : 'fa-solid fa-bars'
}




