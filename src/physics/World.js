
import GameManager from '../GameManager.js';
import ThreeWorld from '../graphics/ThreeWorld.js';
import Matter from 'matter-js';

//

let heroBody;
let lastDimension;

// factor to smooth the 'pull-out' to help unstuck the body
// see https://github.com/liabru/matter-js/issues/915
const STUCK_DEBUG_FACTOR = 1;

const HEIGHT_WATER = 10;

// const PLAYER_START = { x: 0, y: 0 };

// before pit in lowland
// const PLAYER_START = { x: 442.49890471904735, y: -3.5453599483559244 }

// big pit 
// const PLAYER_START = { x: 594.8873218419296, y: -58.53915946403395 }

// before lab
// const PLAYER_START = { x: 720.7875469820851, y: -50.78986337442688 };

// in lab
const PLAYER_START = { x: 807.823032832414, y: -58.53141556646165 };

// before core pit
// const PLAYER_START = { x: 869.4356118021891, y: 10.457127028329793 }

// in last big room in core pit
// const PLAYER_START = { x: 913, y: -338 }

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

Events.on( engines.top, 'beforeUpdate', function() {

    const gravityWater = engines.top.world.gravity;
    const gravityEarth = engines.bottom.world.gravity;

    Matter.Composite.allBodies( engines.top.world ).forEach( (body) => {

    	if ( !body.isStatic && body.position.y > HEIGHT_WATER ) {

    		Body.applyForce( body, body.position, {
				x: -gravityWater.x * gravityWater.scale * body.mass,
				y: -gravityWater.y * gravityWater.scale * body.mass
			});

			Body.applyForce( body, body.position, {
				x: gravityEarth.x * gravityEarth.scale * body.mass,
				y: gravityEarth.y * gravityEarth.scale * body.mass
			});

    	}

    })

});

//

function createWorld( name ) {

	// create an engine
	const engine = Engine.create();

	// set gravity
	switch ( name ) {

	case 'left' :
		engine.world.gravity.x = -0.6;
		engine.world.gravity.y = -0.4;
		engine.world.gravity.scale = 0.00005;
		break;

	case 'top' :
		engine.world.gravity.scale = 0.00001;
		break;

	case 'right' :
		engine.world.gravity.x = 0.6;
		engine.world.gravity.y = -0.4;
		engine.world.gravity.scale = 0.00005;
		break;

	case 'bottom' :
		engine.world.gravity.y = -1;
		engine.world.gravity.scale = 0.00005;
		break

	}

	engine.name = name;

	// create a body with passed parameters + add it to the engine's world
	engine.myAddBody = function myAddBody( shape, dimensions, options ) {

		const body = Bodies[ shape ]( ...dimensions, options );

		World.add( engine.world, body );

		return body

	}

	// collision events
	Events.on( engine, 'collisionActive', function(event) {

        const pairs = event.pairs;

        // check if hero is colliding a harmful body or the body triggering the end
        pairs.forEach( (pair) => {

        	if (
        		pair.bodyA === heroBody && pair.bodyB.savePoint ||
        		pair.bodyB === heroBody && pair.bodyA.savePoint
        	) {

        		GameManager.die();

        		putHeroOnSavepoint( pair.bodyB.savePoint || pair.bodyA.savePoint );

        	} else if (
        		pair.bodyA === heroBody && pair.bodyB.isEnd ||
        		pair.bodyB === heroBody && pair.bodyA.isEnd
        	) {

        		GameManager.win();

        		Matter.Body.setPosition( heroBody, { x: 0, y: 0 } );

        	}

        })

        // check if two pairs have heroBody + a static object
        if ( pairs.length > 1 ) {

        	let idx1 = pairs.findIndex( (pair) => {
        		return (
        			( pair.bodyA === heroBody && pair.bodyB.isStatic ) ||
            	 	( pair.bodyB === heroBody && pair.bodyA.isStatic )
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

    })

    //

	return engine

}

// create a body and assign the passed mesh to this body
function addBodyTo( engineName, mesh, shape, dimensions, options ) {

	const body = engines[ engineName ].myAddBody( shape, dimensions, options );

	body.mesh = mesh;

}

// called by Assets.createBox
function createBox( engineName, position, dimension, isStatic, rotationZ, mesh, savePoint, isEnd ) {

	const body = Bodies.rectangle(
		position.x,
		position.y,
		dimension.x,
		dimension.y,
		{ isStatic: isStatic }
	);

	body.mesh = mesh;

	body.savePoint = savePoint;

	body.isEnd = isEnd;

	Matter.Body.rotate( body, rotationZ );

	World.add( engines[ engineName ].world, body );

}

// create hero body
function createHeroBody( mesh ) {

	heroBody = Bodies.rectangle( PLAYER_START.x, PLAYER_START.y, 3, 3 );

	heroBody.isHero = true;

	heroBody.mesh = mesh;

}

//

function putHeroOnSavepoint( savePoint ) {

	Matter.Body.setPosition( heroBody, savePoint );

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

global.getPos = () => {

	console.log( heroBody.position )

}

//

export default {
	animate,
	addBodyTo,
	createHeroBody,
	createBox
}
