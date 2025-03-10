import { expect, test } from 'vitest';
import { cli } from '../shared';
import { RegistryType } from '@open-audio-stack/core';

test('Scan packages', async () => {
  expect(cli(RegistryType.Plugins, 'scan')).toMatchSnapshot();
});
