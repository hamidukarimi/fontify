import React from "react";
import { FaBars, FaBeer } from "react-icons/fa"; // FontAwesome icon
import { MdAlarm } from "react-icons/md"; // Material Design icon

const Header = () => {
  return (
    <div className="bg-transparent text-white flex items-center justify-between px-4 py-3 text-xl">
      <img src="./fontify.svg" alt="" />
      <FaBars />
    </div>
  );
};

export default Header;
