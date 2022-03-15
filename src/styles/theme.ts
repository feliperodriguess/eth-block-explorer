import { extendTheme } from "@chakra-ui/react";

export const theme = extendTheme({
  styles: {
    global: () => ({
      body: {
        fontFamily: "Poppins",
        color: "whiteAlpha.900",
        bg: "gray.800",
        lineHeight: "base",
      },
    }),
  },
});
