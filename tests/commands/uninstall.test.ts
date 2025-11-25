import { expect, test } from 'vitest';
import { cli } from '../shared';
import { RegistryType } from '@open-audio-stack/core';

test('Uninstall package', async () => {
  expect(cli(RegistryType.Plugins, 'uninstall', 'surge-synthesizer/surge')).toMatchSnapshot();
  expect(cli(RegistryType.Plugins, 'uninstall', 'surge-synthesizer/surge@1.3.1')).toMatchSnapshot();
  expect(cli(RegistryType.Plugins, 'uninstall', 'surge-synthesizer/surge@0.0.0')).toMatchSnapshot();
});
