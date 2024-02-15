import { ComponentStyleConfig } from "@chakra-ui/react";

export const CustomButton: ComponentStyleConfig = {
  // style object for base or default style
  baseStyle: {},
  // styles for different sizes ("sm", "md", "lg")
  sizes: {},
  // styles for different visual variants ("outline", "solid")
  variants: {
    primary: {
      bg: "eden.100",
      _hover: { bg: "eden.50", transform: "scale(1.02)" },
      color: "background",
    },
    secondary: {
      bg: "slate.70",
      _hover: { bg: "eden.50", transform: "scale(1.02)" },
      color: "background",
    },
    start: {
      bg: "sark",
      _hover: { bg: "eden.100", transform: "scale(1.02)" },
      color: "background",
    },
    group: {
      bg: "scorpion",
      _hover: { bg: "browner", transform: "scale(1.02)" },
      color: "background",
    },
    nav: {
      bg: "background",
      _hover: { bg: "sark", transform: "scale(1.02)", color: "background" },
      color: "text",
    },
    nav_active: {
      bg: "sark",
      _hover: { bg: "sark", transform: "scale(1.02)", color: "background" },
      color: "background",
    },
    profile: {
      bg: "sirocco",
      _hover: { bg: "sark", transform: "scale(1.02)" },
      color: "background",
    },
  },
  // default values for 'size', 'variant' and 'colorScheme'
  defaultProps: {},
};
