import './style.css'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import {GLTFLoader} from 'three/examples/jsm/loaders/GLTFLoader'


//Canvas
const ourCanvas = document.querySelector('canvas.webgl')

//Sizes
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}


//Scene
const scene = new THREE.Scene()
scene.background = new THREE.Color('black')
//Resize
window.addEventListener('resize', () =>
{
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight

    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()

    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})

//Camera
const camera = new THREE.PerspectiveCamera(75, sizes.width/sizes.height, 0.01, 100)
camera.position.z = 3
scene.add(camera)

//Lights

// const ambientLight = new THREE.AmbientLight('white', 1.5)
// scene.add(ambientLight)

const spotLight = new THREE.SpotLight('white',5,6,Math.PI * 0.2, 0.25, 1)
const sHelper = new THREE.SpotLightHelper(spotLight,'white')
spotLight.position.set(0,2,4)
scene.add(spotLight)

const logo = new THREE.Mesh()
//loader
const gltfLoader = new GLTFLoader()

gltfLoader.load(
    '/models/compsci.glb',
    (gltf) => 
    {
        console.log(gltf)    
        gltf.scene.position.normalize(1)
        gltf.scene.rotation.x = Math.PI * 0.50
        gltf.scene.scale.set(1.5,1.5,1.5)
        logo.add(gltf.scene)
        scene.add(logo)
    }
)

//Renderer
const renderer = new THREE.WebGL1Renderer({canvas: ourCanvas})
renderer.setSize(sizes.width, sizes.height)
//Orbit Controls
const controls = new OrbitControls(camera, ourCanvas)
controls.enabled = true 
controls.enableDamping = true 


//Clock
const clock = new THREE.Clock()

//Animate
const animate = () => {
    //time passed
    const elapsedTime = clock.getElapsedTime()
    
    //object animation
    logo.position.y = Math.sin(elapsedTime * 0.75) * 0.20
    logo.rotation.y = elapsedTime * 0.5
    spotLight.position.y = Math.sin(elapsedTime * 0.50) * (6,-6)
    //Request animation frame
    window.requestAnimationFrame(animate)

    //ask the renderer to render
    renderer.render(scene, camera)
}
animate()