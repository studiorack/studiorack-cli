# audio-project-manager

Audio project manager using:

* Bash
* NodeJS 8.x


## Installation

To install run the command:

    npm install -g git+https://git@github.com/kmturley/audio-project-manager.git

Verify it's been installed by running:

    apm --version


## Usage

Init an audio project.json using:

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
        "plugin-name": {
          "version": "1.0.0",
          "resolved": "http://www.example.com/plugin.zip"
        }
      }
    }

Install a plugin to your project.json config using:

    apm install http://www.digitalfishphones.com/binaries/the_fish_fillets_v1_1.zip

To install all plugins from the project.json config use:

    apm install

For a full list of commands use:

    apm --help


## Contact

For more information please contact kmturley
