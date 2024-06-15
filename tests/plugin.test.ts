import { beforeAll, expect, test } from 'vitest';
import { cli, CliOutput } from './shared';
import path from 'path';
import { dirDelete } from '@studiorack/core';

const PLUGIN_DIR: string = path.join('test', 'plugins');
const PLUGIN_ID: string = 'studiorack/mda/mda';

beforeAll(async () => {
  await cli(`config set pluginFolder "${PLUGIN_DIR}"`);
  dirDelete(PLUGIN_DIR);
});

test('Plugin get', async () => {
  const output: CliOutput = await cli(`plugin get "${PLUGIN_ID}" --json`);
  expect(output.exitCode).toBe(0);
  expect(output.stdout).toMatchSnapshot();
});

test('Plugin install', async () => {
  const output: CliOutput = await cli(`plugin install "${PLUGIN_ID}" --json`);
  expect(output.exitCode).toBe(0);
  expect(output.stdout).toMatchSnapshot();
});
