import loaderImg from "../assets/QuestionLoader.png";

function LoaderImg() {
  return (
    <div className="flex justify-center items-center h-screen animate-[flash_0.8s_ease-in-out_infinite] px-16">
      <img src={loaderImg} alt="Riddle Me" />
    </div>
  );
}
export default LoaderImg;
