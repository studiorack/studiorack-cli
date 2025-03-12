import { expect, test } from 'vitest';
import { cleanOutput, cliCatch } from './shared';
import { RegistryType } from '@open-audio-stack/core';

test('Root command', async () => {
  const error = cliCatch();
  expect(error.exitCode).toBe(1);
  expect(cleanOutput(error.stderr)).toMatchSnapshot();
});

test('Root command plugins', async () => {
  const error = cliCatch(RegistryType.Plugins);
  expect(error.exitCode).toBe(1);
  expect(cleanOutput(error.stderr)).toMatchSnapshot();
});

test('Root command presets', async () => {
  const error = cliCatch(RegistryType.Presets);
  expect(error.exitCode).toBe(1);
  expect(cleanOutput(error.stderr)).toMatchSnapshot();
});

test('Root command projects', async () => {
  const error = cliCatch(RegistryType.Projects);
  expect(error.exitCode).toBe(1);
  expect(cleanOutput(error.stderr)).toMatchSnapshot();
});
