var mongoose = require('mongoose'),
    Schema = mongoose.Schema

var siteSchema = new Schema({
	url: String,
	originalUrl: String
})

var Site = mongoose.model('Site', siteSchema)
var sites = module.exports.sites = []

var getSite = function(url) {
	var originalUrl = false;

	sites.forEach(function(site) {
		if (site.url == url) {
			originalUrl = site.originalUrl
		}
	})

	return originalUrl
}

var newSite = function(site) {
	if (typeof site == 'object') {
		sites.push(site)
		return true
	} else {
		return false
	}
}

module.exports.Site = Site
module.exports.getSite = getSite
module.exports.newSite = newSite