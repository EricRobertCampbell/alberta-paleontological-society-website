// source: https://github.com/paganaye/babylonjs-vite-boilerplate/blob/main/src/AppOne.ts
import * as BABYLON from 'babylonjs'
import '@babylonjs/loaders/glTF'
export class AppOne {
	engine: BABYLON.Engine
	scene: BABYLON.Scene

	constructor(readonly canvas: HTMLCanvasElement) {
		this.engine = new BABYLON.Engine(canvas)
		window.addEventListener('resize', () => {
			this.engine.resize()
		})
		this.scene = createScene(this.engine, this.canvas)
	}

	debug(debugOn: boolean = true) {
		if (debugOn) {
			this.scene.debugLayer.show({ overlay: true })
		} else {
			this.scene.debugLayer.hide()
		}
	}

	async addFile(filename: string) {
		await BABYLON.appendSceneAsync(filename, this.scene)
	}

	run() {
		this.debug(true)
		this.engine.runRenderLoop(() => {
			this.scene.render()
		})
	}
}

var createScene = function (engine: BABYLON.Engine, canvas: HTMLCanvasElement) {
	// Create the scene
	const scene = new BABYLON.Scene(engine)

	// Create a basic camera and position it
	const camera = new BABYLON.ArcRotateCamera(
		'camera1',
		Math.PI / 2,
		Math.PI / 4,
		4,
		BABYLON.Vector3.Zero(),
		scene
	)
	camera.attachControl(canvas, true)

	// Create a basic light
	const light = new BABYLON.HemisphericLight(
		'light1',
		new BABYLON.Vector3(1, 1, 0),
		scene
	)

	// Load the GLB file
	BABYLON.SceneLoader.Append(
		'',
		'/fossilCollection/3dScans/APS.1992.12.glb',
		scene,
		function (scene) {
			scene.createDefaultCameraOrLight(true, true, true)
		}
	)
	return scene
}
