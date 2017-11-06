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

// Response handling // get rid of this.... it keeps artifact data around.
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
          //console.log( err );
        } else {
          //console.log( 'you updated a jem' );

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



    response.message = 'success';
    res.json(response);


  } );
} );


app.get('/session', (req, res) =>{
  console.log('called session');
  if(auth(req,res)){
    connection( ( db ) => {

      db.collection('accounts').findOne({ token: sanitize( req.cookies.token ) }, (err, result) => {
        if(result){
          response.message = result.type;
          res.json(response);
        }else{
          response.message = 'null';
          res.json(response);
        }
        db.close;
      });

    });
  }
});

app.post( '/login', ( req, result ) => {

  //console.log( "Cookies :  ", req.cookies );

  connection( ( db ) => {
    db.collection( 'accounts' ).findOne( {
      email: req.body.email
    }, ( err, doc ) => {

      if ( err ) { sendError(err,res);
      } else {

        if(doc){
          bcrypt.compare( req.body.password, doc.password, ( err, res ) => {
            if ( err ) {
              sendError(err, res);
            } else if ( res ) {
              //console.log( req.body.password, doc.password );

              var token = jwt.encode( req.body.email, JWT_SECRET );

              db.collection('accounts').updateOne({ email: req.body.email}, {$set: {token: token}}, (err, res) =>{
                if(err){
                  sendError(err, res);
                }else{
                  result.cookie( 'token', token, {} ).send( 'login success' );
                }
              });





            } else {

              response.message = 'login failed';
              result.json(response);
            }

          } );
        }else{
          response.message = 'Invalid Email';
          result.json(response);
        }



      }

    } );



  } );
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
