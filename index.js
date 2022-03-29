const { join } = require("path");
const { mkdirSync, existsSync, renameSync, unlinkSync } = require("fs");
const argv = require('minimist')(process.argv.slice(2));

require('dotenv').config();

module.exports = (basePath = __dirname) => {

    const environment = process.env.TRUFFLE_ENV || argv.env || 'development';

    if (!environment) {
        console.log("Please set the TRUFFLE_ENV environment variable or create a .env file with your TRUFFLE_ENV.");
        process.exit(1);
    }

    const manifestDir = '.openzeppelin';
    const buildDir = 'build';
    const basePath = join(__dirname, buildDir);
    const outputFolder = join(basePath, environment);
    const manifestBackupPath = join(outputFolder, manifestDir);

    if (process.env.RESET || argv.reset) {
        if (existsSync(manifestDir)) {
            unlinkSync(manifestDir);
        }
        console.log("Reset manifest directory. Continuing to fresh migration.");
    }

    // Rename current manifest to environment backup
    if (process.env.BACKUP || argv.backup) {
        if (existsSync(manifestDir)) {
            console.log(`Using manifest directory: ${manifestDir}`);
            renameSync(manifestDir, manifestBackupPath);
        }
        console.log(`Backing up manifest to ${manifestBackupPath}`);
        process.exit(0);
    }

    // Restore backup manifest
    if (process.env.RESTORE || argv.restore) {
        if (existsSync(manifestBackupPath)) {
            console.log(`Restoring manifest from ${manifestBackupPath}`);
            renameSync(manifestBackupPath, manifestDir);
            console.log(`Restored manifest from ${manifestBackupPath}`);
        }
    }


    console.log("Output folder:", outputFolder);
    existsSync(basePath) || mkdirSync(basePath);
    existsSync(outputFolder) || mkdirSync(outputFolder);
    return {
        contracts_build_directory: outputFolder,
    }
}
