# studiorack-cli

![Test](https://github.com/studiorack/studiorack-cli/workflows/Test/badge.svg)

StudioRack command line tool for handling installing DAW VST plugin dependencies using:

- NodeJS 12.x
- TypeScript 4.x

## Installation

To install the tool, run the command:

    npm install @studiorack/cli -g

Verify the tool has been installed by running:

    studiorack --version

Check the default configuration by running:

    studiorack config get pluginFolder
    studiorack config get projectFolder

If you need to adjust change using:

    studiorack config set pluginFolder "path/to/plugins"
    studiorack config set projectFolder "path/to/projects"

## Usage

List the projects found in projectFolder using:

    studiorack project listLocal

Install a project's plugins using:

    studiorack project install <project-id>

Then open the project using:

    studiorack project open <project-id>

## Creating a new project configuration

You can create a new studiorack project .json file using:

    studiorack project create <project-id>

This will create a studiorack .json file with your configuration:

    {
      "id": "example",
      "author": "studiorack-user",
      "homepage": "https://studiorack.github.io/studiorack-site/",
      "name": "StudioRack Project",
      "description": "Created using StudioRack",
      "repo": "songs/april",
      "tags": [
        "StudioRack"
      ],
      "version": "1.0.0",
      "date": "2021-05-30T21:58:39.138Z",
      "type": {
        "name": "Ableton",
        "ext": "als"
      },
      "files": {
        "audio": {
          "name": "example.wav",
          "size": 1902788
        },
        "image": {
          "name": "example.png",
          "size": 16360
        },
        "project": {
          "name": "example.als",
          "size": 253018
        }
      },
      "plugins": {},
      "path": "songs/april",
      "status": "installed"
    }

For a full list of commands use:

    studiorack --help

## Finding, adding and removing plugins

Search the plugin registry using:

    studiorack plugin search delay

Add a plugin and update project.json config using:

    studiorack project install <project-id> <plugin-id>

Remove a plugin and update project.json config using:

    studiorack plugin uninstall <project-id> <plugin-id>

## Creating and publishing a plugin

Create a new plugin using the starter template:

    studiorack plugin create myplugin --type steinberg

Follow the instructions at ./myplugin/README.md to install and build your plugin

Validate your plugin:

    studiorack validate ./myplugin/build/VST3/Release/myplugin.vst3

Convert and enrich validator report metadata into json:

    studiorack validate ./myplugin/build/VST3/Release/myplugin.vst3 --json

Scan multiple plugins at the same time using wildcard selectors:

    studiorack validate "./myplugin/build/VST3/Release/**/*.{vst,vst3}" --json

When ready to release, commit your plugin to GitHub and ensure it is tagged with a topic:

    studiorack-plugin

Then it should appear in the GitHub topic search and API:

    https://github.com/topics/studiorack-plugin
    https://api.github.com/search/repositories?q=topic:studiorack-plugin+fork:true

StudioRack registry updates once a day at midnight UTC, which will make your plugin available via our API at:

    https://studiorack.github.io/studiorack-registry/

## Updating CLI code

Install plugin source code locally:

    npm link

Update source code and test using normal commands:

    studiorack --version

To publish and release changes and create a version tag using:

    npm version patch
    git push && git push origin --tags
    npm publish

## Contact

For more information please contact kmturley
