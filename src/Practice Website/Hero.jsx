import backgroundSvg from "./bg-svg.jsx";
function Hero() {
  return (
    <>
      <section
        className="bg-blue-200"
        style={{
          backgroundImage: `url('data:image/svg+xml;utf8,${encodeURIComponent(
            backgroundSvg
          )}')`,
          paddingBottom: "70px",
          backgroundRepeat:"repeat",
          
        }}
        >
        <div className="pt-[7rem]  flex flex-col text-white items-center md:px-[200px]">
          <button
            className=" border-2 border-purple-700 w-30 px-[35px] shadow mb-[25px]"
            style={{
              background: "#623e98",
              boxShadow: "0 0 50px 8px #043e87",
            }}
          >
            Menu illustrative Beta Launch{" "}
            <span className="bi-arrow-right"></span>
          </button>
          <h1
            className="text-[40px] md:text-5xl font-bold text-center md:w-[680px]"
            style={{
              color: "rgba(255,255,255,0.8)",
            }}
          >
            Experience seamless intergration with our robust API.
          </h1>
          <p className="text-center mt-5  md:w-[700px]">
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Natus
            molestias iure non ullam magnam aspernatur necessitatibus quidem
            voluptates iusto, tenetur nemo.
          </p>
          <div className="flex flex-col mt-7 md:flex-row justify-between items-center md:w-[530px]">
            <button
              className="bg-white text-black px-[90px] py-[3px] text-[14px]"
            
            >
              Get Started
            </button>
            <button
              className="text-white px-[90px] py-[3px] mt-3 md:mt-0"
              style={{
                background: "rgba(0,0,0,0.3)",
              }}
            >
              Read Doc
            </button>
          </div>
        </div>
      </section>
    </>
  );
}

//bg-gradient-to-bl from-purple-800  to-purple-300
export default Hero;
