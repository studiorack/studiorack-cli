import { expect, test } from 'vitest';
import { cli, cliCatch } from '../shared';
import { RegistryType } from '@open-audio-stack/core';

test('Install package', async () => {
  expect(cli(RegistryType.Plugins, 'install', 'surge-synthesizer/surge')).toMatchSnapshot();
  expect(cli(RegistryType.Plugins, 'install', 'surge-synthesizer/surge@1.3.1')).toMatchSnapshot();
  // non-existent version may cause execaSync to throw — capture stderr text
  const res = cliCatch(RegistryType.Plugins, 'install', 'surge-synthesizer/surge@0.0.0');
  expect(res.stderr.trim()).toMatchSnapshot();
});
