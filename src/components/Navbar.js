import React from "react";
import Popcorn from "../assets/icons8-popcorn-96.png";
import { Auth } from "aws-amplify";
import { navigate, Link } from "@reach/router";
import axios from "axios";

export default function Navbar({ setSignedIn }) {
  return (
    <div style={style.nav}>
      <div>
        <Link to="/home">
          <img src={Popcorn} alt="popcorn" />
        </Link>
      </div>
      <div>
        <Link to="/profile">
          <button>profile</button>
        </Link>
      </div>
      <div>
        <button
          onClick={() => {
            navigate("/allreviews");
          }}
        >
          reviews
        </button>
      </div>
      <div>
        <button
          onClick={() => {
            navigate("/myreviews");
          }}
        >
          my reviews
        </button>
      </div>
      <div>
        <button>following</button>
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
