import { cli, CliOutput, getLastLine } from './shared';
import path from 'path';

const PLUGIN_DIR: string = path.join('test', 'plugins');

test('Config set', async () => {
  const output: CliOutput = await cli(`config set pluginFolder "${PLUGIN_DIR}"`);
  expect(getLastLine(output)).toEqual(PLUGIN_DIR);
});

test('Config get', async () => {
  const output: CliOutput = await cli(`config get pluginFolder`);
  expect(getLastLine(output)).toEqual(PLUGIN_DIR);
});
