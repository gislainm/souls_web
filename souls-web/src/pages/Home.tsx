import React from "react";
import Header from "../components/Header";
import HeroHome from "../components/HeroHome";
import FeaturesBlocks from "../components/FeaturesBlocks";
import FeaturesHome from "../components/Features";

function Home() {
  return (
    <div className="flex flex-col min-h-screen overflow-hidden">
      {/*  Site header */}
      <Header />

      {/*  Page content */}
      <main className="flex-grow">
        {/*  Page sections */}
        <HeroHome />
        <FeaturesHome />
        <FeaturesBlocks />

        {/* <FeaturesHome />
        <FeaturesBlocks />
        <Testimonials /> */}
        {/* <Newsletter />  */}
      </main>

      {/* <Banner /> */}

      {/*  Site footer */}
      {/* <Footer /> */}
    </div>
  );
}

export default Home;
