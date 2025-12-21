import { expect, test } from 'vitest';
import { cli } from '../shared';
import { RegistryType } from '@open-audio-stack/core';

test('Uninstall package', async () => {
  cli(RegistryType.Plugins, 'install', 'surge-synthesizer/surge');
  expect(cli(RegistryType.Plugins, 'uninstall', 'surge-synthesizer/surge')).toMatchSnapshot();

  cli(RegistryType.Plugins, 'install', 'surge-synthesizer/surge@1.3.1');
  expect(cli(RegistryType.Plugins, 'uninstall', 'surge-synthesizer/surge@1.3.1')).toMatchSnapshot();

  expect(cli(RegistryType.Plugins, 'uninstall', 'surge-synthesizer/surge@0.0.0')).toMatchSnapshot();
});
