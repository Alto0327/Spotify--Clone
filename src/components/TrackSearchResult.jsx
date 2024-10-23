function TrackSearchResult({ track , chooseTrack }) {

    function handlePlay() {
        chooseTrack(track)
    }

    return (
      <div
      style={{ cursor: "pointer" }}
      onClick={handlePlay}
      className="SearchResult"
    >
      <img src={track.albumUrl} style={{ height: "64px", width: "64px" }} />
      <div>
        <div>
          <h4>{track.title}</h4>
        </div>
        <div className="artist">{track.artist}</div>
      </div>
    </div>

    )
}    

export default TrackSearchResult