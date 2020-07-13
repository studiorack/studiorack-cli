# apm-cli

APM command line tool for handling installing DAW VST plugin dependencies using:

* Bash
* NodeJS 8.x


## Installation

To install the tool, run the command:

    npm install -g git+https://git@github.com/audio-project-manager/apm-plugin.git

Verify the tool has been installed by running:

    apm --version


## Usage

Navigate to a music project folder containing a project.json config, install all plugins using:

    apm install

Then start the project using

    apm start


## Creating a new project configuration

If music project folder does not contain a project.json, you can create a new one using:

    apm init

This will create a project.json with your configuration:

    {
      "name": "Example audio project",
      "version": "1.0.0",
      "description": "Example audio project description",
      "main": "Test.als",
      "preview": {
        "audio": "Test.wav",
        "image": "Test.png"
      },
      "plugins": {
        "plugin-name": "1.0.0"
      }
    }

For a full list of commands use:

    apm --help


## Finding, adding and removing plugins

Search the plugin registry using:

    apm search piano

Add a plugin and update project.json config using:

    apm install se-polymod-kx-by-kx77free

Remove a plugin and update project.json config using:
 
    apm uninstall se-polymod-kx-by-kx77free


## Deployment

When updating source code create a version tag:

    npm version patch
    git push origin --tags


## Contact

For more information please contact kmturley
