import { expect, test } from 'vitest';
import { cli } from '../shared';
import { RegistryType } from '@open-audio-stack/core';

test('Sync packages', async () => {
  expect(await cli(RegistryType.Plugins, 'sync')).toMatchSnapshot();
});
