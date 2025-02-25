import path from 'path';
import { execa } from 'execa';
import { expect, test } from 'vitest';

const CLI: string = path.resolve('./', 'build', 'index.js');

test('Config get', async () => {
  const appDir = await execa('node', [CLI, 'config', 'get', 'appDir']);
  expect(appDir.stdout).toMatchSnapshot();
  const pluginsDir = await execa('node', [CLI, 'config', 'get', 'pluginsDir']);
  expect(pluginsDir.stdout).toMatchSnapshot();
  const presetsDir = await execa('node', [CLI, 'config', 'get', 'presetsDir']);
  expect(presetsDir.stdout).toMatchSnapshot();
  const projectsDir = await execa('node', [CLI, 'config', 'get', 'projectsDir']);
  expect(projectsDir.stdout).toMatchSnapshot();
  const registries = await execa('node', [CLI, 'config', 'get', 'registries']);
  expect(registries.stdout).toMatchSnapshot();
  const version = await execa('node', [CLI, 'config', 'get', 'version']);
  expect(version.stdout).toMatchSnapshot();
});

test('Config set', async () => {
  await execa('node', [CLI, 'config', 'set', 'appDir', 'test2']);
  const appDir = await execa('node', [CLI, 'config', 'get', 'appDir']);
  expect(appDir.stdout).toMatchSnapshot();

  await execa('node', [CLI, 'config', 'set', 'appDir', 'test']);
  const appDir2 = await execa('node', [CLI, 'config', 'get', 'appDir']);
  expect(appDir2.stdout).toMatchSnapshot();
});
