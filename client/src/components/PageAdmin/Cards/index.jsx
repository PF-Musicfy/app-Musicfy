import React from "react";
import CardUser from "../CardUser";

const Cards = ({ users }) => {
  return (
    <div className="cont">
      {users?.map((e) => {
        return (
          <CardUser
            id={e._id}
            username={e.username}
            email={e.email}
            premium={e.premium === false ? "Free" : "Premium"}
            status={e.admin}
            key={e._id}
          />
        );
      })}
    </div>
  );
};

export default Cards;
