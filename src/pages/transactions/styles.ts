import { scrollBarStyles } from "../../utils/constants";

export const styles = {
  header: {
    align: "center",
    justify: ["center", "space-between"],
    my: [4, 8],
  },
  iconButton: {
    "aria-label": "Back to previous page",
    colorScheme: "pink",
    size: "md",
  },
  input: {
    borderWidth: "2px",
    colorScheme: "pink",
    maxW: "300px",
    _focus: { borderColor: "pink.500" },
  },
  title: {
    fontSize: ["xl", "2xl"],
    fontWeight: "medium",
  },
  transactionsCount: {
    fontSize: "xl",
    fontWeight: "medium",
    mt: [4, 0],
  },
  transactionsContainer: {
    gap: 4,
    maxH: ["auto", "500px"],
    overflow: "auto",
    css: scrollBarStyles,
  },
};
