const path = require("path");
const { readdirSync, statSync, readFileSync, appendFileSync } = require("fs");

const strapiTypesRoot = path.join(
  __dirname,
  "..",
  "node_modules",
  "@strapi",
  "strapi",
  "lib",
  "types"
);

const destinationPath = path.join(__dirname, "..", "types", "generated.d.ts");

const files = readAllFileNames(strapiTypesRoot);

files.forEach((filePath) => {
  const contents = readFileContents(filePath);

  const cleanContent = removeImportsFromFileContents(contents);
  console.log(`Now removing lines from: ${filePath}`);

  appendFileSync(destinationPath, cleanContent, "utf-8");
});

function readDirectory(path) {
  return readdirSync(path);
}

function isDirectory(directory, name) {
  return statSync(`${directory}/${name}`).isDirectory();
}

function readAllFileNames(directory, foundFiles = []) {
  const currentFiles = readDirectory(directory);

  currentFiles.forEach((fileName) => {
    if (isDirectory(directory, fileName)) {
      readAllFileNames(`${directory}/${fileName}`, foundFiles);
    } else {
      foundFiles.push(`${directory}/${fileName}`);
    }
  });

  return foundFiles;
}

function readFileContents(path) {
  return readFileSync(path, { encoding: "utf-8" });
}

function removeImportsFromFileContents(contents) {
  const linesToRemove = [];
  const lines = contents.split("\n");

  let scanningForBlock = false;
  let scanningRangeStart = 0;

  lines.forEach((line, index) => {
    if (scanningForBlock) {
      if (line.endsWith(";")) {
        linesToRemove.push({ start: scanningRangeStart, end: index });
        scanningForBlock = false;
      }
    } else {
      const startsWithImport = line.startsWith("import");
      const endsWithSemicolon = line.endsWith(";");

      if (startsWithImport && endsWithSemicolon) {
        // One line import
        linesToRemove.push({ start: index, end: index });
      } else if (startsWithImport) {
        // Starts import but does not end with semicolon
        // Multiline import
        scanningForBlock = true;
        scanningRangeStart = index;
      }
    }
  });

  // No lines to remove
  if (linesToRemove.length === 0) return contents;

  return lines
    .slice(linesToRemove[linesToRemove.length - 1].end + 1)
    .join("\n");
}
