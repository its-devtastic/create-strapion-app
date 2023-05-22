const path = require("path");
const { program } = require("commander");
const chalk = require("chalk");
const fs = require("fs-extra");

const pkg = require("./package.json");

function init() {
  program
    .name(pkg.name)
    .description(pkg.description)
    .version(pkg.version)
    .arguments("<project-directory>")
    .usage(`${chalk.green("<project-directory>")} [options]`)
    .action(async (dir) => {
      const root = process.cwd();
      const fullPath = getFullPath(root, dir);

      console.log(
        `A new Strapion project will be created at ${chalk.blue(fullPath)}`
      );

      if (await pathIsNotEmpty(fullPath)) {
        console.error(
          chalk.red("The chosen directory already exists and contains files.")
        );
        process.exit(1);
      }

      await createProject(root, dir);

      console.log(chalk.green("Strapion project has been created."));
      console.log(
        chalk.blue(
          chalk.bold("Next:"),
          "Go into the new directory and install dependencies."
        )
      );
    });

  program.parse(process.argv);
}

async function pathIsNotEmpty(path) {
  const exists = await fs.pathExists(path);

  if (exists) {
    const ls = await fs.readdir(path);
    return ls.length > 0;
  }

  return false;
}

function getFullPath(root, dir) {
  return path.resolve(root, dir);
}

async function createProject(root, dir) {
  const fullPath = getFullPath(root, dir);
  await fs.ensureDir(fullPath);
  const pkg = await fs.readJson(
    path.resolve(__dirname, "./template/package.json")
  );
  pkg.name = dir;
  fs.writeJson(path.resolve(fullPath, "package.json"), pkg, { spaces: 2 });
  fs.copy(
    path.resolve(__dirname, "./template/config/index.ts"),
    path.resolve(fullPath, "./config/index.ts")
  );
  fs.copy(
    path.resolve(__dirname, "./template/index.ts"),
    path.resolve(fullPath, "./index.ts")
  );
  const html = await fs.readFile(
    path.resolve(__dirname, "./template/index.html")
  );
  await fs.writeFile(
    path.resolve(fullPath, "./index.html"),
    html.toString().replace("{{title}}", dir)
  );
  await fs.mkdir(path.resolve(fullPath, "./public"));
}

module.exports = { init };
