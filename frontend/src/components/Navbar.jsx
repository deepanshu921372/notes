import React, { useState } from "react";
import SearchBar from "./SearchBar/SearchBar";
import ProfileInfo from "./Cards/ProfileInfo";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import {
  signInSuccess,
  signoutFailure,
  signoutStart,
} from "../redux/user/userSlice";
import axios from "axios";
import { useTheme } from "../context/ThemeContext";

const Navbar = ({ userInfo, onSearchNote, handleClearSearch }) => {
  const { toggleTheme, theme } = useTheme();
  const [searchQuery, setSearchQuery] = useState("");

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSearch = () => {
    if (searchQuery) {
      onSearchNote(searchQuery);
    }
  };

  const onClearSearch = () => {
    setSearchQuery("");
    handleClearSearch();
  };

  const onLogout = async () => {
    try {
      dispatch(signoutStart());

      const res = await axios.get("http://localhost:3000/api/auth/signout", {
        withCredentials: true,
      });

      if (res.data.success === false) {
        dispatch(signoutFailure(res.data.message));
        toast.error(res.data.message);
        return;
      }

      toast.success(res.data.message);
      dispatch(signInSuccess());
      navigate("/login");
    } catch (error) {
      toast.error(error.message);
      dispatch(signoutFailure(error.message));
    }
  };

  return (
    <div
      className={`flex items-center justify-between px-6 py-2 drop-shadow ${
        theme === "dark" ? "bg-gray-800 text-white" : "bg-white text-black"
      }`}
    >
      <Link to={"/"}>
        <h2 className={`text-xl font-medium  py-2`}>
          <span
            className={`text-slate-500 ${
              theme === "dark" ? "text-white" : "text-blue-600"
            }`}
          >
            Deep
          </span>
          <span
            className={`text-slate-800 ${
              theme === "dark" ? "text-yellow-400" : "text-slate-800"
            }`}
          >
            Notes
          </span>
        </h2>
      </Link>

      <SearchBar
        value={searchQuery}
        onChange={({ target }) => setSearchQuery(target.value)}
        handleSearch={handleSearch}
        onClearSearch={onClearSearch}
      />

      <label className="inline-flex items-center cursor-pointer">
        <input
          type="checkbox"
          value=""
          className="sr-only peer"
          onChange={toggleTheme}
          checked={theme === "dark"}
        />
        <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none  rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600 dark:peer-checked:bg-blue-600"></div>
        <span className="ms-3 text-sm font-medium">
          {theme === "dark" ? "Switch to Light" : "Switch to Dark"}
        </span>
      </label>

      <ProfileInfo userInfo={userInfo} onLogout={onLogout} />
    </div>
  );
};

export default Navbar;
