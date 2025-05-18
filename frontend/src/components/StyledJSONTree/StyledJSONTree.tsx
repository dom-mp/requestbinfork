import { JSONTree } from "react-json-tree";
import { useTheme } from "@mui/material/styles";

interface StyledJSONTreeProps {
  json: string;
}

const StyledJSONTree = ({ json }: StyledJSONTreeProps) => {
  const pallete = useTheme().palette;

  // Tie json tree theme to mui theme
  const jsonTreeTheme = {
    scheme: "night_owl",
    author: "Daniel Chae, Dominique Morales Perez",
    base00: `#00000000`, // BACKGROUND_COLOR
    base01: pallete.background.default,
    base02: pallete.action.selected,
    base03: pallete.text.disabled, // ITEM_STRING_EXPANDED_COLOR
    base04: pallete.text.secondary,
    base05: pallete.text.primary,
    base06: pallete.grey[200],
    base07: pallete.grey[400], // TEXT_COLOR
    base08: pallete.error.main, // NULL_COLOR, UNDEFINED_COLOR, FUNCTION_COLOR, SYMBOL_COLOR
    base09: pallete.warning.main, // NUMBER_COLOR, BOOLEAN_COLOR
    base0A: pallete.warning.light,
    base0B: pallete.success.main, // STRING_COLOR, DATE_COLOR, ITEM_STRING_COLOR
    base0C: pallete.info.light,
    base0D: pallete.primary.main, // LABEL_COLOR, ARROW_COLOR
    base0E: pallete.secondary.dark,
    base0F: pallete.warning.dark,

    nestedNodeLabel: { fontFamily: "monospace" },
    value: { fontFamily: "monospace" },
  };

  return (
    <JSONTree
      data={JSON.parse(json)}
      theme={jsonTreeTheme}
      invertTheme={false}
    />
  );
};

export default StyledJSONTree;
