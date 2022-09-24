import React, { useEffect, useState } from "react";
import userimg from "../Images/user.png";
import "./Sidebar.css";
import "./Header.css";
import { useNavigate } from "react-router-dom";
import ContactList from "../ContactList/ContactList";

function Sidebar() {
  const [show, setshow] = useState([]);
  const [user, setuser] = useState("");
  const navigate = useNavigate();
  const handlelogout = () => {
    sessionStorage.removeItem("accessToken");
    navigate("/");
  };

  useEffect(() => {
    fetch("https://contactmanager-10x.herokuapp.com/contact/username", {
      method: "get",
      headers: {
        accessToken: sessionStorage.getItem("accessToken"),
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setuser(data.email);
      });
  }, []);

  const handleFilter = (e) => {
    const word = e.target.value;
    setshow(word);

  };

  return (
    <main>
      <div className="sidesection">
        <div className="content-container">
          <div className="h1-tag">
            <h1>Logo</h1>
          </div>
          <div className="dashboard">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="icon icon-tabler icon-tabler-layout-dashboard"
              width="28"
              height="28"
              viewBox="0 0 24 24"
              strokeWidth="2"
              stroke="currentColor"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
              <path d="M4 4h6v8h-6z"></path>
              <path d="M4 16h6v4h-6z"></path>
              <path d="M14 12h6v8h-6z"></path>
              <path d="M14 4h6v4h-6z"></path>
            </svg>
            <p>Dashboard</p>
          </div>
          <div className="total-contacts">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="icon icon-tabler icon-tabler-address-book"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              strokeWidth="2"
              stroke="white"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
              <path d="M20 6v12a2 2 0 0 1 -2 2h-10a2 2 0 0 1 -2 -2v-12a2 2 0 0 1 2 -2h10a2 2 0 0 1 2 2z"></path>
              <path d="M10 16h6"></path>
              <circle cx="13" cy="11" r="2"></circle>
              <path d="M4 8h3"></path>
              <path d="M4 12h3"></path>
              <path d="M4 16h3"></path>
            </svg>
            <p>Total contacts</p>
          </div>
        </div>
        <div className="logout-container">
          <div
            onClick={handlelogout}
            style={{ cursor: "pointer" }}
            className="logout"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="icon icon-tabler icon-tabler-logout"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              strokeWidth="2"
              stroke="currentColor"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
              <path d="M14 8v-2a2 2 0 0 0 -2 -2h-7a2 2 0 0 0 -2 2v12a2 2 0 0 0 2 2h7a2 2 0 0 0 2 -2v-2"></path>
              <path d="M7 12h14l-3 -3m0 6l3 -3"></path>
            </svg>
            <p>Log Out</p>
          </div>
        </div>
      </div>
      <div className="right_container">
        <header className="header_component">
          <div className="header_text">
            <p>Total Contacts</p>
          </div>
          <div className="second_cont">
            <div className="search_container">
              <p>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="icon icon-tabler icon-tabler-search"
                  width="17.49px"
                  height="17.49px"
                  viewBox="0 0 24 24"
                  strokeWidth="2"
                  stroke="currentColor"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                  <circle cx="10" cy="10" r="7"></circle>
                  <line x1="21" y1="21" x2="15" y2="15"></line>
                </svg>
              </p>
              <input
                type="text"
                onChange={handleFilter}
                placeholder="Search by Email Id....."
              />
            </div>
            { }
            <div className="user_container">
              <h1>
                <img src={userimg} alt="" />
              </h1>
              <div className="user_detail">
                <p >{user ? user.split("@")[0].toUpperCase() : " Ram Darvin"}</p>

                <p>Super Admin</p>
              </div>
            </div>
          </div>
        </header>
        <ContactList show={show} />
      </div>
    </main>
  );
}
export default Sidebar;
