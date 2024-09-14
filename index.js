#!/usr/bin/env node
import { program } from 'commander'
import { initialiseCelaris } from './functions.js'
import fs from 'fs'
import path from 'path'
import { ascii } from './ascii.js'

/* ==================== Programs ==================== */

program.version('0.1.0').description('Celaris CLI tool')

program
  .description('Celaris application scaffolder')
  .argument('[directory]', 'directory to scaffold the app (enter . for current directory)')
  .action(async (directory) => {
    if (!directory) {
      console.log('Please provide a directory to scaffold the app')
      program.help()
    }
    const targetDir = path.resolve(directory)
    // Check if the directory exists, if not, you can choose to create it
    if (!fs.existsSync(targetDir)) {
      console.log(`Creating directory at ${targetDir}`)
      fs.mkdirSync(targetDir, { recursive: true })
    } else {
      console.log(`Directory exists: ${targetDir}`)
    }

    // change the current working directory to the target directory
    process.chdir(targetDir)

    // print the ascii art
    console.log(ascii)

    // scaffold the app
    await initialiseCelaris()

    console.log(`Scaffolded Celaris app in ${targetDir}`)

    console.log('Run the following commands to start the app:')
    if (targetDir === '.') {
      console.log(`cd ${targetDir}`)
    }
    console.log(ascii)
    console.log(`run cd ${directory}`)
    console.log(`npm run celaris -- dev --no-build (a build is not required for the first run)`)
    console.log('Thank you for using Celaris, to learn more, visit https://celaris.cc')
  })

program.parse()
