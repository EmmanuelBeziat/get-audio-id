# 🔉 get-audio-id
JS tool to parse music streaming services url to get a song ID.

> *Important Note:* This work is a fork-ish of [get-video-id](https://github.com/radiovisual/get-video-id) from [@radiovisual](https://github.com/radiovisual), but meant to use audio services (Spotify, Deezer, etc.). Credits for the work should go to him.

# Purpose

This module will extract the Spotify, Deezer, including embed strings.

> Wait, why would I want to do that?

That’s a good question, thanks for asking.

Let’s say you want your users to easily share their favorites songs. You can either share them a long list of tutorials to correctly embed players from multiple services, and hope that they don’t mess up (they will). Or, you can just as them for any kind of url/share protocol from any service, and then just treat the data to render the correct player with the desired song.

That’s what this little tool is used for.

# Install

```bash
$ npm install --save get-audio-id
```

# Usage

Just call the class with a spotify/deezer url (or embed string) as a parameter. Its metadata (id and service) will be extracted.

```javascript
import GetAudioId from 'get-audio-id'

const audio = new GetAudioId('spotify:track:2LfMWfjk9wIGv9sGTjhg85')

audio.getId()
// => {id: '2LfMWfjk9wIGv9sGTjhg85', service: 'spotify' }
```

You can throw it a few types of url/strings:

```javascript
const audio = new GetAudioId('https://open.spotify.com/track/2LfMWfjk9wIGv9sGTjhg85')
```

# Need more services?

If you need this tool to be enhanced with more string formats, more services, etc., you can either [open a Ticket](https://github.com/EmmanuelBeziat/get-audio-id/issues/new[) and ask me, or [submit a pull request](https://github.com/EmmanuelBeziat/get-audio-id/compare) of your work (just please follow the same coding guidelines).

# License

MIT
