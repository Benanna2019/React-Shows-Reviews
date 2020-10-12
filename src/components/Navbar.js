import React from "react";
import Popcorn from "../assets/icons8-popcorn-96.png";
import { Auth } from "aws-amplify";
import { navigate } from "@reach/router";

export default function Navbar({ setSignedIn }) {
  return (
    <div style={style.nav}>
      <div>
        <img src={Popcorn} alt="popcorn" />
      </div>
      <div>
        <button>profile</button>
      </div>
      <div>
        <button>reviews</button>
      </div>
      <div>
        <button>maybe another</button>
      </div>
      <div>
        <button
          onClick={() => {
            (async function () {
              try {
                await Auth.signOut({ global: true });
                setSignedIn(undefined);
                navigate("/");
              } catch (error) {
                console.log(error);
              }
            })();
          }}
        >
          sign out
        </button>
      </div>
    </div>
  );
}

const style = {
  nav: {
    display: "flex",
    justifyContent: "space-evenly",
    height: "200px",
    backgroundColor: "",
  },
};
