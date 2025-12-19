import { expect, test } from 'vitest';
import { cliCatch } from '../shared';
import path from 'path';
import { RegistryType } from '@open-audio-stack/core';

const APP_DIR: string = 'test';
const PROJECT_DIR: string = path.join(APP_DIR, 'create-project');

test('Create package', async () => {
  // The create command may prompt/abort during tests — capture textual output
  const res = cliCatch(RegistryType.Plugins, 'create', PROJECT_DIR);
  expect((res.stderr + '\n' + res.stdout).trim()).toMatchSnapshot();
});
