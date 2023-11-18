import React, { useEffect, useRef, useState } from "react";
import { HiAdjustmentsHorizontal } from "react-icons/hi2";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import "./Navbar.css";

function Navbar() {
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  const toggleDropdown = () => {
    setDropdownOpen(!isDropdownOpen);
  };

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setDropdownOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  return (
    <div className="navbar_container">
      <div className="dropdown-container" ref={dropdownRef}>
        <button
          className="display_btn"
          id="optionsButton"
          onClick={toggleDropdown}
        >
          <HiAdjustmentsHorizontal />
          Display
          {/* {isDropdownOpen ? <IoIosArrowUp/>:<IoIosArrowDown />}  */}
          <IoIosArrowDown className={`downarrow ${isDropdownOpen ? "open" : ""}`}/>
        </button>
        <div className={`dropdown-content ${isDropdownOpen ? "open" : ""}`}>
          <div className="DropdownGroups">
            <span>Grouping</span>
            <select
              className="Groupstyle"
            >
              <option value="status">Status</option>
              <option value="user">User</option>
              <option value="priority">Priority</option>
            </select>
          </div>

          <div className="DropdownGroups">
            <span>Ordering</span>
            <select           
              className="Groupstyle"
              name="order"
              id="order"
            >
              <option value="priority">Priority</option>
              <option value="title">Title</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
