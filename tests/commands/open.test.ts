import { expect, test } from 'vitest';
import { getArchitecture } from '@open-audio-stack/core';
import { cli } from '../shared';

test('Open command help', () => {
  expect(cli('apps', 'open', '--help')).toMatchSnapshot();
});

test('Open command install and run steinberg/validator', () => {
  // steinberg/validator only ships x64 binaries, so which files are "compatible" - and therefore
  // this snapshot's expected output - genuinely differs by architecture (e.g. Arm64 Macs). Key
  // the snapshot by the machine's own architecture so each keeps its own correct expectation
  // instead of one architecture's result clobbering another's on -u.
  expect(cli('apps', 'install', 'steinberg/validator')).toMatchSnapshot(`(${getArchitecture()})`);
  // expect(cli('apps', 'open', 'steinberg/validator', '--', '--help')).toMatchSnapshot();
});

test('Open command with non-existent package', () => {
  expect(cli('apps', 'open', 'non-existent/package')).toMatchSnapshot();
});
