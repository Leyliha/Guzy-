import React from "react";
import "./topbar.css";
import { NotificationsNone, Language, Settings } from "@material-ui/icons";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useNavigate } from 'react-router-dom'
import { loggingOut } from "../../redux/apiCalls";

export default function Topbar({admin}) {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const LogOuting = () =>{
    loggingOut(dispatch)
    navigate('/')
  }
  return (
    <div className="topbar">
      <div className="topbarWrapper">
        <div className="topLeft">
          <Link to='/' className="logo">Turkmen Food Admin Panel</Link>
        </div>
        <div className="topRight">
          {/* <div className="topbarIconContainer">
            <NotificationsNone />
            <span className="topIconBadge"></span>
          </div>
          <div className="topbarIconContainer">
            <Language />
            <span className="topIconBadge"></span>
          </div>
          <div className="topbarIconContainer">
            <Settings />
          </div>
          <img src="https://crowd-literature.eu/wp-content/uploads/2015/01/no-avatar.gif" alt="" className="topAvatar" /> */}
          {!admin ? <Link to="/login">Log In</Link> : <button onClick={LogOuting} className="nobr-bttn">Log Out</button>}
        </div>
      </div>
    </div>
  );
}
