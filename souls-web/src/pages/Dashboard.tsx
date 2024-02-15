import React from "react";
import HeroHome from "../components/HeroHome";
import FeaturesHome from "../components/Features";

function Dashboard() {
  return (
    <main className="flex-grow">
      {/*  Page sections */}
      <HeroHome />
      <FeaturesHome />
    </main>
  );
}

export default Dashboard;
