import { expect, test } from 'vitest';
import { cli, CliOutput } from '../shared';
import path from 'path';

const PLUGIN_DIR: string = path.join('test', 'plugins');

test('Config set', async () => {
  const output: CliOutput = await cli(`config set pluginFolder "${PLUGIN_DIR}"`);
  expect(output.exitCode).toBe(0);
  expect(output.stdout).toMatch(PLUGIN_DIR);
});

test('Config get', async () => {
  const output: CliOutput = await cli(`config get pluginFolder`);
  expect(output.exitCode).toBe(0);
  expect(output.stdout).toMatch(PLUGIN_DIR);
});
