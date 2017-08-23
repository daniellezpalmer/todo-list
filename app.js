const bodyParser = require('body-parser');
const express = require('express');
const expressValidator = require('express-validator');
const mustache = require('mustache');
const mustacheExpress = require('mustache-express');
const data = require('./models/todoData.js')
const MongoClient = require('mongodb').MongoClient,
  assert = require('assert');
const app = express();

const url = 'mongodb://localhost:27017/todo';

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(expressValidator());

app.engine('mustache', mustacheExpress());
app.set('views', './views');
app.set('view engine', 'mustache');

app.get('/', function(req, res) {
  let collection = database.collection('todos');
  collection.find({}).toArray(function(err, todoList) {
    assert.equal(err, null);
    console.log("Found the following records");
    console.log(todoList)
    res.render('todo.mustache', {
      items: todoList
    });
  });
});

// app.post('/', function (req, res) {
//   let todo = req.body.newestItem;
//   let collection = database.collection('todos');
//   collection.find({}).toArray(function(err, todoList){
//     let todonew
//
//
//   res.render('todo', {
//     items: todoList
//   });
// })
// });

app.post("/", function(req, res) {
      const newestTodo = req.body.newestItem;
      let collection = database.collection('todos');
      collection.find({}).toArray(function(err, todoList) {
        let todo1 = {
          text: newestTodo,
          done: false,
          id: todos.length + 1
        }
        collection.insertOne(todo1),
          function(err, result) {
            res.render('todo', {todo1})
          }
      })
      res.redirect('/');
      })

      app.post('/:id', function(req, res) {
        let id = parseInt(req.params.id);
        theList.forEach(function(listItem) {
          if (id === listItem.id) {
            listItem.done = true;
          }
        })
        res.render('todo', {
          items: theList
        })
      });

      app.listen(3000, function() {
        console.log('Successfully started express application!');
      });

      let database;

      MongoClient.connect(url, function(err, db) {
        assert.equal(null, err);
        console.log("Connected successfully to mongodb");
        database = db;
      });

      process.on('SIGINT', function() {
        console.log("\nshutting down");
        database.close(function() {
          console.log('mongodb disconnected on app termination');
          process.exit(0);
        });
      });
