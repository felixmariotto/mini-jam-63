
import ThreeWorld from '../graphics/ThreeWorld.js';
import Matter from 'matter-js';

//

let heroBody;
let lastDimension;

// factor to smooth the 'pull-out' to help unstuck the body
// see https://github.com/liabru/matter-js/issues/915
const STUCK_DEBUG_FACTOR = 0.2;

// module aliases

const Engine = Matter.Engine;
const World = Matter.World;
const Body = Matter.Body;
const Bodies = Matter.Bodies;
const Events = Matter.Events;
const Vertices = Matter.Vertices;

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

	Events.on( engines[ engineName ], 'collisionActive', function(event) {
        var pairs = event.pairs;

        // change object colours to show those starting a collision
        for ( var i=0 ; i<pairs.length ; i++ ) {

        	var pair = pairs[i];

            if (
            	(pair.bodyA === body ||
            	 pair.bodyB === body) &&
            	(pair.bodyA === heroBody ||
            	 pair.bodyB === heroBody)
            ) {
            	mesh.material.color.set( 0x000000 )
            }

        }

        // check if two pairs have heroBody + a static object
        if ( pairs.length > 1 ) {

        	let idx1 = pairs.findIndex( (pair) => {
        		return (
        			pair.bodyA === heroBody && pair.bodyB.isStatic ||
            	 	pair.bodyB === heroBody && pair.bodyA.isStatic
            	)
        	})

        	let idx2 = pairs.findIndex( (pair, i) => {

        		if ( i === idx1 ) return false

        		return (
        			pair.bodyA === heroBody && pair.bodyB.isStatic ||
            	 	pair.bodyB === heroBody && pair.bodyA.isStatic
            	)
        	})

        	if ( idx1 > -1 && idx2 > -1 ) {

        		const baseVec = Matter.Vector.clone( heroBody.position );

        		console.log( pairs[ idx1 ] )

        		let vec1 = Matter.Vector.clone( pairs[ idx1 ].collision.penetration );
        		vec1 = Matter.Vector.neg( vec1 );
        		vec1 = Matter.Vector.mult( vec1, STUCK_DEBUG_FACTOR );

        		let vec2 = Matter.Vector.clone( pairs[ idx2 ].collision.penetration );
        		vec2 = Matter.Vector.neg( vec2 );
        		vec2 = Matter.Vector.mult( vec2, STUCK_DEBUG_FACTOR );

        		Matter.Vector.add( baseVec, vec1, baseVec );
        		Matter.Vector.add( baseVec, vec2, baseVec );

        		Matter.Body.setPosition( heroBody, baseVec );

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

	heroBody = Bodies.rectangle( -3, -3, 3, 3 );

	/*
	Matter.Body.applyForce(
		heroBody,
		Matter.Vector.create( -10, -10 ),
		Matter.Vector.create( 0.00001, 0.00001 )
	)
	*/

	heroBody.mesh = mesh;

	// Matter.Composite.add( engines.left.world, heroBody );

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

			/*
			Matter.Composite.add(
				engines[ dimension ].world,
				heroBody
			);
			*/

			Matter.Composite.add(
				engines[ 'top' ].world,
				heroBody
			);

			Matter.Composite.move(
				engines[ 'top' ].world,
				heroBody,
				engines[ dimension ].world
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
