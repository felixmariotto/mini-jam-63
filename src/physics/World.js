
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

	engine.name = name;

	// create a body with passed parameters + add it to the engine's world
	engine.addMyBody = function addMyBody( shape, dimensions, options ) {

		const body = Bodies[ shape ]( ...dimensions, options );

		World.add( engine.world, body );

	}

	return engine

}

//

function addBodyTo( engineName, mesh, shape, dimensions, options ) {

	engines[ engineName ].addMyBody( shape, dimensions, options );

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
	addBodyTo
}
