import HeroEffect from "../components/HeroEffect";
import { SmoothScrollProvider } from "../components/ScrollsmoothProdiver";

const page = () => {
 
  return (
    <>
      <SmoothScrollProvider/>
      <HeroEffect />
    </>
  );
};

export default page;
