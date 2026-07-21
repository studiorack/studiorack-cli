import { expect, test } from 'vitest';
import { cli } from '../shared';
import { RegistryType } from '@open-audio-stack/core';

test('List packages', async () => {
  // The "Installed" column reflects real on-disk state shared across every test file in this
  // run, and file execution order isn't guaranteed alphabetical, so install what this snapshot
  // expects rather than relying on another file (e.g. install.test.ts) to have run first.
  await cli(RegistryType.Plugins, 'install', 'surge-synthesizer/surge');
  expect(await cli(RegistryType.Plugins, 'list', '--incompatible')).toMatchSnapshot();
  expect(await cli(RegistryType.Plugins, 'list', '--installed')).toMatchSnapshot();
});
