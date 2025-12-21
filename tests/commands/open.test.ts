import { expect, test } from 'vitest';
import { cli } from '../shared';
import { getSystem } from '@open-audio-stack/core';

test('Open command help', () => {
  expect(cli('apps', 'open', '--help')).toMatchSnapshot();
});

test(`Open command install and run steinberg/validator ${getSystem()}`, () => {
  expect(cli('apps', 'install', 'steinberg/validator')).toMatchSnapshot();
  expect(cli('apps', 'open', 'steinberg/validator', '--', '--help')).toMatchSnapshot();
});

test('Open command with non-existent package', () => {
  expect(cli('apps', 'open', 'non-existent/package')).toMatchSnapshot();
});
