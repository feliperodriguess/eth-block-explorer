import { extendTheme, theme as chakraTheme } from "@chakra-ui/react";

export const theme = extendTheme({
  breakpoints: {
    ...chakraTheme.breakpoints,
    sm: "1100px",
    md: "1100px",
  },
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
