# get-audio-id
JS tool to parse spotify url to get a song ID.

> *Important Note:* This work is a fork-ish of [https://github.com/radiovisual/get-video-id](get-video-id) from [@radiovisual](https://github.com/radiovisual), but meant to use audio services (Spotify, Deezer, etc.). All credits for the work should go to him.

This module will extract the Spotify, Deezer, including embed strings.

# Install

```bash
$ npm install --save get-audio-id
```

# Usage

Just call the function and give it a spotify url (or embed string). Its metadata (id and service) will be extracted.

```javascript
const getAudioId = require('get-audio-id)

getAudioId('https://open.spotify.com/track/2LfMWfjk9wIGv9sGTjhg85')
// => {id: '2LfMWfjk9wIGv9sGTjhg85', service: 'spotify' }
```

# License

MIT
