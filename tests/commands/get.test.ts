import { expect, test } from 'vitest';
import { cli } from '../shared';
import { RegistryType } from '@open-audio-stack/core';

test('Get package', async () => {
  // The "Installed" column reflects real on-disk state shared across every test file in this
  // run, and file execution order isn't guaranteed alphabetical, so install what this snapshot
  // expects rather than relying on another file (e.g. install.test.ts) to have run first.
  cli(RegistryType.Plugins, 'install', 'surge-synthesizer/surge');
  cli(RegistryType.Plugins, 'install', 'surge-synthesizer/surge@1.3.1');
  expect(cli(RegistryType.Plugins, 'get', 'surge-synthesizer/surge')).toMatchSnapshot();
  expect(cli(RegistryType.Plugins, 'get', 'surge-synthesizer/surge@1.3.1')).toMatchSnapshot();
  expect(cli(RegistryType.Plugins, 'get', 'surge-synthesizer/surge@0.0.0')).toMatchSnapshot();
});
