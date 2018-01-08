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

//console.log('New MongoClient');

let jem = {
  description: { required: true, type: 'string' },
  tech: { required: true, type: 'string' },
  type: { required: true, type: 'string' },
  title: { required: true, type: 'string' },
  code: { required: false, type: 'string' },
  keys: { required: false, type: 'string' }
}

const Account = {
  username: { required: true, regexp: /^[\w]{4,16}$/ },
  email:{ required: true, regexp: /^\w+([\.-]?\ w+)*@\w+([\.-]?\ w+)*(\.\w{2,10})+$/ },
  password:{ required: true, regexp: /^[^\s]{4,16}$/ }
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

          //console.log('closing DB from get');
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


checkFields = function(protoType, item){
  for(let key in protoType){
    if(protoType[key].required === true){
      if(item[key]){
        if(!protoType[key].regexp.test(item[key])){
          return false;
        }
      }else{
        return false;
      }
    }
  }
  return true;
}


app.get('/account', (request,response)=>{
  if(auth(request,response)){
    connection((db)=>{

      db.collection('accounts').findOne({ token: sanitize( request.cookies.token ) }, {fields:{username: 1, email: 1}}, (err, doc) => {
        if(err){
          sendError(err, response);
        }else{


          response.json({data: doc, message: 'Account Infromation'});



        }
      });

      db.close;
    });
  }
});

app.post( '/accounts', (request, response) =>{

  if(auth(request,response)){
    connection((db)=>{
      let account = request.body.item || {};

      if(account._id){

      }else{

        if(checkFields(Account,account)){

          for (let key in account){
            account[ key ] = account[ key ] ? sanitize( account[ key ]) : null;
          }

          db.collection('accounts').findOne({username: account['username']},(err, doc) => {
            if( err ){ sendError(err, response);}
            else{
              if(doc){
                response.json({created: false, message: 'User Name is already taken'});
              }else{

                db.collection('accounts').findOne({email: account['email']},(err,doc)=>{
                  if(err){sendError(err,response);}
                  else{
                    if(doc){
                      response.json({created: false, message: 'Email is already taken'});
                    }else{
                      account.type = 'User';
                      account.password = bcrypt.hashSync(account.password, 10);
                      db.collection('accounts').insertOne(account, (err, result) =>{
                        if(err){sendError(err, response);}
                        else{
                          if(result.result.n ===1){


                            // log user in //
                            var token = jwt.encode( ( Math.floor(Math.random()*100)+1 ), JWT_SECRET);

                            db.collection('accounts').updateOne({email: sanitize(account['email'])}, {$set: {token: token}}, (err, doc) =>{
                              if(err){
                                sendError(err,response);
                              }else{
                                  //response.json({created: true, message: 'Account Created'});
                                  response.cookie('token', token,{}).json({created: true, message: 'Account Created'});
                              }
                            });



                          }else{
                            response.json({created: false, message: 'unknown database error'});
                          }
                        }
                      });
                    }
                  }
                });
              }
            }
          });

        }else{
          response.json({created: false, message: 'Missing fields or invalid'});
        }

      }
      db.close;
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

          console.log(req.cookies.token, doc)  ;

          let message = doc ? doc.type : null;
          res.json({status: 200, message: message});
        }
      });
      //console.log('closing db from session');
      db.close;
    });
  }
});

app.get('/logout',(req,res) =>{
  if(auth(req,res)){

    res.clearCookie("token");
    //console.log('clear Cookie attempted');

    res.json({status: 200, message: 'cookie cleared'});
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
                var token = jwt.encode( ( Math.floor(Math.random()*100)+1 ), JWT_SECRET);

                db.collection('accounts').updateOne({email: sanitize(req.body.email)}, {$set: {token: token}}, (err, doc) =>{
                  if(err){
                    sendError(err,res);
                  }else{
                    res.cookie('token', token,{}).json({login: true, message: 'Login Successful'});
                  }
                });
              }else{
                res.json({login: false, message: 'Login Failed'})
              }
            });
          }else{
            res.json({login: false, message: 'Email Address not found.'});
          }
        }
      });
      db.close;
    });
  }
});

app.post('/unique-user-name', (req,res) =>{

  if(auth(req,req)){
    connection((db)=>{
      db.collection('accounts').findOne({
        username: sanitize(req.body.username)
      }, (err, doc) =>{
          if ( err ) { sendError( err, res ); }
          else{
            if(doc){
              res.json({unique: false, message: 'User Name is already taken'});
            }else{
              res.json({unique: true, message: 'User Name is unique'});
            }
          }
      });
      db.close;
    });
  }
});

app.post('/unique-email', (req,res)=>{
  if(auth(req,req)){
    connection((db)=>{
      db.collection('accounts').findOne({
        email: sanitize(req.body.email)
      }, (err, doc)=>{
        if(err) {sendError(err,res);}
        else{
          if(doc){
            res.json({unique: false, message: 'E-mail Address is already taken'});
          }else{
            res.json({unique: true, message: 'E-mail is unique'})
          }
        }
      });
    db.close;
    });
  }
});

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
