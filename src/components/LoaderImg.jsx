import loaderImg from "../assets/QuestionLoader.svg";

function LoaderImg() {
  return (
    <div className="flex justify-center items-center h-screen animate-[flash_1s_ease-in-out_infinite] px-16">
      <img src={loaderImg} alt="loader" />
    </div>
  );
}
export default LoaderImg;
