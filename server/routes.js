'use strict';

var indexController = require('./controllers/index');
var carController = require('./controllers/car');  
var userController = require('./controllers/user');  
var commentController = require('./controllers/comment'); 

module.exports = function(app) {

  app.use(function(req,res,next){
    res.locals.loginuser = req.session.loginuser;
    next();
  });

  app.get('/', indexController.index);

  app.get('/car/:id', carController.showDetail);

  app.get('/admin/car/list',userController.requireSignin,userController.requireAdmin, carController.showList);

  app.get('/admin/car/new',userController.requireSignin, userController.requireAdmin,carController.new);
  app.get('/admin/car/update/:id',userController.requireSignin, userController.requireAdmin,carController.update);

  app.post('/admin/car',userController.requireSignin,userController.requireAdmin, carController.post);
  // /admin/list?id=xxxxxxx
  app.delete('/admin/car/list',userController.requireSignin,userController.requireAdmin, carController.del);

  app.get('/signup', userController.showSignup);
  app.post('/signup', userController.postSignup);

  app.get('/signin', userController.showSignin);

 app.post('/signin', userController.postSignin); 

 app.get('/logout', userController.logout);

 app.post('/car/comment', commentController.post); 

 
};
