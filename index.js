'use strict'
var getSrc = require('get-src')

module.exports = function (str) {
	if (typeof str !== 'string') {
		throw new typeError('get-spotify-id expects a string')
	}

	if (/<iframe/ig.test(str)) {
		str = getSrc(str)
	}

	// Remove surrounding whitespaces or linefeeds
	str = str.trim()

	var metadata = {}

	// Try to handle google redirection uri
	if (/\/\/google/.test(str)) {
		// Find the redirection uri
		var matches = str.match(/url=([^&]+)&/)

		if (matches) {
			str = decodeURIComponent(matches[1])
		}
	}

	if (/spotify/.test(str)) {
		metadata = {
			id: spotify(str),
			service: 'spotify'
		}
	}

	return metadata
}

/**
 * Get the Spotify ID
 * @param str { string } the url from wich you want to extract the id
 * @returns { string | undefined }
 */
function spotify (str) {
	var open = /https:\/\/open\.spotify\.com\/track\//gmi
	var url = /spotify:track:/gmi

	if (open.test(str)) {
		return str.split(open)[1]
	}

	if (url.test(str)) {
		return str.split(url)[1]
	}
}
