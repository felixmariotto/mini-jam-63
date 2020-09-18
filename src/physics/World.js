
import ThreeWorld from '../graphics/ThreeWorld.js';
import Matter from 'matter-js';

// module aliases

const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;

//

const engines = {
	left: createWorld( 'left' ),
	top: createWorld( 'top' ),
	right: createWorld( 'right' ),
	bottom: createWorld( 'bottom' )
};

//

function createWorld( name ) {

	// create an engine
	const engine = Engine.create();

	// set gravity
	switch ( name ) {

	case 'left' :
		engine.world.gravity.x = 1;
		engine.world.gravity.y = 0;
		engine.world.gravity.scale = -0.00001;
		break;

	case 'top' :
		engine.world.gravity.scale = -0.00001;
		break;

	case 'right' :
		engine.world.gravity.scale = -0.00001;
		break;

	case 'bottom' :
		engine.world.gravity.scale = -0.00001;
		break

	}

	engine.name = name;

	// create a body with passed parameters + add it to the engine's world
	engine.addMyBody = function addMyBody( shape, dimensions, options ) {

		const body = Bodies[ shape ]( ...dimensions, options );

		World.add( engine.world, body );

		return body

	}

	return engine

}

// create a body and assign the passed mesh to this body
function addBodyTo( engineName, mesh, shape, dimensions, options ) {

	const body = engines[ engineName ].addMyBody( shape, dimensions, options );

	body.mesh = mesh;

}

// create hero body
function createHeroBody( mesh ) {



}

//

function animate( deltaTime ) {

	for ( let engineName of Object.keys( engines ) ) {

		const engine = engines[ engineName ];

		Engine.update( engine, deltaTime );

		Matter.Composite.allBodies( engine.world ).forEach( (body) => {

			ThreeWorld.updateBody( engine, body );

		});

	};

};

//

export default {
	animate,
	addBodyTo,
	createHeroBody
}
