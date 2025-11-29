import { expect, test } from 'vitest';
import { cli, cliCatch, cleanOutput } from '../shared';
import { getSystem, SystemType } from '@open-audio-stack/core';

test('Open command help', () => {
  const result = cli('apps', 'open', '--help');
  expect(cleanOutput(result)).toMatchSnapshot();
});

test(`Open command install and run steinberg/validator ${getSystem()}`, () => {
  // First install the app
  const installResult = cli('apps', 'install', 'steinberg/validator');
  expect(installResult).toContain('Installed steinberg/validator');

  const openResult = cli('apps', 'open', 'steinberg/validator', '--', '--help');
  expect(cleanOutput(openResult)).toMatchSnapshot();
});

test('Open command with non-existent package', () => {
  const error = cliCatch('apps', 'open', 'non-existent/package');
  expect(error.exitCode).toBe(1);
  expect(cleanOutput(error.stderr)).toMatchSnapshot();
});
