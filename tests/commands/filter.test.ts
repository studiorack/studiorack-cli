import { expect, test } from 'vitest';
import { cli } from '../shared';
import { License, RegistryType } from '@open-audio-stack/core';

test('Filter packages', async () => {
  expect(cli(RegistryType.Plugins, 'filter', 'name', 'Surge XT')).toMatchSnapshot();
  expect(cli(RegistryType.Plugins, 'filter', 'name', 'Surge X')).toMatchSnapshot();
  expect(cli(RegistryType.Plugins, 'filter', 'license', License.CreativeCommonsZerov1Universal)).toMatchSnapshot();
});
