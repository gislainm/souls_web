import React, { useState, useEffect } from "react";

import { useNavigate, useLocation } from "react-router-dom";
import {
  Button,
  Image,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuGroup,
  useBreakpointValue,
  Box,
  useToast,
  Heading,
} from "@chakra-ui/react";
import { IoMenu } from "react-icons/io5";
import { FaSignOutAlt } from "react-icons/fa";
import { BiChevronDown } from "react-icons/bi";
import LogoCircle from "../images/logo-circle.png";
import useAuth from "../hooks/useAuthLeader";
import UseLogout from "../hooks/useLogoutLeader";

function LeaderHeader() {
  const location = useLocation();
  const [top, setTop] = useState(true);
  const [groupName, setGroupName] = useState<string>("");
  const { auth } = useAuth();
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
        {auth && auth!.user.name.split(" ")[0]}
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

  useEffect(() => {
    if (location.state && location.state.name) {
      setGroupName(location.state.name);
    } else {
      setGroupName("");
    }
    //eslint-disable-next-line
  }, [location]);

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
            <Box className="block" aria-label="Cruip">
              <Image
                borderRadius="full"
                boxSize="40px"
                src={LogoCircle}
                alt="header-logo"
              />
            </Box>
          </div>

          {/* Site navigation */}
          <nav className="flex flex-grow">
            <div className="flex flex-grow justify-between flex-wrap items-center">
              <div className="flex flex-grow justify-center">
                <Heading
                  size={{ base: "xs", md: "sm" }}
                  fontSize={18}
                  color="shaft"
                >
                  {groupName}
                </Heading>
              </div>
              <div>
                <Menu>
                  {profileButtonContent}
                  <MenuList bg="#E0E0E0" borderColor="#E0E0E0" color="browner">
                    <MenuGroup title={auth!.user.name}>
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
          </nav>
        </div>
      </div>
    </header>
  );
}

export default LeaderHeader;
