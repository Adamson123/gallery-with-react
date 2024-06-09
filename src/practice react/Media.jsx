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
  } = props;

  const vidRef = useRef([]);

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

  const getFilePath = (event) => {
    const file = event.target.files[0];

    if (file) {
      const imgUrl = URL.createObjectURL(file);
      setMedia((a) => [
        ...a,
        {
          name: file.name,
          path: imgUrl,
          type: file.type.substring(0, file.type.indexOf("/")),
          size: Math.floor(file.size / 1024) + "kb",
          id: randomId(),
        },
      ]);

      setType((s) => (s = ""));
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

  // useEffect(() => {
  //   if (allVids.length > 0) {
  //     vidRef.current.forEach((v) => {
  //       console.log(v);
  //       v.pause();
  //     });
  //   }
  // }, [showType, allMedia]);
  return (
    <>
      <section className="text-white flex flex-col items-center mt-[170px]">
        <div className="flex w-[310px] md:w-[510px] flex-wrap mt-[35px]">
          {allMedia.map((p, index) => {
            return (
              <div
                key={index}
                onClick={() => {
                  setIndex((i) => (i = showType ? findIndex(p.id) : index));
                  setView((v) => (v = true));
                }}
                className={`${
                  showType && (p.type === showType ? "visible" : "hidden")
                } h-[100px] w-[100px] flex items-center  border-solid border-[0.7px] border-gray-600 m-[0.5px] cursor-pointer rounded`}
              >
                {p.type === "image" ? (
                  <img
                    src={p.path}
                    alt=""
                    className=" object-contain w-full h-full"
                  />
                ) : (
                  <video
                    src={p.path}
                    alt=""
                    className=" object-contain w-full h-full"
                    ref={(el) => (vidRef.current[index] = el)}
                  />
                )}
              </div>
            );
          })}
        </div>

        <div className=" overflow-hidden w-[50px] h-[50px] fixed cursor-pointer rounded-full border-2 border-solid bottom-[10%]">
          <span className="bi-plus text-3xl absolute pointer-events-none cursor-pointer flex items-center justify-center bg-black h-[50px] w-[50px] top-[50%] left-[50%] translate-x-[-50%]  translate-y-[-50%]"></span>
          <input
            type="file"
            onChange={getFilePath}
            className="w-[50px] h-[50px] rounded-full  bg-white cursor-pointer"
          />
        </div>
      </section>
    </>
  );
}

export default Media;
