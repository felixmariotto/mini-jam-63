
const domLeftScene = document.querySelector('.scene-mask.left canvas');
const domTopScene = document.querySelector('.scene-mask.top canvas');
const domRightScene = document.querySelector('.scene-mask.right canvas');
const domBottomScene = document.querySelector('.scene-mask.bottom canvas');

domLeftScene.style.backgroundColor = "#00ff00";
domTopScene.style.backgroundColor = "#ffff00";
domRightScene.style.backgroundColor = "#00ffff";
domBottomScene.style.backgroundColor = "#ff0000";

//

function animate( deltaTime ) {

	console.log( deltaTime )

}

//

export default {
	animate
}