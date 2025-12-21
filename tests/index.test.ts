import { expect, test } from 'vitest';
import { cli } from './shared';
import { RegistryType } from '@open-audio-stack/core';

test('Root command', async () => {
  expect(cli()).toMatchSnapshot();
});

test('Root command plugins', async () => {
  expect(cli(RegistryType.Plugins)).toMatchSnapshot();
});

test('Root command presets', async () => {
  expect(cli(RegistryType.Presets)).toMatchSnapshot();
});

test('Root command projects', async () => {
  expect(cli(RegistryType.Projects)).toMatchSnapshot();
});
