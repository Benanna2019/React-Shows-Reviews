import React from "react";
import axios from "axios";
import S3ImageUpload from '../components/S3ImageUpload'

export default function ProfilePage({ signedIn }) {
  const [currentUser, setCurrentUser] = React.useState(undefined);
  const [profilePicUrl, setProfilePicUrl] = React.useState(undefined)
  React.useEffect(() => {
    (async function () {
      try {
        const token = signedIn.signInUserSession.idToken.jwtToken;
        const response = await axios.post("http://localhost:4000/get-user", {
          token,
        });
        setCurrentUser(response);
        const profilePic = await axios.post('http://localhost:4000/get-s3-pic', {
          token
        })
        console.log(profilePic)
        setProfilePicUrl(profilePic.data)
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);
  return (
    <div>
      <div>Profile Page</div>
      {profilePicUrl && <img src={profilePicUrl} width="400px" height="400px" alt="profilePic" style={{borderRadius: '100%', border: '5px solid black', objectFit: 'cover'}}/>}
      
      <form
        onSubmit={(e) => {
          e.preventDefault();
          const token = signedIn.signInUserSession.idToken.jwtToken;
          const aboutMe = e.target.elements.aboutMe.value;
          const profilePic = "";
          const age = e.target.elements.age.value;
          (async function () {
            try {
              await axios.put("http://localhost:4000/update-user", {
                token,
                aboutMe,
                profilePic,
                age,
              });
            } catch (error) {
              console.log(error);
            }
          })();
        }}
      >
        <div style={styles.profileCont}>
          <h3>{currentUser && currentUser.data.username}</h3>
          <input
            type="text"
            name="aboutMe"
            placeholder={currentUser && currentUser.data.aboutMe}
          ></input>
          <input
            type="text"
            name="age"
            placeholder={currentUser && currentUser.data.age}
          ></input>
          <button type="submit">Save</button>
        </div>
      </form>
      <S3ImageUpload signedIn={signedIn}/>
      
    </div>
  );
}

const styles = {
  profileCont: {
    display: 'flex',
    flexDirection: 'column',
    width: '50vw'
  }
}
