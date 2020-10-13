import React from "react";
import axios from "axios";

export default function ProfilePage({ signedIn }) {
  const [currentUser, setCurrentUser] = React.useState(undefined);
  React.useEffect(() => {
    (async function () {
      try {
        const token = signedIn.signInUserSession.idToken.jwtToken;
        const response = await axios.post("http://localhost:4000/get-user", {
          token,
        });
        setCurrentUser(response);
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);
  console.log(currentUser);
  return (
    <div>
      <div>Profile Page</div>
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
        <h3>{currentUser && currentUser.data.username}</h3>
        <input type="file"></input>
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
      </form>
    </div>
  );
}
