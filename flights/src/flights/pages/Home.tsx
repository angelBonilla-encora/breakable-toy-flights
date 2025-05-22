import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { UserLayout } from "../../layouts/UserLayout";
import { SearchFlight } from "../components/SearchFlight";
import { responsive } from "../../ui/utils";

const images = [
  "1.png",
  "2.png",
  "3.png",
  "4.png",
  "5.png",
];

const Home = () => {
  return (
    <UserLayout>
      <div className="relative w-full h-screen">
        <Carousel
          responsive={responsive}
          infinite
          autoPlay
          autoPlaySpeed={5000}
          arrows={false}
          showDots={false}
          containerClass="w-full h-full"
          itemClass="h-full"
        >
          {images.map((src, i) => (
            <div
              key={i}
              className="w-full h-screen bg-no-repeat bg-center bg-cover"
              style={{ backgroundImage: `url(${src})` }}
            />
          ))}
        </Carousel>

        <div className="absolute inset-0 bg-black/50 pointer-events-none" />

        <div className="absolute inset-0 flex items-center justify-center z-20">
          <SearchFlight />
        </div>
      </div>
    </UserLayout>
  );
};

export default Home;
