import { readFile, writeFile } from "node:fs/promises";
import { getIconsCSS } from "@iconify/utils";
import { locate } from "@iconify/json";

/**
 * List of icons. Key is icon set prefix, value is array of icons
 *
 * @type {Record<string, string[]>}
 */
const icons = {
  mdi: ["search", "home", "menu", "account-outline", "password-outline", "form-textbox-password", "eye-outline", "eye-off"],
  "mdi-light": ["alert-circle", "circle", "help-circle"],
  tabler: ["search"],
  gg: ["close-o"],
  ep: ["select"],
};

// Parse each icon set
let code = "";
for (const prefix in icons) {
  // Find location of .json file
  const filename = locate(prefix);

  // Load file and parse it
  /** @type {import("@iconify/types").IconifyJSON} */
  const iconSet = JSON.parse(await readFile(filename, "utf8"));

  // Get CSS
  const css = getIconsCSS(iconSet, icons[prefix]);

  // Add it to code
  code += css;
}

// Save CSS file
await writeFile("miniprogram/assets/icon.scss", code, "utf8");
console.log(`Saved CSS (${code.length} bytes)`);
