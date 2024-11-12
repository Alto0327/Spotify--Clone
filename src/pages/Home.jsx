import { useState, useEffect } from "react";
import useAuth from "../hooks/useAuth";
import SpotifyWebApi from "spotify-web-api-node";
import TrackSearchResult from "../components/TrackSearchResult";
import Player from "../components/Player";
import CategoryPlaylists from "../components/CategoryPlaylists"; // CategoryPlaylists component for displaying playlists by category
import Library from "../page-components/Library";
import Header from "../page-components/Header";

import "../styles/Home.css";
const spotifyApi = new SpotifyWebApi({
  clientId: "fbae3b0191774f28a48d431355216faf",
});

function Home({ code }) {
  const accessToken = useAuth(code);
  const [search, setSearch] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [playingTrack, setPlayingTrack] = useState();
  const [userData, setUserData] = useState(null);
  const [categories, setCategories] = useState([]);
  const [categoryPlaylists, setCategoryPlaylist] = useState([]);
  const [playlists, setPlaylists] = useState([]);

  function chooseTrack(track) {
    setPlayingTrack(track);
    setSearch(" ");
  }

  // AccessToken
  useEffect(() => {
    if (!accessToken) return;
    spotifyApi.setAccessToken(accessToken);
  }, [accessToken]);

  // Search
  useEffect(() => {
    if (!search) return setSearchResults([]);
    if (!accessToken) return;
    let cancel = false;

    spotifyApi.searchTracks(search).then((res) => {
      if (cancel) return;
      console.log(res.body);
      setSearchResults(
        res.body.tracks.items.map((track) => {
          const smallestAlbumImage = track.album.images.reduce(
            (smallest, image) => {
              if (image.height < smallest.height) return image;
              return smallest;
            },
            track.album.images[0]
          );
          return {
            artist: track.artists[0].name,
            title: track.name,
            uri: track.uri,
            albumUrl: smallestAlbumImage.url,
          };
        })
      );
    });

    return () => {
      cancel = true;
    };
  }, [search, accessToken]);

  // Get Categories and Category Playlists
  useEffect(() => {
    if (!accessToken) return;
  
    setCategoryPlaylist([]); // Clear before adding new data
  
    spotifyApi.getCategories().then((res) => {
      const categories = res.body.categories.items;
  
      categories.forEach((category) => {
        fetch(`http://localhost:3001/v1/browse/categories/${category.id}`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ accessToken }),
        })
          .then((response) => response.json())
          .then((playlistRes) => {
            setCategoryPlaylist((prevPlaylist) => [
              ...prevPlaylist,
              {
                category: category.name,
                playlist: playlistRes,
              },
            ]);
          })
          .catch((err) => {
            console.error("Error fetching category playlists:", err);
          });
      });
    });
  }, [accessToken]);
  

  // User Data
  useEffect(() => {
    if (!accessToken) return;
    spotifyApi.getMe().then((res) => {
      setUserData(res.body);
      console.log(res.body);
      console.log("User Data");
    });
  }, [accessToken]);

  // User's Playlists
  useEffect(() => {
    if (!accessToken) return;

    spotifyApi.getUserPlaylists().then((res) => {
      const playlists = res.body.items;
      console.log("Fetched playlists from Spotify:", playlists); // Log the list of playlists

      playlists.forEach((playlist) => {
        fetch(`http://localhost:3001/v1/me/playlists/${playlist.id}`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ accessToken }),
        })
          .then((response) => response.json())
          .then((eachPlaylist) => {
            console.log("Fetched each playlist details:", eachPlaylist); // Log each fetched playlist details
            setPlaylists((prevPlaylists) => [
              ...prevPlaylists,
              {
                name: playlist.name,
                imageUrl: eachPlaylist.images[0].url,
                playlist: eachPlaylist,
              },
            ]);
          })
          .catch((e) => {
            console.error("Error fetching playlist:", e);
          });
      });
    });
  }, [accessToken]);

  return (
    <div className="home-container">
      <Header userData={userData} search={search} setSearch={setSearch} />
      <div className="content">
        <Library Playlists={playlists} />
        <div className="main-content">
          {searchResults.length > 0 ? (
            <div className="search-results-container">
              {searchResults.map((track) => (
                <TrackSearchResult
                  track={track}
                  key={track.uri}
                  chooseTrack={chooseTrack}
                />
              ))}
            </div>
          ) : (
            <div className="category-playlists-container">
              {categoryPlaylists.length > 0 ? (
                categoryPlaylists.map((category) => (
                  <CategoryPlaylists
                    key={category.category}
                    category={category}
                    playlists={category.playlists} // Passing playlists to CategoryPlaylists component
                  />
                ))
              ) : (
                <p>No categories available</p>
              )}
            </div>
          )}
        </div>
      </div>
      <Player accessToken={accessToken} trackUri={playingTrack?.uri} />
    </div>
  );
}

export default Home;
