const bodyParser = require('body-parser');
const express = require('express');
const expressValidator = require('express-validator');
const mustache = require('mustache');
const mustacheExpress = require('mustache-express');
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(expressValidator());

app.engine('mustache', mustacheExpress());
app.set('views', './views');
app.set('view engine', 'mustache');

app.get('/', function(req, res) {
  res.render('todo.mustache', {items:theList});
})

let theList = [{
    'text': "Learn Node basics",
    'done': true,
    'id': 1
  },
  {
    'text': "Learn Express basics",
    'done': true,
    'id': 2
  },
  {
    'text': "Learn Mustache",
    'done': true,
    'id': 3
  },
  {
    'text': "Learn HTML forms with Express",
    'done': false,
    'id': 4
  },
  {
    'text': "Learn about authentication",
    'done': false,
    'id': 5
  },
  {
    'text': "Learn how to connect to PostgreSQL",
    'done': false,
    'id': 6
  },
  {
    'text': "Learn how to create databases",
    'done': false,
    'id': 7
  },
  {
    'text': "Learn SQL",
    'done': false,
    'id': 8
  },
  {
    'text': "Learn how to connect to PostgreSQL from Node",
    'done': false,
    'id': 9
  },
  {
    'text': "Learn how to use Sequelize",
    'done': false,
    'id': 10
  },
]

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
