import { useState, useEffect } from "react";

function Header(props) {
  const { allMedia, setMedia, showType, setType, allVids, allImgs } = props;

  const [numOfImg, setNumOfImg] = useState(0);
  const [numOfVid, setNumOfVid] = useState(0);

  return (
    <header className="text-white fixed right-0 left-0 top-0 flex flex-col items-center p-[10px] bg-black z-10">
      <div className="text-center">
        <h1 className="text-4xl">
          <span className="bi-images"></span>Gallery
        </h1>
        <p className="text-[13px] mt-3">
          {allImgs.length} images - {allVids.length} videos
        </p>
      </div>

      <div className="w-[200px] flex justify-between mt-[50px]">
        <button
          onClick={() => setType((s) => (s = s !== "image" ? "image" : ""))}
          className={`bi-image py-[10px] px-[14px] rounded-full border-solid border-[2px] font-bold ${
            showType === "image" ? "bg-black" : "bg-sky-500"
          }`}
        ></button>
        <button
          onClick={() => setType((s) => (s = s !== "video" ? "video" : ""))}
          className={`bi-film py-[10px] px-[14px] rounded-full  bo  rder-solid border-[2px] font-bold  ${
            showType === "video" ? "bg-black" : "bg-pink-500"
          }`}
        ></button>
        <button className="bi-clock py-[10px] px-[14px] rounded-full border-solid border-[2px] font-bold bg-green-500"></button>
      </div>
    </header>
  );
}

export default Header;
