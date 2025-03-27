import { expect, test } from 'vitest';
import { cli } from '../shared';

test('Config get', async () => {
  expect(cli('config', 'get', 'appDir')).toMatchSnapshot();
  expect(cli('config', 'get', 'pluginsDir')).toMatchSnapshot();
  expect(cli('config', 'get', 'presetsDir')).toMatchSnapshot();
  expect(cli('config', 'get', 'projectsDir')).toMatchSnapshot();
  expect(cli('config', 'get', 'registries')).toMatchSnapshot();
  expect(cli('config', 'get', 'version')).toMatchSnapshot();
});

test('Config set', async () => {
  cli('config', 'set', 'appDir', 'test2');
  expect(cli('config', 'get', 'appDir')).toMatchSnapshot();
  cli('config', 'set', 'appDir', 'test');
  expect(cli('config', 'get', 'appDir')).toMatchSnapshot();
});
