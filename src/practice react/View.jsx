import { useEffect, useState } from "react";
import { useRef } from "react";
function View(props) {
  const testImage = "src/practice react/images/ronaldo.png";

  const {
    showView,
    setView,
    index,
    setIndex,
    allMedia,
    showType,
    allImgs,
    allVids,
  } = props;
  const imageRef = useRef(null);
  let timeRef = useRef(null);
  const [slideBtn, setSlideBtn] = useState(false);

  const ascendRight = () => {
    if (index < filterView("length").length - 1) {
      slideImageAsc();
    }
  };

  const descendLeft = () => {
    if (index > 0) {
      slideImageDes();
    }
  };

  const slideImageAsc = () => {
    imageRef.current.classList.add("slidePicAsc");
    clearTimeout(timeRef);
    timeRef = setTimeout(() => {
      imageRef.current.classList.remove("slidePicAsc");

      setIndex((i) => i + 1);
    }, 400);
  };

  const slideImageDes = () => {
    imageRef.current.classList.add("slidePicDes");

    clearTimeout(timeRef);
    timeRef = setTimeout(() => {
      imageRef.current.classList.remove("slidePicDes");

      setIndex((i) => i - 1);
    }, 400);
  };

  const filterView = (purp) => {
    //get a particular index in the right array

    if (purp) {
      //may be if i want to get the array lenght or anything
      if (showType === "video") {
        return allVids;
      } else if (showType === "image") {
        return allImgs;
      } else {
        return allMedia;
      }
    } else {
        //get a particular value in this index in the right array
      if (showType === "video") {
        return allVids[index];
      } else if (showType === "image") {
        return allImgs[index];
      } else {
        return allMedia[index];
      }
    }
  };

  useEffect(() =>{
    console.log(showView);
  },[showView])
  return (
    <section
      className={`bg-black fixed top-0 right-0 bottom-0 left-0 z-20 flex-col items-center text-white ${
        showView ? "flex" : "hidden"
      }`}
    >
      <div className="fixed right-0 left-0 top-0 h-[50px] flex items-center font-bold text-white justify-between px-3">
        <button
          onClick={() => {
            setView((v) => (v = false));

            if (filterView().type === "video") {
              imageRef.current.pause();
            }
            setIndex((i) => (i = 0));
          }}
          className="bi-chevron-left"
        ></button>

        <button className="bi-phone-landscape"></button>
      </div>
      <div
        className="mt-[45px] w-full md:w-[500px] md:h-[500px] relative"
        style={{
          height: "calc(100% - 100px)",
        }}
        onMouseOver={() => setSlideBtn((s) => (s = true))}
        onMouseOut={() => setSlideBtn((s) => (s = false))}
      >
        <button
          onClick={descendLeft}
          className={` ${slideBtn === true ? "opacity-1" : "opacity-0"} ${
            index ? "visible" : "hidden"
          } slideBtn  absolute top-1/2 left-[20px] h-[50px] w-[50px] rounded-full z-10 bg-black bi-arrow-left  border-2`}
        ></button>

        {
        filterView('length').length && showView && // run this 👇 if the length of the array is > 0
            (filterView().type === "image" ? (
              <img
                src={filterView().path}
                ref={imageRef}
                className="imageView w-full h-full object-contain"
              />
              
            ) : (
              <video
                src={filterView().path}
                ref={imageRef}
                className={`imageView w-full h-full object-contain`}
                controls
                autoPlay
                
                />
            ))
       
        }

        <button
          onClick={ascendRight}
          className={`${slideBtn === true ? "opacity-1" : "opacity-0"}  ${
            index < filterView('length').length - 1 ? "visible" : "hidden"
          } slideBtn  absolute z-10 top-1/2 right-[20px] h-[50px] w-[50px] rounded-full bg-black bi-arrow-right  border-2`}
        ></button>
      </div>

      <div className=" bg-black fixed bottom-0 left-0 right-0 h-[50px]  flex items-center justify-center font-bold">
        <button className="bi-trash"></button>
      </div>
    </section>
  );
}

export default View;
