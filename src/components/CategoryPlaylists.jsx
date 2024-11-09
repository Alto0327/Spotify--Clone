const CategoryPlaylists = ({ category }) => {
    console.log("Rendering CategoryPlaylists:", category);
    if (!category || !category.playlist || !Array.isArray(category.playlist)) {
      return <div>Loading...</div>;
    }
  
    return (
      <div>
        <h1>{category.category}</h1>
        <div className="playlists">
          {category.playlist.map((playlist) => (
            <div key={playlist.uri}>
                <img src={playlist.images[0].url} alt="" />
            </div>
          ))}
        </div>
      </div>
    );
  };

  export default CategoryPlaylists