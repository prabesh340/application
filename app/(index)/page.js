import Findus from "../components/Findus";
import HeroEffect from "../components/HeroEffect";
import ImageSequence from "../components/ImageSequence";
import { SmoothScrollProvider } from "../components/ScrollsmoothProdiver";
import Sidewayscroll from "../components/Sidewayscroll";

const page = () => {
  return (
    <>
      <SmoothScrollProvider />
      <HeroEffect />
      <Sidewayscroll />
      <Findus />
    {/* <ImageSequence /> */}
    </>
  );
};

export default page;
