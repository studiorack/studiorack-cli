import { RegistryInterface } from '@open-audio-stack/core';
import { PLUGIN_PACKAGE_MULTIPLE, PLUGIN_PACKAGE, PLUGIN_PACKAGE_EMPTY } from './Plugin';
import { PRESET_PACKAGE } from './Preset';
import { PROJECT_PACKAGE } from './Project';

const name: string = 'Open Audio Registry';
const url: string = 'https://open-audio-stack.github.io/open-audio-stack-registry';
const version: string = '1.0.0';

export const REGISTRY: RegistryInterface = {
  name,
  plugins: {},
  url,
  version,
};

export const REGISTRY_MULTIPLE_TYPES: RegistryInterface = {
  name,
  plugins: {},
  presets: {},
  projects: {},
  url,
  version,
};

export const REGISTRY_EMPTY_PKG: RegistryInterface = {
  name,
  plugins: {
    [PLUGIN_PACKAGE.slug]: PLUGIN_PACKAGE_EMPTY,
  },
  url,
  version,
};

export const REGISTRY_PLUGIN_VER: RegistryInterface = {
  name,
  plugins: {
    [PLUGIN_PACKAGE.slug]: PLUGIN_PACKAGE,
  },
  url,
  version,
};

export const REGISTRY_PLUGIN_MULTIPLE: RegistryInterface = {
  name,
  plugins: {
    [PLUGIN_PACKAGE.slug]: PLUGIN_PACKAGE_MULTIPLE,
  },
  url,
  version,
};

export const REGISTRY_PACKAGE_TYPES: RegistryInterface = {
  name,
  plugins: {
    [PLUGIN_PACKAGE.slug]: PLUGIN_PACKAGE,
  },
  presets: {
    [PRESET_PACKAGE.slug]: PRESET_PACKAGE,
  },
  projects: {
    [PROJECT_PACKAGE.slug]: PROJECT_PACKAGE,
  },
  url,
  version,
};
