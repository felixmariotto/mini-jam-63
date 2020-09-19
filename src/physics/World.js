
import ThreeWorld from '../graphics/ThreeWorld.js';
import Matter from 'matter-js';

//

let heroBody;
let lastDimension;

// module aliases

const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Events = Matter.Events;

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
		engine.world.gravity.x = -1;
		engine.world.gravity.y = 0;
		engine.world.gravity.scale = 0.00001;
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
		engine.world.gravity.y = -1;
		engine.world.gravity.scale = 0.00001;
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

// helper function to create both a mesh and a body quickly
function addRectangleHelper( engineName, x, y, width, height, notStatic ) {

	const body = Bodies.rectangle( x, y, width, height, { isStatic: !notStatic } );

	World.add( engines[ engineName ].world, body );

	const mesh = ThreeWorld.addBoxTo( engineName, x, y, width, height );

	if ( notStatic ) body.mesh = mesh;

	Events.on( engines[ engineName ], 'collisionStart', function(event) {
        var pairs = event.pairs;

        // change object colours to show those starting a collision
        for (var i = 0; i < pairs.length; i++) {

        	var pair = pairs[i];

            if (
            	pair.bodyA === body ||
            	pair.bodyB === body 
            ) {
            	mesh.material.color.set( 0x000000 )

            console.log( pair )
            }

        }

    });

    Events.on( engines[ engineName ], 'collisionEnd', function(event) {
        var pairs = event.pairs;

        // change object colours to show those starting a collision
        for (var i = 0; i < pairs.length; i++) {

        	var pair = pairs[i];

            if (
            	pair.bodyA === body ||
            	pair.bodyB === body 
            ) {
            	mesh.material.color.set( 0xffffff )
            }

        }

    });

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

			// if ( !body.isStatic ) console.log( body )

			ThreeWorld.updateBody( engine, body );

		});

	};

};

//

export default {
	animate,
	addBodyTo,
	createHeroBody,
	addRectangleHelper
}
