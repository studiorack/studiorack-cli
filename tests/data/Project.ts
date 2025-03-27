import path from 'path';
import {
  Architecture,
  FileType,
  License,
  PackageInterface,
  ProjectInterface,
  ProjectFormat,
  ProjectType,
  SystemType,
} from '@open-audio-stack/core';

export const PROJECT_PATH: string = path.join('test', 'installed', 'projects', 'kmt', 'banwer', '1.0.1', 'index.json');

export const PROJECT: ProjectInterface = {
  audio: 'https://open-audio-stack.github.io/open-audio-stack-registry/projects/kmt/banwer/banwer.flac',
  author: 'KMT',
  changes: '- First version\n',
  date: '2024-03-02T00:00:00.000Z',
  description: 'Song idea using synthesizers.',
  files: [
    {
      architectures: [Architecture.Arm32, Architecture.Arm64, Architecture.X32, Architecture.X64],
      contains: [ProjectFormat.AbletonLive],
      sha256: '77e2d542235889b027f2ecbe66b753978a5232fabac9c97151a86173048e2eaf',
      systems: [{ type: SystemType.Linux }, { type: SystemType.Mac }, { type: SystemType.Win }],
      size: 216863,
      type: FileType.Archive,
      url: 'https://open-audio-stack.github.io/open-audio-stack-registry/projects/kmt/banwer/1.0.1/banwer.zip',
    },
  ],
  image: 'https://open-audio-stack.github.io/open-audio-stack-registry/projects/kmt/banwer/banwer.jpg',
  license: License.GNUGeneralPublicLicensev3,
  plugins: {
    'surge-synthesizer/surge': '1.3.1',
  },
  name: 'Banwer',
  open: 'Banwer.als',
  tags: ['Idea', 'Synth', 'Modulation'],
  type: ProjectType.Song,
  url: 'https://soundcloud.com/kmt-london',
};

export const PROJECT_INSTALLED: ProjectInterface = structuredClone(PROJECT);
PROJECT_INSTALLED.installed = true;

export const PROJECT_DEPS: ProjectInterface = structuredClone(PROJECT);
PROJECT_DEPS.installed = true;
PROJECT_DEPS.plugins['surge-synthesizer/surge'] = '1.3.4';

export const PROJECT_NO_DEPS: ProjectInterface = structuredClone(PROJECT);
PROJECT_NO_DEPS.installed = true;
PROJECT_NO_DEPS.plugins = {};

export const PROJECT_PACKAGE: PackageInterface = {
  slug: 'kmt/banwer',
  version: '1.0.1',
  versions: {
    '1.0.1': PROJECT,
  },
};
