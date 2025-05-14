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
    base00: pallete.background.paper, //  Default Background
    base01: pallete.background.default, //  Lighter Background (Used for status bars, line number and folding marks)
    base02: pallete.action.selected, //  Selection Background
    base03: pallete.text.disabled, //  Comments, Invisibles, Line Highlighting
    base04: pallete.text.secondary, //  Dark Foreground (Used for status bars)
    base05: pallete.text.primary, //  Default Foreground, Caret, Delimiters, Operators
    base06: pallete.grey[200], //  Light Foreground (Not often used)
    base07: pallete.grey[400], //  Light Background (Not often used)
    base08: pallete.error.main, //  Variables, XML Tags, Markup Link Text, Markup Lists, Diff Deleted
    base09: pallete.warning.main, //  Integers, Boolean, Constants, XML Attributes, Markup Link Url
    base0A: pallete.warning.light, //  Classes, Markup Bold, Search Text Background
    base0B: pallete.success.main, //  Strings, Inherited Class, Markup Code, Diff Inserted
    base0C: pallete.info.light, //  Support, Regular Expressions, Escape Characters, Markup Quotes
    base0D: pallete.primary.main, //  Functions, Methods, Attribute IDs, Headings
    base0E: pallete.secondary.dark, //  Keywords, Storage, Selector, Markup Italic, Diff Changed
    base0F: pallete.warning.dark, //  Deprecated, Opening/Closing Embedded Language Tags, e.g. <?php ?>
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
