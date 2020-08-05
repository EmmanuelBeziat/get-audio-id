# 🔉 get-audio-id
JS tool to parse music streaming services url (Spotify, Deezer, Youtube, …) to get a song ID.

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

const audio = new GetAudioId('spotify:track:5uunXHE4kIW6uS4HWAXaOQ')

audio.getId()
// => {id: '5uunXHE4kIW6uS4HWAXaOQ', service: 'spotify' }
```

You can throw it a few types of url/strings:

```
'spotify:track:5uunXHE4kIW6uS4HWAXaOQ',
'https://open.spotify.com/track/5uunXHE4kIW6uS4HWAXaOQ',
'https://open.spotify.com/track/5uunXHE4kIW6uS4HWAXaOQ?si=6DD5tNAsRWieSursZHRm0A',
'<iframe src="https://open.spotify.com/embed/track/5uunXHE4kIW6uS4HWAXaOQ" width="300" height="380" frameborder="0" allowtransparency="true" allow="encrypted-media"></iframe>',
'https://www.deezer.com/en/track/126338363',
'https://www.youtube.com/watch?v=iVvXB-Vwnco',
'https://www.youtube.com/watch?v=iVvXB-Vwnco&feature=youtu.be&t=172',
'https://youtu.be/iVvXB-Vwnco',
'https://youtu.be/iVvXB-Vwnco?t=106',
'<iframe width="560" height="315" src="https://www.youtube.com/embed/iVvXB-Vwnco" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>'
```

# Need more services?

If you need this tool to be enhanced with more string formats, more services, etc., you can either [open a Ticket](https://github.com/EmmanuelBeziat/get-audio-id/issues/new[) and ask me, or [submit a pull request](https://github.com/EmmanuelBeziat/get-audio-id/compare) of your work (just please follow the same coding guidelines).

# License

MIT
