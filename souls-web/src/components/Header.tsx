import React, { useState, useEffect } from "react";

import { Link as RouterLink } from "react-router-dom";
import { Link, Button,Image } from "@chakra-ui/react";
import { FaArrowRightLong } from "react-icons/fa6";
import LogoCircle from '../images/logo-circle.png'

function Header() {
  const [top, setTop] = useState(true);

  // detect whether user has scrolled the page down by 10px
  useEffect(() => {
    const scrollHandler = () => {
      window.scrollY > 10 ? setTop(false) : setTop(true);
    };
    window.addEventListener("scroll", scrollHandler);
    return () => window.removeEventListener("scroll", scrollHandler);
  }, [top]);

  return (
    <header
      className={`fixed w-full z-30 md:bg-opacity-90 transition duration-300 ease-in-out ${
        !top && "bg-white backdrop-blur-sm shadow-lg"
      }`}
    >
      <div className="max-w-6xl mx-auto px-5 sm:px-6">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Site branding */}
          <div className="flex-shrink-0 mr-4">
            {/* Logo */}
            <Link as={RouterLink} to="/" className="block" aria-label="Cruip">
              <Image
                borderRadius="full"
                boxSize="40px"
                src={LogoCircle}
                alt="header-logo"
              />
            </Link>
          </div>

          {/* Site navigation */}
          <nav className="flex flex-grow">
            <ul className="flex flex-grow justify-end flex-wrap items-center no-underline">
              <li>
                <Link as={RouterLink} to="/login" className="px-5 py-3">
                  <Button
                    variant="ghost"
                    as="span"
                    color="slate.70"
                    borderColor="slate.70"
                    borderWidth="1px"
                    borderRadius="md"
                    _hover={{
                      bg: "eden.50",
                      color: "background",
                      transform: "scale(1.02)",
                    }}
                  >
                    Log In
                  </Button>
                </Link>
              </li>
              <li>
                <Link
                  as={RouterLink}
                  to="/register"
                  className="rounded-lg text-gray-200 bg-gray-900 hover:bg-gray-800 ml-3"
                >
                  <Button
                    variant="secondary"
                    rightIcon={<FaArrowRightLong />}
                    as="span"
                  >
                    Register
                  </Button>
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
}

export default Header;
