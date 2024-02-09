import { extendTheme } from "@chakra-ui/react";
import { CustomButton as Button } from "./styles/CustomButton";
import { CustomLink as Link } from "./styles/CustomLink";
const theme = extendTheme({
  useCustomProperties: true,
  fonts: {
    body: 'Frutiger, "Frutiger Linotype", Univers, Calibri, "Gill Sans", "Gill Sans MT", "Myriad Pro", Myriad, "DejaVu Sans Condensed", "Liberation Sans", "Nimbus Sans L", Tahoma, Geneva, "Helvetica Neue", Helvetica, Arial, sans-serif',
    heading:
      'Frutiger, "Frutiger Linotype", Univers, Calibri, "Gill Sans", "Gill Sans MT", "Myriad Pro", Myriad, "DejaVu Sans Condensed", "Liberation Sans", "Nimbus Sans L", Tahoma, Geneva, "Helvetica Neue", Helvetica, Arial, sans-serif',
  },
  fontSizes: [16, 18, 20, 24, 30, 36, 40, 48, 64, 72, 96],
  fontWeights: {
    lite: 200,
    body: 400,
    heading: 700,
  },
  lineHeights: {
    body: 1.5,
    heading: 1.25,
  },
  colors: {
    primary: "#0c0c0c",
    secondary: "#b4c2c2",
    eden: {
      50: "#238c8c",
      100: "#155454",
    },
    sirocco: "#768484",
    sark: "#567c7c",
    scorpion: "#5c5c5c",
    gray: "#949494",
    shaft: "#353535",
    tundora: "#444444",
    background: "#fff",
    text: "#000",
    teal: {
      50: "#00a8b3",
      100: "#008C95",
    },
    browner: "#574846",
    slate: {
      50: "#2ACBC8",
      70:"#23A9A7",
      100: "#115453",
      200: "#OA3332",
    },
  },
  components: {
    Button,
    Link,
  },
});
export default theme;
