var express   = require('express'),
	exphbs    = require('express-handlebars')

var app = express()

app.engine('handlebars', exphbs({defaultLayout: 'main'}))

app.set('view engine', 'handlebars')
app.set('port', (process.env.PORT || 5000))
app.set('app_url', (process.env.APP_URL || 'http://localhost:' + app.get('port')))

app.get('/', function(request, response) {
	response.render('index')
})

require('./controllers/url')(app)

app.listen(app.get('port'), function() {
	console.log('Node app is running on port', app.get('port'))
})