const bodyParser = require('body-parser');
const express = require('express');
const expressValidator = require('express-validator');
const mustache = require('mustache');
const mustacheExpress = require('mustache-express');
const data = require('./models/todoData.js')
const app = express();



app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(expressValidator());

app.engine('mustache', mustacheExpress());
app.set('views', './views');
app.set('view engine', 'mustache');

app.get('/', function(req, res) {
  res.render('todo.mustache', {items:data.list});
})

app.post("/", function (req, res) {
  const newestTodo = req.body.newestItem;
  let max = 0;
  for (var i = 0; i < theList.length; i++) {
    if(max < theList[i].id) {
      max = theList[i].id;
    }
  }

  let todo = {
    text: newestTodo,
    done: false,
    id: max + 1
  }
  theList.push(todo);
  res.redirect('/');
})

app.post('/:id', function (req, res){
  let id = parseInt(req.params.id);

  theList.forEach( function(listItem){
    if(id === listItem.id){
      listItem.done = true;
    }
  })
  res.render('todo', {items:theList})
})

app.listen(3000, function() {
  console.log('Successfully started express application!');
})
