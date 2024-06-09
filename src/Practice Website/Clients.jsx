import { useState } from "react";
import { useRef } from "react";
import { useEffect } from "react";

function Clients() {
  const path = "src/Practice Website/sw-assets/client-01.svg";
  const imgRef = useRef(null);

  const [allImages, setImages] = useState([]);
  const [scroll, setHide] = useState(0);

  const clientImages = () => {
    for (let i = 1; i < 9; i++) {
      const imPath = `src/Practice Website/sw-assets/client-0${i}.svg`;
      setImages((a) => a.concat(imPath));
    }
  };

  useEffect(() => {
    clientImages();
  }, []);

  return (
    <div className="flex w-full justify-between bg-black h-[100px] items-center overflow-hidden">
      {allImages.map((a, index) => {
        return (
          <img
            key={index}
            ref={imgRef}
            src={a}
            className="px-5 scrollAnim mr-5"
          />
        );
      })}
    </div>
  );
}

export default Clients;
