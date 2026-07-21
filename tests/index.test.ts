import { expect, test } from 'vitest';
import { cli } from './shared';
import { RegistryType } from '@open-audio-stack/core';

test('Root command', async () => {
  expect(await cli()).toMatchSnapshot();
});

test('Root command plugins', async () => {
  expect(await cli(RegistryType.Plugins)).toMatchSnapshot();
});

test('Root command presets', async () => {
  expect(await cli(RegistryType.Presets)).toMatchSnapshot();
});

test('Root command projects', async () => {
  expect(await cli(RegistryType.Projects)).toMatchSnapshot();
});
