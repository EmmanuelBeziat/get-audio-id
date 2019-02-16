'use strict'
var getSrc = require('get-src')

module.exports = function (str) {
	if (typeof str !== 'string') {
		throw new typeError('get-spotify-id expects a string')
	}

	if (/<iframe/ig.test(str)) {
		str = getSrc(str)
	}

	// remove any `www.`
	str = str.replace('/www.', '/')

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

	else if (/deezer/.test(str)) {
		metadata = {
			id: deezer(str),
			service: 'deezer'
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
	var open = /https:\/\/open\.spotify\.com\/(embed\/)?track\//gmi
	var url = /spotify:track:/gmi

	if (open.test(str)) {
		return str.split(open)[2]
	}

	if (url.test(str)) {
		return str.split(url)[1]
	}
}

/**
 * Get the Deezer ID
 * @param str { string } the url from wich you want to extract the id
 * @returns { string | undefined }
 */
function deezer (str) {
	var url = /https:\/\/deezer.com\/track\//gmi

	// Remove any parameter
	if (str.indexOf('?') > -1) {
		str = str.split('?')[0];
	}

	if (url.test(str)) {
		return str.split(open)[1]
	}
}
