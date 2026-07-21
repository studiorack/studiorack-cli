import { expect, test } from 'vitest';
import { cli } from '../shared';
import { RegistryType } from '@open-audio-stack/core';

test('Uninstall package', async () => {
  await cli(RegistryType.Plugins, 'install', 'surge-synthesizer/surge');
  expect(await cli(RegistryType.Plugins, 'uninstall', 'surge-synthesizer/surge')).toMatchSnapshot();

  await cli(RegistryType.Plugins, 'install', 'surge-synthesizer/surge@1.3.1');
  expect(await cli(RegistryType.Plugins, 'uninstall', 'surge-synthesizer/surge@1.3.1')).toMatchSnapshot();

  expect(await cli(RegistryType.Plugins, 'uninstall', 'surge-synthesizer/surge@0.0.0')).toMatchSnapshot();
});
