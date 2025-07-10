import CategorySection from "../components/Home/CategorySection";
import FAQSection from "../components/Home/FAQSection";
import HeroSection from "../components/Home/HeroSection";
import SplitSection from "../components/Home/SplitSection";
import TrendingBooks from "../components/Home/TrendingBooks";

export default function Home() {
  return (
    <>
      <HeroSection />
      <TrendingBooks />
      <CategorySection />
      <SplitSection />
      <FAQSection />
    </>
  );
}
