import { expect, test } from 'vitest';
import { cli, cliCatch } from '../shared';
import { RegistryType } from '@open-audio-stack/core';

test('Uninstall package', async () => {
  cli(RegistryType.Plugins, 'install', 'surge-synthesizer/surge');
  expect(cli(RegistryType.Plugins, 'uninstall', 'surge-synthesizer/surge')).toMatchSnapshot();

  cli(RegistryType.Plugins, 'install', 'surge-synthesizer/surge@1.3.1');
  expect(cli(RegistryType.Plugins, 'uninstall', 'surge-synthesizer/surge@1.3.1')).toMatchSnapshot();
  // uninstalling a non-existent version throws — snapshot stderr text
  const res = cliCatch(RegistryType.Plugins, 'uninstall', 'surge-synthesizer/surge@0.0.0');
  expect(res.stderr.trim()).toMatchSnapshot();
});
