import React from "react";
import { Link } from "react-router-dom";
import user from "../images/user.png";

const ContactCard = (props) => {
  const { id, name, email } = props.contact;

  const handleDelete = () => {
    const shouldDelete = window.confirm("Are you sure you want to delete this contact?");
    if (shouldDelete) {
      props.clickHandler(id);
    }
  };

  return (
    <div className="item">
      <img className="ui avatar image" src={user} alt="user" />
      <div className="content">
        <Link to={{ pathname: `/contact/${id}`, state: { contact: props.contact } }}>
          {/* For loading the user profile upon clicking the link */}
          <div className="header">{name}</div>
          <div>{email}</div>
        </Link>
      </div>
      <i
        className="trash alternate outline icon"
        style={{ color: "red", marginTop: "7px", marginLeft: "10px" }}
        onClick={() => handleDelete()}
      ></i>

    </div>
  );
};

export default ContactCard;
