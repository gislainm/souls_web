import React from "react";
// import HeroImage from "../images/hero-image.png";
import { Link, Button } from "@chakra-ui/react";
import { SiPowerautomate } from "react-icons/si";
import { Link as RouterLink } from "react-router-dom";
import home1 from "../images/home-page-1.png";

function HeroHome() {
  return (
    <section className="relative">
      {/* Illustration behind hero content */}
      <div
        className="absolute left-1/2 transform -translate-x-1/2 bottom-0 pointer-events-none"
        aria-hidden="true"
      >
        <svg
          width="1360"
          height="578"
          viewBox="0 0 1360 578"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <linearGradient
              x1="50%"
              y1="0%"
              x2="50%"
              y2="100%"
              id="illustration-01"
            >
              <stop stopColor="#FFF" offset="0%" />
              <stop stopColor="#EAEAEA" offset="77.402%" />
              <stop stopColor="#DFDFDF" offset="100%" />
            </linearGradient>
          </defs>
          <g fill="url(#illustration-01)" fillRule="evenodd">
            <circle cx="1232" cy="128" r="128" />
            <circle cx="155" cy="443" r="64" />
          </g>
        </svg>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Hero content */}
        <div className="pt-32 pb-12 md:pt-40 md:pb-20">
          {/* Section header */}
          <div className="text-center pb-12 md:pb-16">
            <h1
              className="text-4xl md:text-5xl font-extrabold leading-tighter tracking-tighter mb-4"
              data-aos="zoom-y-out"
            >
              Effortless Attendance Management for{" "}
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#95A0A0] from-15% via-[#323232] via-45% to-[#115554] to-10%">
                Small Groups
              </span>
            </h1>
            <div className="max-w-3xl mx-auto">
              <p
                className="text-xl text-gray-600 mb-8"
                data-aos="zoom-y-out"
                data-aos-delay="150"
              >
                Say goodbye to the hassle of manual record-keeping and hello to
                streamlined organization with our intuitive platform. Ready to
                simplify your groups management?{" "}
                <span className="font-bold text-[#008C95]">
                  Get started today!
                </span>
              </p>
              <div
                className="max-w-xs mx-auto sm:max-w-none sm:flex sm:justify-center"
                data-aos="zoom-y-out"
                data-aos-delay="300"
              >
                <Link
                  as={RouterLink}
                  to="/register"
                  className="rounded-lg text-gray-200 bg-gray-900 hover:bg-gray-800 ml-3"
                >
                  <Button
                    variant="start"
                    rightIcon={<SiPowerautomate />}
                    as="span"
                  >
                    Get Started
                  </Button>
                </Link>
              </div>
            </div>
          </div>

          {/* Hero image */}
          <div>
            <div
              className="relative flex justify-center mb-8"
              data-aos="zoom-y-out"
              data-aos-delay="450"
            >
              <div className="flex flex-col justify-center">
                <img
                  className="mx-auto"
                  src={home1}
                  //   width="768"
                  //   height="432"
                  alt="homepicture"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default HeroHome;
