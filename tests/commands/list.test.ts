import { expect, test } from 'vitest';
import { cli } from '../shared';
import { RegistryType } from '@open-audio-stack/core';

test('List packages', async () => {
  expect(cli(RegistryType.Plugins, 'list', '--incompatible')).toMatchSnapshot();
  expect(cli(RegistryType.Plugins, 'list', '--installed')).toMatchSnapshot();
});
