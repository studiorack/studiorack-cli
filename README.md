# studiorack-cli

![Test](https://github.com/studiorack/studiorack-cli/workflows/Test/badge.svg)

StudioRack command line tool to manage audio DAW VST plugin dependencies.

![StudioRack Cli](/screenshot.jpg)

<a href="https://github.com/open-audio-stack" target="_blank"><img src="https://raw.githubusercontent.com/open-audio-stack/open-audio-stack-registry/refs/heads/main/src/assets/powered-by-open-audio-stack.svg" alt="Powered by Open Audio Stack"></a>

## Installation

To install the tool, run the command:

    npm install @studiorack/cli -g

Get help:

    studiorack --help

Get version:

    studiorack --version

## Usage

StudioRack command line tool adheres to the [Open Audio Stack - Manager specification](https://github.com/open-audio-stack/open-audio-stack-core/blob/main/specification.

Config values can be set/get using:

    studiorack config set <key> <value>
    studiorack config get <key>
    studiorack config get pluginsDir

Search the registry package index for lazy matching query:

    studiorack <registryType> search <query>
    studiorack plugins search piano

Get a package metadata:

    studiorack <registryType> get <slug>
    studiorack plugins get surge-synthesizer/surge

Install a package:

    studiorack <registryType> install <slug>@<version>
    studiorack plugins install surge-synthesizer/surge

Install and open an app:

    studiorack apps install steinberg/validator
    studiorack apps open steinberg/validator -- --help

For a full list of commands, please refer to the [Open Audio Stack - Manager specification](https://github.com/open-audio-stack/open-audio-stack-core/blob/main/specification.md)

## Developer information

StudioRack Cli was built using:

- NodeJS 20.x
- TypeScript 5.x
- Commander 12.x

## Installation

Install dependencies using:

    npm install

## Usage

Run a build and link the `studiorack` command line to this local package:

    npm run dev:cli

Test using normal commands:

    studiorack --version

To publish and release changes and create a version tag using:

    npm version patch
    git push && git push origin --tags

## Contact

For more information please contact kmturley
