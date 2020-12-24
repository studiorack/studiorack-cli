# studiorack-cli
![Test](https://github.com/studiorack/studiorack-cli/workflows/Test/badge.svg)

StudioRack command line tool for handling installing DAW VST plugin dependencies using:

* NodeJS 12.x
* TypeScript 4.x


## Installation

To install the tool, run the command:

    npm install @studiorack/cli -g

Verify the tool has been installed by running:

    studiorack --version


## Usage

Navigate to a music project folder containing a project.json config, install all plugins using:

    studiorack install --global

Then start the project using

    studiorack start


## Creating a new project configuration

If music project folder does not contain a project.json, you can create a new one using:

    studiorack init

This will create a project.json with your configuration:

    {
      "name": "My Project",
      "version": "0.0.1",
      "description": "My project description",
      "main": "Song.als",
      "audio": "Song.wav",
      "image": "Song.png",
      "plugins": {
        "plugin-name": "1.0.0"
      }
    }

For a full list of commands use:

    studiorack --help


## Finding, adding and removing plugins

Search the plugin registry using:

    studiorack search delay

Add a plugin and update project.json config using:

    studiorack install studiorack/studiorack-plugin-steinberg/adelay --global

Remove a plugin and update project.json config using:
 
    studiorack uninstall studiorack/studiorack-plugin-steinberg/adelay --global


## Creating and publishing a plugin

Create a new plugin using the starter template:

    studiorack create myplugin --type steinberg

Follow the instructions at ./myplugin/README.md to install and build your plugin

Validate your plugin:

    studiorack validate ./myplugin/build/VST3/Release/myplugin.vst3

Convert and enrich validator report metadata into json:

    studiorack validate ./myplugin/build/VST3/Release/myplugin.vst3 --json

Scan multiple plugins at the same time using wildcard selectors:

    studiorack validate "./myplugin/build/VST3/Release/**/*.{vst,vst3}" --json

When ready to release, commit your plugin to GitHub and ensure it is tagged with a topic:

    studiorack-plugin

Then it should appear in the GitHub API:

    https://api.github.com/search/repositories?q=topic:studiorack-plugin+fork:true

StudioRack registry updates once a day at midnight UTC, which will make your plugin available via our API at:

    https://studiorack.github.io/studiorack-registry/


## Updating CLI code

When updating this CLI source code, create a version tag:

    npm version patch
    git push && git push origin --tags
    npm publish


## Contact

For more information please contact kmturley
