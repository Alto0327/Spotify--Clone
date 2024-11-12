import { useState, useEffect } from "react"
import SpotifyPlayer from "react-spotify-web-playback"
// TODO: Add loop and shuffle
export default function Player({ accessToken, trackUri }) {
  const [play, setPlay] = useState(false)

  useEffect(() => setPlay(true), [trackUri])

  if (!accessToken) return null
  return (
    <SpotifyPlayer
      token={accessToken}
      showSaveIcon
      callback={state => {
        if (!state.isPlaying) setPlay(false)
      }}
      play={play}
      uris={trackUri ? [trackUri] : []}
      styles={{
        activeColor: "#1db954",
        bgColor: "#000",
        color: "#fff",
        sliderColor: "#fff",
        sliderHandleColor: "#fff",
        sliderTrackColor:"#4d4d4d",
        trackArtistColor: "#a1a1a1",
        trackNameColor: "#fff",
      }}
    />
  )
}