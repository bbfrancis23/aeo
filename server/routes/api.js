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

let responses = {  }

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

      for (let key in jem){
        jem[ key ] = jem[ key ] ? sanitize( jem[ key ]) : null;
      }

      db.collection( 'jems' ).updateOne( {
        _id: ObjectId( id )
      }, jem, ( err, result ) => {



        if ( err ) {
            sendError(err,res);
        } else {
            res.json({status: 200, message: 'Jem Updated in the Database'});
        }

      } );
    } else {



      for (let key in jem){
        jem[ key ] = jem[ key ] ? sanitize( jem[ key ]) : null;
      }

      db.collection( 'jems' ).insertOne( jem, ( err, result ) => {

        if(err){
          sendError(err,res);
        }else{
          res.json({status: 200, message: 'Jem Inserted into Database'});
        }

      });
    }



    //response.message = 'success';
    //res.json(response);
    db.close;

  } );
} );

app.get('/session', (req, res) =>{
  if(auth(req,res)){
    connection( ( db ) => {
      db.collection('accounts').findOne({ token: sanitize( req.cookies.token ) }, (err, doc) => {
        if(err){
          sendError(err, res);
        }else{
          let message = doc ? doc.type : null;
          res.json({status: 200, message: message});
        }
      });
      db.close;
    });
  }
});


app.post('/login', (req, res) => {
  if(auth(req,res)){
    connection( ( db ) => {
      db.collection( 'accounts' ).findOne( {
        email: sanitize(req.body.email)
      }, ( err, doc ) => {
        if ( err ) { sendError( err, res ); }
        else{
          if(doc){
            bcrypt.compare( sanitize(req.body.password), sanitize(doc.password), (err, result) =>{
              if(err){
                sendError(err,res)
              }else if (result){
                var token = jwt.encode( sanitize(req.body.email), JWT_SECRET);

                db.collection('accounts').updateOne({email: sanitize(req.body.email)}, {$set: {token: token}}, (err, doc) =>{
                  if(err){
                    sendError(err,res);
                  }else{
                    res.cookie('token', token,{}).json({status: 200, message: 'Login Successful'});
                  }
                });
              }else{
                res.json({status: 200, message: 'Login Failed'})
              }
            });
          }else{
            res.json({status: 200, message: 'Email Address not found.'});
          }
        }
      });
      db.close;
    });
  }
})



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
