import React, { useState, useEffect } from "react";

import {
  Link as RouterLink,
  NavLink,
  useLocation,
  useNavigate,
} from "react-router-dom";
import {
  Link,
  Button,
  Image,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
  MenuGroup,
  useBreakpointValue,
  Box,
  useToast,
} from "@chakra-ui/react";
import { IoMenu } from "react-icons/io5";
import { FaArrowRightLong } from "react-icons/fa6";
import { FaUserCircle } from "react-icons/fa";
import { FaSignOutAlt } from "react-icons/fa";
import { BiChevronDown } from "react-icons/bi";
import LogoCircle from "../images/logo-circle.png";
import useAuth from "../hooks/useAuth";
import UseLogout from "../hooks/useLogout";

function Header() {
  const [top, setTop] = useState(true);
  const { auth } = useAuth();
  const location = useLocation();
  const toast = useToast();
  const navigate = useNavigate();
  const logout = UseLogout();
  const profileButtonContent = useBreakpointValue({
    base: (
      <MenuButton
        as={Button}
        variant="profile"
        size="sm"
        _expanded={{ bg: "eden.100" }}
      >
        <IoMenu />
      </MenuButton>
    ),
    md: (
      <MenuButton
        as={Button}
        rightIcon={<BiChevronDown />}
        variant="profile"
        size={{ base: "sm", md: "md" }}
        _expanded={{ bg: "eden.100" }}
      >
        {auth && auth!.organization.name}
      </MenuButton>
    ),
  });

  // detect whether user has scrolled the page down by 10px
  useEffect(() => {
    const scrollHandler = () => {
      window.scrollY > 10 ? setTop(false) : setTop(true);
    };
    window.addEventListener("scroll", scrollHandler);
    return () => window.removeEventListener("scroll", scrollHandler);
  }, [top]);

  const handleLogout = async () => {
    try {
      const response = await logout();
      toast({
        title: response.data.message,
        status: "success",
        duration: 9000,
        isClosable: true,
        position: "top",
      });
      navigate("/login");
    } catch (error: any) {
      toast({
        title: error.response ? error.response.data.error : error.message,
        status: "error",
        duration: 9000,
        isClosable: true,
        position: "top",
      });
    }
  };

  return (
    <header
      className={`fixed w-full z-30 md:bg-opacity-90 transition duration-300 ease-in-out ${
        !top && "bg-white backdrop-blur-sm shadow-lg"
      }`}
    >
      <div className=" mx-auto px-5 sm:px-6">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Site branding */}
          <div className="flex-shrink-0 mr-4">
            {/* Logo */}
            {!auth && (
              <Link as={RouterLink} to="/" className="block" aria-label="Cruip">
                <Image
                  borderRadius="full"
                  boxSize="40px"
                  src={LogoCircle}
                  alt="header-logo"
                />
              </Link>
            )}
            {auth && (
              <Box className="block" aria-label="Cruip">
                <Image
                  borderRadius="full"
                  boxSize="40px"
                  src={LogoCircle}
                  alt="header-logo"
                />
              </Box>
            )}
          </div>

          {/* Site navigation */}
          <nav className="flex flex-grow">
            {!auth && (
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
            )}
            {auth && (
              <div className="flex flex-grow justify-between flex-wrap items-center">
                <div className="flex flex-grow justify-center">
                  <Link as={NavLink} to="/groups" className="mx-1 sm:mx-6">
                    <Button
                      variant={
                        location.pathname === "/groups" ? "nav_active" : "nav"
                      }
                      as="span"
                      size={{ base: "sm", md: "md" }}
                    >
                      Groups
                    </Button>
                  </Link>
                  <Link as={NavLink} to="/dashboard" className="mx-1 sm:mx-6">
                    <Button
                      variant={
                        location.pathname === "/dashboard"
                          ? "nav_active"
                          : "nav"
                      }
                      as="span"
                      size={{ base: "sm", md: "md" }}
                    >
                      Dashboard
                    </Button>
                  </Link>
                </div>
                <div>
                  <Menu>
                    {profileButtonContent}
                    <MenuList
                      bg="#E0E0E0"
                      borderColor="#E0E0E0"
                      color="browner"
                    >
                      <MenuGroup title={auth.user.name}>
                        <MenuItem
                          bg="#E0E0E0"
                          _hover={{ bg: "sirocco", color: "background" }}
                          icon={<FaUserCircle />}
                          onClick={() => alert("navigated to profile")}
                        >
                          Your Profile
                        </MenuItem>
                      </MenuGroup>
                      <MenuDivider borderColor="eden.100" />
                      <MenuGroup>
                        <MenuItem
                          bg="#E0E0E0"
                          _hover={{ bg: "sirocco", color: "background" }}
                          icon={<FaSignOutAlt />}
                          onClick={handleLogout}
                        >
                          Sign out
                        </MenuItem>
                      </MenuGroup>
                    </MenuList>
                  </Menu>
                </div>
              </div>
            )}
          </nav>
        </div>
      </div>
    </header>
  );
}

export default Header;
