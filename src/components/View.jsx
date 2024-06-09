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
    setMedia,
    showType,
    allImgs,
    allVids,
    filterView,
    backupMedia,
    setBackUpMedia,
    searchVal,
  } = props;
  const imageRef = useRef(null);
  let timeRef = useRef(null);
  const infoRef = useRef("");
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

  const deleteMedia = (ID) => {
    const filteredMedia = allMedia.filter((a) => a.id !== ID);
    setMedia((a) => (a = filteredMedia));

    if (searchVal) {
      const filteredMedia = backupMedia.filter((a) => a.id !== ID);
      setBackUpMedia((a) => (a = filteredMedia));
    }
  };

  const openInfo = () => {
    infoRef.current.classList.toggle("hidden");
  };

  useEffect(() => {
    console.log(showView);
  }, [showView]);

  return (
    <section
      className={`bg-black fixed top-0 right-0 bottom-0 left-0 z-20 
      flex-col flex items-center text-white ${
        showView ? "scale-1" : "scale-0"
      }`}
      style={{
        transition: "transform 0.2s",
      }}
    >
      <div
        className="fixed right-0 left-0 top-0 h-[50px] flex items-center 
      font-bold text-white justify-between px-3"
      >
        <button
          /* hide  View by setting showView to false and pause currently playing video if the file type is video*/
          onClick={() => {
            setView((v) => (v = false));

            if (filterView().type === "video") {
              imageRef.current.pause();
            }
            infoRef.current.classList.add("hidden");
          }}
          className="bi-arrows-collapse"
        ></button>

        <button
          onClick={openInfo}
          className="bi-info border w-[25px] h-[25px]
         rounded-full flex items-center justify-center"
        ></button>
      </div>
      <div
        className="mt-[45px] w-full md:w-[500px] md:h-[500px] relative flex flex-col"
        style={{
          height: "calc(100% - 100px)",
        }}
        //hide  the scroll btns if the mouse is of the screen else make it visible
        onMouseOver={() => setSlideBtn((s) => (s = true))}
        onMouseOut={() => setSlideBtn((s) => (s = false))}
      >
        <button
          onClick={descendLeft}
          /* DescendBtn */
          // 1.hide if false and show if true according to the code up☝ there (same goes for the ascending btn)
          //2. also hide this btn if the index is not > 0
          className={` ${slideBtn === true ? "opacity-1" : "opacity-0"} 
          ${
            index ? "visible" : "hidden"
          } slideBtn  absolute top-1/2 left-[20px] h-[50px] w-[50px] 
          rounded-full z-10 bg-black bi-arrow-left  border-2`}
        ></button>

        {filterView("length").length &&
          showView && // run this 👇 if the length of the array is > 0
          //render the file by a image element if the type is image else render by a video element
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
          ))}

        {/* AscendBtn */}
        {/* show btn as long as the index is less than the particular media array else hide */}
        <button
          onClick={ascendRight}
          className={`${slideBtn === true ? "opacity-1" : "opacity-0"}  ${
            index < filterView("length").length - 1 ? "visible" : "hidden"
          } slideBtn  absolute z-10 top-1/2 right-[20px] h-[50px] w-[50px] 
          rounded-full bg-black bi-arrow-right  border-2`}
        ></button>

        <div
          ref={infoRef}
          className="hidden h-[30%]  text-[10px] p-[7px] rounded bg-[rgba(0,0,0,0.7)]
         absolute bottom-0 left-0 right-0"
        >
          <div
            className="w-full h-[25px] text-center border-b
           border-[rgba(255,255,255,0.3)] mb-2
            font-bold box-border pt-[3px] text-[12px]"
          >
            Info
          </div>
          {filterView() && (
            <>
              <p> Date : {filterView().date}</p>
              <p> Name : {filterView().name}</p>
              <p> Type : {filterView().type}</p>
              <p> Format : {filterView().format}</p>
              <p> Size : {filterView().size}</p>
              <p> Url : {filterView().path}</p>
            </>
          )}
        </div>

        {/* end of image view div */}
      </div>

      <div
        className=" bg-black fixed bottom-0 left-0 right-0 h-[50px] 
       flex items-center justify-center font-bold"
      >
        {/* delete media using id cause it's more concise and we can delete
         from allMedia througn any array(both allImgs and allVids)*/}
        <button
          onClick={() => {
            deleteMedia(filterView().id);
            setView((s) => (s = false));
          }}
          className="bi-trash"
        ></button>
      </div>
    </section>
  );
}

export default View;
