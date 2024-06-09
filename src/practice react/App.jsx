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

  let [allImgs, setImgs] = useState([]);
  let [allVids, setVids] = useState([]);

  useEffect(() => {
    allImgs = allMedia.filter((a) => a.type !== "video");
    setImgs((a) => (a = allImgs));

    /////////////////////////////////

    allVids = allMedia.filter((a) => a.type !== "image");
    setVids((a) => (a = allVids));
  }, [allMedia]);

  return (
    <>
      <Header
        allMedia={allMedia}
        setMedia={setMedia}
        showType={showType}
        setType={setType}
        allVids={allVids}
        allImgs={allImgs}
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
        allImgs ={allImgs}
        allVids = {allVids}
      />
      <View
        showView={showView}
        setView={setView}
        index={index}
        setIndex={setIndex}
        allMedia={allMedia}
        allImgs ={allImgs}
        allVids = {allVids}
        showType ={showType}
      />
    </>
  );
}

export default App;
