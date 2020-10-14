import React from 'react';
import uuid from 'uuid/dist/v4';
import { Storage } from 'aws-amplify';
import axios from 'axios';

export default function S3ImageUpload({ signedIn }) {
  const [filename, setFilename] = React.useState(undefined);
  async function updateProfilePic(profilePic) {
    try {
      const token = signedIn.signInUserSession.idToken.jwtToken;
      const resp = await axios.put(
        'https://7v0n195sii.execute-api.us-east-1.amazonaws.com/dev/update-pic',
        {
          token,
          profilePic,
        },
      );
      console.log('SUCCESS UPLOAD', resp);
    } catch (error) {
      console.log(error);
    }
  }

  function onClick() {
    // const file = e.target.files[0];
    const myUuid = uuid();
    Storage.put(`${signedIn.username}/profilePics/${myUuid}.png`, filename, {
      contentType: 'image/png',
    })
      .then((result) => {
        console.log(result);
        updateProfilePic(result.key);
      })
      .catch((err) => console.log(err));
  }

  function onChange(e) {
    setFilename(e.target.files[0]);
  }

  return (
    <>
      <input type="file" accept="image/png" onChange={(evt) => onChange(evt)} />
      <button onClick={onClick}>Upload</button>
    </>
  );
}
