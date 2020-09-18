
import ThreeWorld from '../graphics/ThreeWorld.js';
import Matter from 'matter-js';

//

let heroBody;
let lastDimension;

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
		engine.world.gravity.scale = 0.00001;
		break;

	case 'right' :
		engine.world.gravity.x = 1;
		engine.world.gravity.y = 0;
		engine.world.gravity.scale = 0.00001;
		break;

	case 'bottom' :
		engine.world.gravity.scale = -0.00001;
		break

	}

	engine.name = name;

	// create a body with passed parameters + add it to the engine's world
	engine.myAddBody = function myAddBody( shape, dimensions, options ) {

		const body = Bodies[ shape ]( ...dimensions, options );

		World.add( engine.world, body );

		return body

	}

	return engine

}

// create a body and assign the passed mesh to this body
function addBodyTo( engineName, mesh, shape, dimensions, options ) {

	const body = engines[ engineName ].myAddBody( shape, dimensions, options );

	body.mesh = mesh;

}

// create hero body
function createHeroBody( mesh ) {

	heroBody = Bodies.rectangle( 0, 0, 3, 3 );

	heroBody.mesh = mesh;

	// World.add( engines.left, heroBody );

}

//

function animate( deltaTime, dimension ) {

	// update hero dimension if necessary

	if (
		lastDimension !== dimension &&
		heroBody
	) {

		if ( lastDimension ) {

			Matter.Composite.move(
				engines[ lastDimension ].world,
				heroBody,
				engines[ dimension ].world
			);

		} else {

			Matter.Composite.add(
				engines[ dimension ].world,
				heroBody
			);

		}

		lastDimension = dimension;

	};

	// update each world

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
