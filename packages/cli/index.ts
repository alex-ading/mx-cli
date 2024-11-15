#!/usr/bin/env node
import create from "@mx-cli/create";
import { Command } from "commander";
import fs from "fs-extra";

const pkgJson = fs.readJSONSync('../../package.json');

const program = new Command();

program.name("mx-cli").description("mx-cli").version(pkgJson.version);

program
  .command("create [projectName]")
  .description("创建项目")
  .action(async () => {
    create();
  });

program.parse();
