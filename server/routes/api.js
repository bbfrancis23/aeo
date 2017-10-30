const express = require( 'express' );
const app = express()
const MongoClient = require( 'mongodb' ).MongoClient;
const ObjectId = require( 'mongodb' ).ObjectID;
const bodyParser = require( "body-parser" );
const bcrypt = require( 'bcryptjs' );
const jwt = require( 'jwt-simple' );
const cookieParser = require( 'cookie-parser' );
const JWT_SECRET = 'maeglin';
const sanitize = require( 'mongo-sanitize' );

app.use( cookieParser() );

let jem = {
  description: { required: true, type: 'string' },
  tech: { required: true, type: 'string' },
  type: { required: true, type: 'string' },
  title: { required: true, type: 'string' },
  code: { required: false, type: 'string' },
  keys: { required: false, type: 'string' }
}

// Connect
// TODO: add user name and password
const connection = ( closure ) => {
  return MongoClient.connect( 'mongodb://localhost:27017/aeo', ( err, db ) => {
    if ( err ) return console.log( err );
    closure( db );
  } );
};

// Response handling
let response = {
  status: 200,
  data: [],
  message: null
};

// Error handling
const sendError = ( err, res ) => {
  response.status = 500;
  response.message = typeof err == 'object' ? err.message : err;
  res.status( 500 ).json( response );
};

// authenticate
const auth = (req,res) => {
  if(req.get('host') === 'localhost:3000'){
    return true;
  }else{
    res.sendStatus(403);
  }
}


// jems /////////////////////////////////////////////////////////////////////////////////////
app.get( '/jems', ( req, res ) => {
  if(auth(req,res)){
    connection( db => {
      db.collection( 'jems' ).find().sort( { title: 1  } ).toArray()
      .then( ( jems ) => {
          db.close();
          response = {data: jems, message: 'success', status: 200};
          res.json( response );
        })
      .catch( ( err ) => { db.close();sendError( err, res ); } );
    });
  }
});

app.delete( '/jems/:id', ( req, res ) => {
  if(auth(req,res)){
    connection( ( db ) => {
      db.collection( 'jems' ).deleteOne( {
        _id: ObjectId( sanitize( req.params.id ) )
      }, ( err, result ) => {
        if ( err ) { db.close(); sendError( err, result );
        } else {
          db.close();
          response.message = 'success';
          res.json( response );
        }
      });
    });
  }
});

app.post( '/jems', ( req, res ) => {
  connection( ( db ) => {
    let jem = req.body.jem || {};
    if ( jem._id ) {
      let id = jem._id;
      delete jem._id;

      db.collection( 'jems' ).updateOne( {
        _id: ObjectId( id )
      }, jem, ( err, res ) => {



        if ( err ) {
          console.log( err );
        } else {
          console.log( 'you updated a jem' );

          //console.log(res);
        }
        // */

      } );
    } else {

      //jems.forEach( field => {
      //  if ( field === 'required' ) {
      //    jem[ field ] = jem[ field ] ? sanitize( jem[ field ] ) : '';
      //  }
      //} );

      db.collection( 'jems' ).insertOne( jem, ( err, result ) => {} );
    }






  } );
} );
//

app.post( '/login', ( req, result ) => {

  let loginInfo = req.body.jem || {};
  //result.cookie( 'token', 'grot' ).send( 'cookie is set' );

  console.log( "Cookies :  ", req.cookies );
  //let password = '$2a$10$GlJP6GznV7Lo1yEHt1INzeutPp.QrcjSoGXRwWppryB9A1w/P4qEe';

  //bcrypt.compare( req.body.password, password, function( err, res ) {
  //  console.log( res );
  //} );
  //console.log( req.body.email, req.body.password );
  connection( ( db ) => {

    db.collection( 'accounts' ).findOne( {
      email: req.body.email
    }, ( err, doc ) => {

      if ( err ) {
        console.log( err );
      } else {
        bcrypt.compare( req.body.password, doc.password, ( err, res ) => {

          if ( err ) {
            console.log( err );
          } else if ( res ) {
            console.log( req.body.password, doc.password );
            console.log( res );

            var token = jwt.encode( req.body.email, JWT_SECRET );

            console.log( 'token', token );
            var date = new Date( Date.now() );
            var newDate = new Date( date.setTime( date.getTime() + 30 * 86400000 ) );
            console.log( newDate );

            result.cookie( 'token', token, {} ).send( 'cookie is set' );

            console.log( 'setting a cookie' );

          } else {
            console.log( 'login failed' );
          }

        } );

      }

    } );



  } );



  //result.sendStatus( 200 );
} );


// get collection
app.get( '/collection/:id', ( req, res ) => {
  let name = req.params.id.charAt( 0 ).toUpperCase() + req.params.id.slice( 1 );

  connection( ( db ) => {
    db.collection( 'collection' ).findOne( {
      name: name
    }, function( err, document ) {
      response.data = document;
      res.json( response );
    } );
  } );
} );




module.exports = app;
