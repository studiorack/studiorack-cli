import { expect, test } from 'vitest';
import { cli } from '../shared';
import path from 'path';
import { RegistryType } from '@open-audio-stack/core';

const APP_DIR: string = 'test';
const PROJECT_DIR: string = path.join(APP_DIR, 'create-project');

test('Create package', async () => {
  expect(cli(RegistryType.Plugins, 'create', PROJECT_DIR)).toMatchSnapshot();
});
