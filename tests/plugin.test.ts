import { cli, CliOutput, getLastLine } from './shared';
import path from 'path';
import { dirDelete } from '@studiorack/core';

const PLUGIN_DIR: string = path.join('test', 'plugins');
const PLUGIN_ID: string = 'studiorack/adlplug/adlplug';

beforeAll(async () => {
  await cli(`config set pluginFolder "${PLUGIN_DIR}"`);
  dirDelete(PLUGIN_DIR);
});

test('Plugin install', async () => {
  const output: CliOutput = await cli(`plugin install "${PLUGIN_ID}" --json`);
  // Replace with real test of cli output
  expect(getLastLine(output)).toEqual('⤓ https://studiorack.github.io/studiorack-registry/index.json');
});
