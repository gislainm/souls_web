import { ComponentStyleConfig } from "@chakra-ui/react";

export const CustomLink: ComponentStyleConfig = {
  // style object for base or default style
  baseStyle: {},
  // styles for different sizes ("sm", "md", "lg")
  sizes: {},
  // styles for different visual variants ("outline", "solid")
  variants: {
    primary: {
      fontWeight: 700,
      color: "teal.100",
      // _hover={{
      //   _before: {
      //     content:"",
      //     position:"absolute",
      //     display:"block",
      //     width:"100%",
      //     height:"2px",
      //     bottom:"0",
      //     left:"0",
      //     transform:"scaleX(0)",
      //     transition:"transform 0.3s ease"
      //   },
      // }}
      _hover: { transform: "scaleY(1.02)" },
    },
  },
  // default values for 'size', 'variant' and 'colorScheme'
  defaultProps: {},
};
