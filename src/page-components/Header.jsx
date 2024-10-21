function Header({userData}){

  return( 
      <div>
          {userData ?(
            <div>
              <img src={userData.images[0].url} alt="tada" width="100" />
              <p>Welcome, {userData.display_name} !</p>
              </div>
          ) : (
            <p>Loading UserData...</p>
          )}
      </div>
  )
}

export default Header