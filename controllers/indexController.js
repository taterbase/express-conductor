exports.init = function(app){
  app.get('/', index);
};

function index(req, res){
  res.locals = {
    title: "Welcome"
  };

  res.render('index');
}
