"use strict";

var express = require('express');

var app = express()

var communistQuotes = [
  "Пролетарии всех стран, соединяйтесь!",
  "К цели приводит не знание, а действие",
  "Каждый по возможностям, каждому по труду",
  "Труд на благо общества - дело благородное"
]

// Установка механизма представления handlebars
var handlebars = require('express-handlebars').create({defaultLayout: 'main'})
app.engine('handlebars', handlebars.engine)
app.set('view engine', 'handlebars')

app.set('port', process.env.PORT || 3000)

app.use(express.static(__dirname + '/public'))

app.get('/', function(req, res) {
  res.render('home')
})

app.get('/about', function(req, res) {
  var randomCommunistQuote = communistQuotes[Math.floor(Math.random() * communistQuotes.length)]
  res.render('about', { communistQuote: randomCommunistQuote })
})

// Обобщенный обработчик 404 (промежуточное ПО)
app.use(function(req, res) {
  res.status('404')
  res.render('404')
})

// Обработчик ошибки 500 (промежуточное ПО)
app.use(function(err, req, res, next) {
  console.error(err.stack)
  res.status(500)
  res.render('500')
})

app.listen(app.get('port'), function() {
  console.log('Express запущен на http://localhost:' + app.get('port') + '; нажмите Ctrl+С для завершения.')
})