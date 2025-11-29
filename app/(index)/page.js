import Findus from "../components/Findus";
import Fottor from "../components/Fottor";
import HeroEffect from "../components/HeroEffect";
import ImageSequence from "../components/ImageSequence";
import Sidewayscroll from "../components/Sidewayscroll";

const page = () => {
  return (
    <>
      <HeroEffect />
      <Sidewayscroll />
      <Findus />
      {/* <ImageSequence /> */}
      <Fottor />
    </>
  );
};

export default page;
