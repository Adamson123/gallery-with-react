import { useState } from "react";
import "./style.css";

function Header() {
  const [hide, setHide] = useState(false);

  const handleHide = () => {
    setHide((h) => (h = !h));
  };
  return (
    <header className="fixed bg-transparent text-white right-0 left-0 top-0 h-[3rem]">
      <div className="flex justify-between items-center h-full md:px-10 px-3">
        <div className="w-[350px]">
          <div
            className="w-[20px] h-[20px]  bg-gradient-to-tr from-white to-purple-600  border-3 border-solid
        border-pink-700 relative before:w-[10px] before:h-[10px] 
         before:absolute before:top-[5px] before:left-[5px]  after:w-[5px] after:h-[5px] after:bg-purple-950
         after:absolute after:top-[50%] after:translate-y-[-50%] bef"
          ></div>
        </div>

        <div className="flex-1 justify-between px-[40px] text-[13px] box-content hidden md:flex">
          <a href="#" className="mr-[10px]">
            About
          </a>
          <a href="#" className="mr-[10px]">
            Intergration
          </a>
          <a href="#" className="mr-[10px]">
            Pricing
          </a>
          <a href="#" className="mr-[10px]">
            Customers
          </a>
          <a href="#" className="mr-[10px]">
            Changelog
          </a>
        </div>

        <div className="flex text-[13px] justify-end text-nowrap items-center w-[350px]">
          <button className="font-bold px-5 py-1">Sign In</button>
          <button
            className="bg-purple-600 px-3 py-1 font-bold"
            style={{
              background: "#623e98",
            }}
          >
            Sign up
            <span className="bi-arrow-right ml-[3px] text-[10px]"></span>
          </button>
          <span
            onClick={handleHide}
            className={`${hide? "bi-x":"bi-list"} text-[25px] cursor-pointer font-bold ml-[10px] visible md:hidden`}
          ></span>
        </div>
      </div>

      <div
        className="flex  h-0 w-full  flex-col fixed md:hidden  items-center  bg-blue-700 box-border overflow-hidden"
        style={{
         
          background: "#123b68",
          width: hide && "100%",
          height: hide && "100%",
          bottom: hide && 0,
          top: hide && "50px",
          left: hide && 0,
          right: hide && 0,
          paddingTop: hide && "25px",
          transition: "all 0.3s",
        }}
      >
        <a href="#" className="pb-5">
          About
        </a>
        <a href="#" className="pb-5">
          Intergration
        </a>
        <a href="#" className="pb-5">
          Pricing
        </a>
        <a href="#" className="pb-5">
          Customers
        </a>
        <a href="#" className="pb-5">
          Changelog
        </a>
      </div>
    </header>
  );
}

export default Header;
