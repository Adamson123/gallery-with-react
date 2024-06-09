import { useState, useEffect } from "react";

function Header(props) {
  const {
    allMedia,
    setMedia,
    showType,
    setType,
    allVids,
    allImgs,
    searchVal,
    setSearchVal,
    backupMedia,
    setBackUpMedia,
    setOnSelect,
    onSelect,
    countImgAndVid
  } = props;

  const [typing, setTyping] = useState(false);
  const [countChecked, setCountChecked] = useState(0);

  const storeMedia = () => {
    //storing the value of the arrays in backupMedia if the search bar is focused and empty
    if (searchVal === "") {
      setBackUpMedia((b) => (b = allMedia));
    }
  };

  const searchFilter = () => {
    //collecting filtering out media which names are related to the search
    const srchFilter = backupMedia.filter((a) => {
      if (a.name.toLowerCase().includes(searchVal.toLowerCase())) {
        // console.log("yes");
        return a;
      }
    });

    setMedia((s) => (s = srchFilter));

    //giving back the storedMedia(backupMedia) we stored earlier when the search bar empty
    if (searchVal === "") {
      setMedia((s) => (s = backupMedia));

      //stoping searchFilter from being invoked as we stopped typing
      setTyping((t) => (t = false));
    }
  };
  useEffect(() => {
    //making sure searchFilter is only being invoked when typing
    if (typing) {
      searchFilter();
    }
  }, [searchVal, backupMedia]);

  const handleSearchVal = (event) => {
    setSearchVal(event.target.value);
    //allowing searchFilter to be invoked as we are typing
    setTyping((t) => (t = true));
  };

  const filterOutCheckedMedia = (media) => {
    const checkedMedia = media.filter((m) => {
      if (!m.checked) return m;
    });

    return checkedMedia;
  };

  useEffect(() => {
    let count = 0;
    if (!searchVal) {
      //allmedia length minus media that are not checked will give us amount of checked media
      count = allMedia.length - filterOutCheckedMedia(allMedia).length;
    } else {
      //same here but but with backupMedia
      count = backupMedia.length - filterOutCheckedMedia(backupMedia).length;
    }
    setCountChecked((c) => (c = count));
  }, [allMedia, backupMedia, searchVal]);

  const deleteAllCheckedMedia = () => {
    let checkedMedia;
    if (!searchVal) {
      checkedMedia = filterOutCheckedMedia(allMedia);
      setMedia((a) => (a = checkedMedia));
    } else {
      checkedMedia = filterOutCheckedMedia(backupMedia);
      setBackUpMedia((a) => (a = checkedMedia));
    }
  };


  return (
    <header
      className="text-white fixed right-0 left-0 top-0 flex flex-col
     items-center p-[10px] bg-black z-10"
    >
      <div className="w-full h-[50px]  flex justify-center items-center">
        <div className="flex items-center  justify-center">
          {/* <span className="bi-search"></span> */}
          <input
            type="search"
            className="w-[200px] h-7 box-border p-2 text-black outline-none text-[12px] mr-[5px]"
            placeholder="Enter Name"
            value={searchVal}
            onInput={handleSearchVal}
            onFocus={storeMedia}
          />

          <button
            onClick={() => {
          
              setOnSelect((o) => (o = !o));
              const newMedia = allMedia.map((i) => {
                return { ...i, checked: false };
              });
              setMedia((a) => (a = newMedia));
              
            }}
            className={`text-[12px] ${
              onSelect ? "bg-yellow-500" : ""
            } border-2 font-bold px-[10px] py-[3px] mr-[5px]`}
          >
            <span className="bi-check2"></span>
            Multi-Select
            {/* number of checked note */}
            <span className={`${onSelect ? "visible" : "hidden"}`}>
              {" "}
              {countChecked}
            </span>
          </button>

          {/* delete all checked note */}
          <button
            onClick={deleteAllCheckedMedia}
            className={`bi-trash bg-red-500 ${
              countChecked ? "visible" : "hidden"
            } px-[3px] border-2`}
          ></button>
        </div>
      </div>
      <div className="text-center">
        <h1 className="text-3xl">
          <span className="bi-images"></span>Gallery
        </h1>
        <p className="text-[13px] mt-2">
          {/* show the amount of images and videos */}
          {countImgAndVid("image", searchVal ? backupMedia : allMedia).length} images -{" "}
          {countImgAndVid("video", searchVal ? backupMedia : allMedia).length} videos
        </p>
      </div>

      <div className="w-[110px] flex justify-between mt-[20px]">
        <button
          onClick={() => setType((s) => (s = s !== "image" ? "image" : ""))}
          className={`bi-image w-[40px] h-[40px] rounded-full 
          border-solid border-[2px] font-bold ${
            showType === "image" ? "bg-black" : "bg-sky-500"
          }`}
        ></button>
        <button
          onClick={() => setType((s) => (s = s !== "video" ? "video" : ""))}
          className={`bi-film w-[40px] h-[40px] rounded-full 
           border-solid border-[2px] font-bold  ${
             showType === "video" ? "bg-black" : "bg-pink-500"
           }`}
        ></button>
      </div>
    </header>
  );
}

export default Header;
