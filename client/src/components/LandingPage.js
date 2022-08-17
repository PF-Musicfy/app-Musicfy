import React from "react";

export default function LandingPage() {
  return (
    <div className="LandingPage">
      <div>
        <h1 className="Title">Find your music</h1>
        <h4>Listen your favorites songs for the best price </h4>
      </div>
      <Link to="/Home">
        <button className="Landingbutton">Open Player</button>
      </Link>
    </div>
  );
}
