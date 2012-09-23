exports.init = function(app){
  app.get('/', index);
};

function index(req, res){
  console.log("HELLO");
  res.locals = {
    title: "Welcome"
  };

  res.render('index');
}
