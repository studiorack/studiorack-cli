import {
  Architecture,
  FileType,
  License,
  PackageInterface,
  PresetInterface,
  PresetFormat,
  PresetType,
  SystemType,
} from '@open-audio-stack/core';

export const PRESET: PresetInterface = {
  audio: 'https://open-audio-stack.github.io/open-audio-stack-registry/presets/jh/floating-rhodes/floating-rhodes.flac',
  author: 'JH',
  changes: '- First version\n',
  date: '2024-03-02T00:00:00.000Z',
  description: 'Floating Rhodes sounds.',
  files: [
    {
      architectures: [Architecture.Arm32, Architecture.Arm64, Architecture.X32, Architecture.X64],
      contains: [PresetFormat.VSTPreset],
      sha256: 'ddc328295ca5a25303a42c45b184f99b7e923bbcbb92b8061e33191f79f19ad9',
      systems: [{ type: SystemType.Linux }, { type: SystemType.Mac }, { type: SystemType.Win }],
      size: 3773,
      type: FileType.Archive,
      url: 'https://open-audio-stack.github.io/open-audio-stack-registry/presets/jh/floating-rhodes/1.0.0/floating-rhodes.zip',
    },
  ],
  image: 'https://open-audio-stack.github.io/open-audio-stack-registry/presets/jh/floating-rhodes/floating-rhodes.jpg',
  license: License.GNUGeneralPublicLicensev3,
  plugins: {
    'surge-synthesizer/surge': '1.3.1',
  },
  name: 'Floating Rhodes',
  tags: ['Preset', 'Synth', 'Rhodes'],
  type: PresetType.Patch,
  url: 'https://presetshare.com/p763',
};

export const PRESET_INSTALLED: PresetInterface = structuredClone(PRESET);
PRESET_INSTALLED.installed = true;

export const PRESET_PACKAGE: PackageInterface = {
  slug: 'jh/floating-rhodes',
  version: '1.0.0',
  versions: {
    '1.0.0': PRESET,
  },
};
