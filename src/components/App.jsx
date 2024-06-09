import { useState, useEffect } from "react";
import Header from "./Header.jsx";
import Media from "./Media.jsx";
import View from "./View.jsx";

function App() {
  document.body.style.background = "#000";

  const [allMedia, setMedia] = useState([]);
  const [showView, setView] = useState(false);
  const [index, setIndex] = useState(0);
  const [showType, setType] = useState("");
  const [searchVal, setSearchVal] = useState("");
  const [backupMedia, setBackUpMedia] = useState([]);
  const [onSelect, setOnSelect] = useState(false);

  let [allImgs, setImgs] = useState([]);
  let [allVids, setVids] = useState([]);

  const countImgAndVid = (type, media) => {
    const getCertainMedia = media.filter((m) => m.type === type);

    return getCertainMedia;
  };

  useEffect(() => {
    const newAllImgs = countImgAndVid("image", allMedia);

    setImgs((i) => (i = newAllImgs));

    /////////////////////////////////

    const newAllVids = countImgAndVid("video", allMedia);
    setVids((v) => (v = newAllVids));
  }, [allMedia]);

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

  return (
    <>
      <Header
        allMedia={allMedia}
        setMedia={setMedia}
        showType={showType}
        setType={setType}
        allVids={allVids}
        allImgs={allImgs}
        searchVal={searchVal}
        setSearchVal={setSearchVal}
        backupMedia={backupMedia}
        setBackUpMedia={setBackUpMedia}
        setOnSelect={setOnSelect}
        onSelect={onSelect}
        countImgAndVid={countImgAndVid}
      />
      <Media
        showView={showView}
        setView={setView}
        allMedia={allMedia}
        setMedia={setMedia}
        index={index}
        setIndex={setIndex}
        showType={showType}
        setType={setType}
        allImgs={allImgs}
        allVids={allVids}
        filterView={filterView}
        searchVal={searchVal}
        setSearchVal={setSearchVal}
        backupMedia={backupMedia}
        setBackUpMedia={setBackUpMedia}
        onSelect={onSelect}
      />
      <View
        showView={showView}
        setView={setView}
        index={index}
        setIndex={setIndex}
        allMedia={allMedia}
        setMedia={setMedia}
        allImgs={allImgs}
        allVids={allVids}
        showType={showType}
        filterView={filterView}
        backupMedia={backupMedia}
        setBackUpMedia={setBackUpMedia}
        searchVal={searchVal}
      />
    </>
  );
}

export default App;
