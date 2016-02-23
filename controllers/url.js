var express   = require('express'),
	exphbs    = require('express-handlebars'),
	valid_url = require('valid-url'),
	db        = require('../db')

module.exports = function(parent) {
	var app = express()

	var randomId = function() {
	    // Generates random four digit number for link
	    var num = Math.floor(100000 + Math.random() * 900000);
	    return num.toString().substring(0, 4);
  	}

	app.get('/:id', function(request, response) {
		var id = request.params.id

		var originalUrl = db.getSite(app.get('app_url') + '/' + id)

		if (originalUrl)
			response.redirect(301, originalUrl)
		else 
			response.json('There isn\'t URL for your request.')
	})

	app.get('/new/:url*', function(request, response) {
		var url = request.url.slice(5);

		if (!valid_url.isWebUri(url)) {
			response.json('Invalid url.')
		}

		// New URL
		var site = new db.Site({
			url: app.get('app_url') + '/' + randomId(),
			originalUrl: url
		})

		if (db.newSite(site)) {
			response.json({
				original_url: site.originalUrl,
				new_url: site.url
			})
		}
	})

	parent.use(app)
}