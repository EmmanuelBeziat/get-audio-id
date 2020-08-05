'use strict'

import getSrc from 'get-src'

export default class GetAudioId {
	constructor (str) {
		if (typeof str !== 'string') {
			throw new Error('GetAudioId expects a string')
		}

		this.str = this.cleanUp(str)
	}

	cleanUp (str) {
		if (/<iframe/ig.test(str)) {
			str = getSrc(str)
		}

		// Try to handle google redirection uri
		if (/\/\/google/.test(str)) {
			// Find the redirection uri
			const matches = str.match(/url=([^&]+)&/)

			if (matches) {
				str = decodeURIComponent(matches[1])
			}
		}

		// remove any `www.`
		str = str.replace('/www.', '/')

		// Remove surrounding whitespaces or linefeeds
		str = str.trim()

		return str
	}


	getId () {
		let str = this.str
		const metadata = {
			id: null,
			service: null
		}

		if (/spotify/.test(str)) {
			metadata.id = this.spotify(str)
			metadata.service = 'spotify'
		}

		else if (/deezer/.test(str)) {
			metadata.id = this.deezer(str)
			metadata.service = 'deezer'
		}

		else if (/youtube/.test(str)) {
			metadata.id = this.youtube(str)
			metadata.service = 'youtube'
		}

		return metadata
	}

	removeParameters (str) {
		return str.split('?')[0]
	}

	/**
	 * Get the Spotify ID
	 * @param str { string } the url from wich you want to extract the id
	 * @returns { string | undefined }
	 */
	spotify (str) {
		const open = /track\//gmi
		const url = /spotify:track:/gmi

		str = this.removeParameters(str)

		if (open.test(str)) {
			const split = str.split(open)
			return split[split.length - 1]
		}

		else if (url.test(str)) {
			const split = str.split(url)
			return split[split.length - 1]
		}

		else {
			throw new Error('Unable to get Spotify ID')
		}
	}

	/**
	 * Get the Deezer ID
	 * @param str { string } the url from wich you want to extract the id
	 * @returns { string | undefined }
	 */
	deezer (str) {
		const url = /track\//gmi

		if (url.test(str)) {
			const split = str.split(url)
			return split[split.length - 1]
		}
		else {
			throw new Error('Unable to get Deezer ID')
		}
	}

	/**
	 * Get the YouTube ID
	 * @param str { string } the url from wich you want to extract the id
	 * @returns { string | undefined }
	 */
	youtube (str) {
		const url = /watch\?v=/gmi
		const short = /youtu\.be\//gmi
		const embed = /embed\//gmi

		if (url.test(str)) {
			str = str.split('&')[0]
			const split = str.split(url)
			return split[split.length - 1]
		}

		else if (short.test(str)) {
			str = this.removeParameters(str)
			const split = str.split(short)
			return split[split.length - 1]
		}

		else if (embed.test(str)) {
			str = this.removeParameters(str)
			const split = str.split(embed)
			return split[split.length - 1]
		}

		else {
			throw new Error('Unable to get YouTube ID')
		}
	}
}
