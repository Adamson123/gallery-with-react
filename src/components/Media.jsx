import { useState, useEffect, useRef } from "react";

function Media(props) {
  const {
    showView,
    setView,
    allMedia,
    setMedia,
    index,
    setIndex,
    showType,
    setType,
    allImgs,
    allVids,
    filterView,
    searchVal,
    setSearchVal,
    backupMedia,
    setBackUpMedia,
    onSelect,
  } = props;

  const uploadRef = useRef("");

  const randomId = () => {
    const charset =
      "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWSUZ1234567890";

    let getRL = "";
    for (let i = 0; i < 9; i++) {
      const randomNum = Math.floor(Math.random() * charset.length);
      getRL += charset.charAt(randomNum);
    }

    return getRL;
  };

  const dateFileWasAdded = () => {
    const months = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "jun",
      "jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];

    const date = new Date();

    const month = months[date.getMonth()];
    const day = date.getDate();
    const year = date.getFullYear();
    const hour = date.getHours();
    const minute = date.getMinutes();
    const meridian = hour > 12 ? "PM" : "AM";

    //getting 12-hour format
    //if hour > 12 minus it by 12 example : 13 - 12 = 1 (1'o clock) else assign the raw hour
    let twHourFromat = hour > 12 ? hour - 12 : hour;
    if (twHourFromat === 0) {
      twHourFromat = 12;
    }
    const zeroPaddedMinute = minute <= 9 ? "0" + minute : minute;

    return `${month} ${day}, ${year} ${twHourFromat}:${zeroPaddedMinute} ${meridian}`;
  };

  const getFilePath = (event) => {
    const file = event.target.files[0];
    const fileType = file.type.substring(0, file.type.indexOf("/"));
    if (file && (fileType === "image" || fileType === "video")) {
      const imgUrl = URL.createObjectURL(file);
      setMedia((a) => [
        ...a,
        {
          name: file.name,
          path: imgUrl,
          type: fileType,
          format: file.type.substring(file.type.indexOf("/") + 1),
          size: (file.size / 1024).toFixed(2) + "kb",
          id: randomId(),
          checked: false,
          date: dateFileWasAdded(),
        },
      ]);

      if (searchVal) {
        setBackUpMedia((a) => [
          ...a,
          {
            name: file.name,
            path: imgUrl,
            type: file.type.substring(0, file.type.indexOf("/")),
            size: (file.size / 1024).toFixed(2) + "kb",
            id: randomId(),
            checked: false,
          },
        ]);
        setSearchVal((s) => (s = ""));
      }

      setType((s) => (s = ""));

      //clear the input value so that user can upload the same file two times
      uploadRef.current.value = "";
    }
  };

  //finding the index of the media through id
  const findIndex = (ID) => {
    const mediaArr = showType === "video" ? allVids : allImgs;
    for (let i = 0; i < mediaArr.length; i++) {
      if (mediaArr[i].id === ID) {
        console.log("index =", i);
        return i;
      }
    }
  };

  const noMediaFound = () => {
    return (
      <div
        className={`${filterView("length").length > 0 ? "hidden" : "visible"}`}
      >
        No{" "}
        {showType
          ? showType[0].toUpperCase() +
            showType.substring(1, showType.length) +
            "s"
          : "Images & Videos"}{" "}
        Were Found
      </div>
    );
  };

  const selectMedia = (ID) => {
    if (searchVal) {
      const newBackUpMedia = backupMedia.map((a) => {
        if (a.id === ID) {
          return { ...a, checked: !a.checked };
        } else {
          return a;
        }
      });
      setBackUpMedia((a) => (a = newBackUpMedia));
    } else {
      const newMedia = allMedia.map((a) => {
        if (a.id === ID) {
          return { ...a, checked: !a.checked };
        } else {
          return a;
        }
      });
      setMedia((a) => (a = newMedia));
    }
  };

  return (
    <>
      <section className="text-white flex flex-col items-center mt-[170px]">
        <div className="flex w-[310px] md:w-[510px] flex-wrap mt-[35px] ">
          {allMedia.map((p, index) => {
            return (
              <div
                key={index}
                onClick={() => {
                  //open view if we are not muti-selecting
                  if (!onSelect) {
                    //setting index according to the file type for concise scrolling when viewed
                    setIndex((i) => (i = showType ? findIndex(p.id) : index));
                    // open view
                    setView((v) => (v = true));
                  } else {
                    selectMedia(p.id);
                  }
                }}
                className={`${
                  //hide if the file type does'nt mathes the specified file type to be shown esle show it
                  showType && (p.type === showType ? "visible" : "hidden")
                } mediaDiv h-[100px] w-[100px] flex items-center relative border-solid border-[0.7px] 
                border-gray-600 m-[0.5px] cursor-pointer rounded`}
              >
                <div
                  className={`
                  mediaHover
                   ${
                    onSelect ? "hidden" : "visible"
                  } 
                  absolute top-0 
                  bottom-0
                  right-0
                  left-0
                  bg-[rgba(0,0,0,0.7)] 
                  flex items-center
                  justify-center opacity-0`}
                >
                  <span className="bi-arrows-expand"></span>
                </div>
                <span
                  className={`${
                    onSelect &&
                    (p.checked ? "bi-check-circle-fill" : " bi-circle")
                  } absolute top-[2px] left-[5px] text-gray-600 font-bold`}
                ></span>
                {/* return a image element if the file type is image else return a video element */}
                {p.type === "image" ? (
                  <img
                    src={p.path}
                    alt=""
                    className=" object-cover w-full h-full"
                  />
                ) : (
                  <video
                    src={p.path}
                    alt=""
                    className=" object-contain w-full h-full"
                    // ref={(el) => (vidRef.current[index] = el)}
                  />
                )}
              </div>
            );
          })}
        </div>

        {/* show this if you can't find a type of a media(vid & img) or if there is no media found*/}
        {noMediaFound()}

        <div className=" overflow-hidden w-[50px] h-[50px] fixed cursor-pointer rounded-full border-2 border-solid bottom-[10%]">
          <span className="bi-plus text-3xl absolute pointer-events-none cursor-pointer flex items-center justify-center bg-black h-[50px] w-[50px] top-[50%] left-[50%] translate-x-[-50%]  translate-y-[-50%]"></span>
          <input
            type="file"
            onChange={getFilePath}
            className="w-[50px] h-[50px] rounded-full  bg-white cursor-pointer"
            ref={uploadRef}
            // multiple
          />
        </div>
      </section>
    </>
  );
}

export default Media;
