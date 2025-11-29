import HeroEffect from "../components/HeroEffect";
import { SmoothScrollProvider } from "../components/ScrollsmoothProdiver";
import Sidewayscroll from "../components/Sidewayscroll";

const page = () => {
 
  return (
    <>
      <SmoothScrollProvider/>
      <HeroEffect />
      <Sidewayscroll />
      <div className="h-screen w-full bg-amber-600"></div>
    </>
  );
};

export default page;
