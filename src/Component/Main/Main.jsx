import Advantages from "./Advantages/Advantages";
import Banner from "./Banner/Banner";
import BannerAd from "./BannerAd/BannerAd";
import BannerAs from "./BannerAs/BannerAs";
import BasedFunctional from "./BasedFunctional/BasedFunctional";
import Display from "./Display/Display";
import Modes from "./Modes/Modes";
import ProductPalette from "./ProductPalette/ProductPalette";
import Cartridge from "./Сartridge/Cartridge";

const Main = () => {
  return (
    <>
      <Banner />
      <ProductPalette />
      <BasedFunctional />
      <Modes />
      <BannerAd />
      <Display />
      <Advantages />
      <Cartridge />
      <BannerAs />
    </>
  );
};

export default Main;
