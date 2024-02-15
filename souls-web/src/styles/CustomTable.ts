import { tableAnatomy } from "@chakra-ui/anatomy";
import { createMultiStyleConfigHelpers } from "@chakra-ui/react";

const { definePartsStyle, defineMultiStyleConfig } =
  createMultiStyleConfigHelpers(tableAnatomy.keys);

const customVariant = definePartsStyle((props) => {
  const { colorScheme: c } = props;

  return {
    tbody: {
      tr: {
        "&:nth-of-type(odd)": {
          td: {
            background: `${c}`,
          },
        },
        "&:nth-of-type(even)": {
          td: {
            background: `${c}`,
          },
        },
      },
    },
  };
});

export const tableTheme = defineMultiStyleConfig({
  variants: { customVariant },
});
