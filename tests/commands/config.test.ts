import { expect, test } from 'vitest';
import { cli } from '../shared';

test('Config get', async () => {
  expect(await cli('config', 'get', 'appDir')).toMatchSnapshot();
  expect(await cli('config', 'get', 'pluginsDir')).toMatchSnapshot();
  expect(await cli('config', 'get', 'presetsDir')).toMatchSnapshot();
  expect(await cli('config', 'get', 'projectsDir')).toMatchSnapshot();
  expect(await cli('config', 'get', 'registries')).toMatchSnapshot();
  expect(await cli('config', 'get', 'version')).toMatchSnapshot();
});

test('Config set', async () => {
  await cli('config', 'set', 'appDir', 'test2');
  expect(await cli('config', 'get', 'appDir')).toMatchSnapshot();
  await cli('config', 'set', 'appDir', 'test');
  expect(await cli('config', 'get', 'appDir')).toMatchSnapshot();
});
