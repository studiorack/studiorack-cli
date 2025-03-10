import { expect, test } from 'vitest';
import { cli } from '../shared';
import { RegistryType } from '@open-audio-stack/core';

test('Search packages', async () => {
  expect(cli(RegistryType.Plugins, 'search', 'XT')).toMatchSnapshot();
  expect(cli(RegistryType.Plugins, 'search', 'ZXT')).toMatchSnapshot();
});
