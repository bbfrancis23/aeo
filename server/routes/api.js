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
var mailer = require('nodemailer');

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

  //console.log(app.settings.views);
  let mongoPath = app.settings.views === 'C:\\Users\\Brian PC\\Desktop\\aeo\\views' ? 'mongodb://localhost:27017/aeo' : 'mongodb://aeo:aeom1789Nero@localhost:27017/aeo?authSource=admin';

  return MongoClient.connect( mongoPath, ( err, db ) => {
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

  let host = app.settings.views === 'C:\\Users\\Brian PC\\Desktop\\aeo\\views' ? 'localhost:3000' :  'aeo-tech.com';

  if(req.get('host') === host ){
    return true;
  }else{
    res.sendStatus(403);
  }
}

// mailer /////////////////////////////////////////////////



app.post('/reset-pw',(request, response) =>{
  if(auth(request,response)){
    connection((db)=>{

      db.collection('accounts').aggregate(
        [{$match: {resetCode: sanitize(request.body.resetToken)}},  { $project: { item: 1, dateDifference: { $subtract: [ new Date(), "$resetTime" ] } } } ],
      ( err, doc ) => {

        if(err) { response.json({ valid: false, message: err });db.close; }
        else{
          if( doc ){
            if( doc.length === 1 ){
              if( ((doc[0].dateDifference / 1000) /60) <= 60){

                let password = bcrypt.hashSync(request.body.password, 10);

                db.collection('accounts').updateOne( { "resetCode": sanitize( request.body.resetToken ) }, { $set: { "password": password }}, (err, doc) => {
                    if ( err ) { response.json({ valid: true, update: false, message: err });db.close }
                    else{
                      if(doc){
                        if(doc.result.n ===1){

                          db.collection('accounts').updateOne({ "resetCode": sanitize( request.body.resetToken ) }, {$unset: {resetTime: "", resetCode: ""} },(err,doc)=>{});

                          response.json({ valid: true, update: true, message: 'Password has been Updated.' })
                          db.close;
                        }else{ response.json({ valid: true, update: false, message: 'No Matching Documents.' });db.close; }
                      }else{ response.json({ valid: true, update: false, message: 'Query Failed' });db.close; }
                    }
                  }
                );// updateOne password

              }else{ response.json({ valid: true, update: false, message: 'Expired Link.'}) }
            }else{ response.json({ valid: false, message: 'No or Too Many Matching Documents.'});db.close; }
          }else{ response.json({ valid: false, message: 'Query Failed.' });db.close }
        }

      }); // aggregate
      //db.close();
    }); // connection
  } // auth
});

app.post('/valid-reset-id', (request, response) =>{
  if(auth(request,response)){

    connection((db)=>{

      db.collection('accounts').aggregate(
       [{$match: {resetCode: sanitize(request.body.resetCode)}},  { $project: { item: 1, dateDifference: { $subtract: [ new Date(), "$resetTime" ] } } } ]
      ,(err,doc)=>{
        if(err) { sendError(err,response);  }
        else{
          if(doc){
            if(doc.length === 1){

              if( ((doc[0].dateDifference / 1000) /60) <= 60){
                response.json({valid: true, message: 'Valid Code'});
              }else{

                response.json({valid: false, message: 'Expired Code'});
              }
            }else{
              response.json({valid: false, message: 'Invalid Code'});
            }
          }else{
            response.json({valid: false, message: 'Invalid Code'});
          }
        }
      });

    });


  }
});

app.post('/reset-password',(request, response) =>{
  if(auth(request,response)){

    connection((db)=>{
      db.collection('accounts').findOne({
        email: sanitize(request.body.email)
      }, (err, doc)=>{
        if(err) {sendError(err,response);}
        else{
          if(doc){

            var token = jwt.encode( ( Math.floor(Math.random()*100)+1 ), JWT_SECRET);

            db.collection('accounts').updateOne({ email: sanitize(request.body.email) }, { $currentDate: { resetTime: true }, $set: { resetCode: token} }, (err, doc) =>{
              if(err){
                console.log(err);
              }else{
                var transporter = mailer.createTransport({
                service: 'Gmail',
                auth: {
                    user: 'bbfrancis23@gmail.com',
                    pass: 'hjotqwdiujscucmq'
                }
                });

                let mailOptions = {
                  from: "bbfrancis23@gmail.com",
                  to: request.body.email,
                  subject: "Reset your Password Instructions",
                  html: `Click this link to reset your password <a href="http://localhost:3000/account/reset/${token}">Reset Password</a>.<br>This link will expire in 1 hour`
                }

                transporter.sendMail(mailOptions, (error, info) =>{
                  if(error){
                    response.json({mailsent: false, message: error});
                  }else{
                    response.json({mailsent: true, message: info.response});
                  }
                })
              }
            });

          }else{
            response.json({mailsent: false, message: 'Email was not in our system. Please set up a Free Account'})
          }
        }
      });
    db.close;
    });
  }
});


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

app.get( '/jems/add-favorite/:id', (request, response) =>{

  if(auth(request,response)){
    connection( (db) =>{

      db.collection('accounts').findOne({ token: sanitize( request.cookies.token ) }, {fields:{username: 1, email: 1}}, (err, doc) => {
        if(err){
          sendError(err, response);
          db.close();
        }else{

          db.collection('accounts').update({email: sanitize(doc.email) }, {$push: { codeFavorites: sanitize( request.params.id ) }}, (err,doc)=>{
            if(err){
              sendEroor(err, response);
              db.close();
            }else{
              response.json({success: true, message: 'Favorite Added'});
              db.close();
            }
          });
          //response.json({data: doc, message: 'Account Infromation'});



        }
      });

    });
  }

} );


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


app.post('/update-user-name',(request,response)=>{
  if(auth(request,response)){
    connection((db)=>{
      db.collection('accounts').findOne({
        username: sanitize(request.body.username)
      }, (err, doc) =>{
          if ( err ) { sendError( err, response ); }
          else{
            if(doc){
              response.json({update: false, unique: false, message: 'User Name is already taken'});
            }else{
              db.collection('accounts').updateOne(
                { "token": sanitize( request.cookies.token ) },
                { $set: { "username": sanitize(request.body.username) }}, (err, doc) => {
                  if ( err ) { sendError(err, response); }
                  else{
                    if(doc.result.n ===1){
                      response.json({update: true, message: 'User Name has been Updated.'})
                    }else{
                      response.json({update: false, message: 'Unknown database Error.'});
                    }
                  }
                }
              );
            }
          }
      });
    db.close;
    });
  }
});


app.post('/update-email',(request,response)=>{
  if(auth(request,response)){
    connection((db)=>{
      db.collection('accounts').findOne({
        username: sanitize(request.body.email)
      }, (err, doc) =>{
          if ( err ) { sendError( err, response ); }
          else{
            if(doc){
              response.json({update: false, unique: false, message: 'Email is already taken'});
            }else{
              db.collection('accounts').updateOne(
                { "token": sanitize( request.cookies.token ) },
                { $set: { "email": sanitize(request.body.email) }}, (err, doc) => {
                  if ( err ) { sendError(err, response); }
                  else{
                    if(doc.result.n ===1){
                      response.json({update: true, message: 'Email has been Updated.'})
                    }else{
                      response.json({update: false, message: 'Unknown database Error.'});
                    }
                  }
                }
              );
            }
          }
      });
    db.close;
    });
  }
});


app.post('/update-password',(request,response)=>{
  if(auth(request,response)){
    connection((db)=>{

      let password = bcrypt.hashSync(request.body.password, 10);

      db.collection('accounts').updateOne(
        { "token": sanitize( request.cookies.token ) },
        { $set: { "password": password }}, (err, doc) => {
          if ( err ) { sendError(err, response); }
          else{
            if(doc.result.n ===1){
              response.json({update: true, message: 'Password has been Updated.'})
            }else{
              response.json({update: false, message: 'Unknown database Error.'});
            }
          }
        }
      );

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
    let jem = req.body.item || {};

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
                    res.cookie('token', token,{ maxAge: 1000 * 60 * 60 * 24 * 7 }).json({login: true, message: 'Login Successful'});
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
