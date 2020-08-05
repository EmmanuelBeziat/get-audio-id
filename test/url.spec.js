import assert from 'assert'
import GetAudioId from '../index.js'

// Test urls
const errorInfos = {
	song: 'errors tests',
	spotifyURI: '  spotify:track:5uunXHE4kIW6uS4HWAXaOQ  ',
	spotifyURL: 'wrong url',
	deezerURL: 'wrong url',
	youtubeURL: 'wrong url'
}

const songInfos = {
	song: 'Silvera',
	spotifyId: '5uunXHE4kIW6uS4HWAXaOQ',
	spotifyURI: 'spotify:track:5uunXHE4kIW6uS4HWAXaOQ',
	spotifyURL: 'https://open.spotify.com/track/5uunXHE4kIW6uS4HWAXaOQ',
	spotifyURLWithParam: 'https://open.spotify.com/track/5uunXHE4kIW6uS4HWAXaOQ?si=6DD5tNAsRWieSursZHRm0A',
	spotifyEmbed: '<iframe src="https://open.spotify.com/embed/track/5uunXHE4kIW6uS4HWAXaOQ" width="300" height="380" frameborder="0" allowtransparency="true" allow="encrypted-media"></iframe>',
	deezerId: '126338363',
	deezerURL: 'https://www.deezer.com/en/track/126338363',
	youtubeId: 'iVvXB-Vwnco',
	youtubeURL: 'https://www.youtube.com/watch?v=iVvXB-Vwnco',
	youtubeURLWithParams: 'https://www.youtube.com/watch?v=iVvXB-Vwnco&feature=youtu.be&t=172',
	youtubeShortURL: 'https://youtu.be/iVvXB-Vwnco',
	youtubeShortURLWithParams: 'https://youtu.be/iVvXB-Vwnco?t=106',
	youtubeEmbed: '<iframe width="560" height="315" src="https://www.youtube.com/embed/iVvXB-Vwnco" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>'
}

describe('GetAudioId', () => {
	const error = new GetAudioId(errorInfos.spotifyURI)
	const audio = new GetAudioId(songInfos.spotifyURI)

	describe('#cleanUp', () => {
		it('should trim spaces', () => {
			assert.notEqual(error.cleanUp(errorInfos.spotifyURI), errorInfos.spotifyURI)
		})

		it('should return an untouched URI', () => {
			assert.strictEqual(audio.cleanUp(songInfos.spotifyURI), songInfos.spotifyURI, 'The cleanUp spotify URI has been modified')
		})

		it('should return an untouched URL', () => {
			assert.strictEqual(audio.cleanUp(songInfos.spotifyURL), songInfos.spotifyURL, 'The cleanUp spotify URL has been modified')
		})

		it('should return a modified URL without any parameter', () => {
			assert.notEqual(audio.cleanUp(songInfos.spotifyURL), songInfos.spotifyURLWithParam, 'The parameter from spotify URL has not been removed')
		})

		it('should return the src of spotify iframe', () => {
			assert.notEqual(audio.cleanUp(songInfos.spotifyEmbed), songInfos.spotifyEmbed, 'The src of spotify iframe has not been returned')
		})

		it('should return the src of youtube iframe', () => {
			assert.notEqual(audio.cleanUp(songInfos.youtubeEmbed), songInfos.youtubeEmbed, 'The src of youtube iframe has not been returned')
		})

	})

	describe('#spotify', () => {
		it('should return the track ID from URI', () => {
			assert.strictEqual(audio.spotify(audio.cleanUp(songInfos.spotifyURI)), songInfos.spotifyId, 'The returned spotify ID wasn’t equal to expected ID')
		})

		it('should return the track ID from URL', () => {
			assert.strictEqual(audio.spotify(audio.cleanUp(songInfos.spotifyURL)), songInfos.spotifyId, 'The returned spotify ID wasn’t equal to expected ID')
		})

		it('should return the track ID from URL with parameter', () => {
			assert.strictEqual(audio.spotify(audio.cleanUp(songInfos.spotifyURLWithParam)), songInfos.spotifyId, 'The returned spotify ID wasn’t equal to expected ID')
		})

		it('should return the track ID from embed', () => {
			assert.strictEqual(audio.spotify(audio.cleanUp(songInfos.spotifyEmbed)), songInfos.spotifyId, 'The returned spotify ID wasn’t equal to expected ID')
		})

		it('should return an error', () => {
			assert.throws(() => audio.spotify(error.spotifyURL), Error, 'There was no error')
		})
	})

	describe('#deezer', () => {
		it('should return the track ID from URL', () => {
			assert.strictEqual(audio.deezer(audio.cleanUp(songInfos.deezerURL)), songInfos.deezerId, 'The returned deezer ID wasn’t equal to expected ID')
		})

		it('should return an error', () => {
			assert.throws(() => audio.deezer(error.deezerURL), Error, 'There was no error')
		})
	})

	describe('#youtube', () => {
		it('should return the track ID from URL', () => {
			assert.strictEqual(audio.youtube(audio.cleanUp(songInfos.youtubeURL)), songInfos.youtubeId, 'The returned youtube ID wasn’t equal to expected ID')
		})

		it('should return the track ID from Short URL', () => {
			assert.strictEqual(audio.youtube(audio.cleanUp(songInfos.youtubeShortURL)), songInfos.youtubeId, 'The returned youtube ID wasn’t equal to expected ID')
		})

		it('should return the track ID from URL with parameters', () => {
			assert.strictEqual(audio.youtube(audio.cleanUp(songInfos.youtubeURLWithParams)), songInfos.youtubeId, 'The returned youtube ID wasn’t equal to expected ID')
		})

		it('should return the track ID from Short URL with parameters', () => {
			assert.strictEqual(audio.youtube(audio.cleanUp(songInfos.youtubeShortURLWithParams)), songInfos.youtubeId, 'The returned youtube ID wasn’t equal to expected ID')
		})

		it('should return the track ID from embed', () => {
			assert.strictEqual(audio.youtube(audio.cleanUp(songInfos.youtubeEmbed)), songInfos.youtubeId, 'The returned youtube ID wasn’t equal to expected ID')
		})

		it('should return an error', () => {
			assert.throws(() => audio.youtube(error.youtubeURL), Error, 'There was no error')
		})
	})

})
