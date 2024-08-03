import { beforeAll, expect, test } from 'vitest';
import { cli, CliOutput } from './shared';
import path from 'path';
import { PluginVersion, PluginVersionLocal, dirDelete } from '@studiorack/core';

const PLUGIN_DIR: string = path.join('test', 'plugins');
const PLUGIN_ID: string = 'studiorack/mda';
const PLUGIN: PluginVersion = {
  name: 'MDA',
  author: 'Paul Kellett',
  homepage: 'https://github.com/studiorack/mda',
  description: 'Collection of effect plug-ins, from delay to an overdrive and a vocoder.',
  date: '2020-12-20T08:00:00.000Z',
  license: 'gpl-3.0',
  tags: ['Effect', 'Delay', 'Vocoder'],
  files: {
    audio: {
      url: 'https://studiorack.github.io/studiorack-registry/plugins/studiorack/mda/mda.flac',
      size: 127392,
    },
    image: {
      url: 'https://studiorack.github.io/studiorack-registry/plugins/studiorack/mda/mda.jpg',
      size: 104156,
    },
    linux: {
      url: 'https://github.com/studiorack/mda/releases/download/v1.0.4/mda-linux.zip',
      size: 70938,
    },
    mac: {
      url: 'https://github.com/studiorack/mda/releases/download/v1.0.4/mda-mac.zip',
      size: 5122516,
    },
    win: {
      url: 'https://github.com/studiorack/mda/releases/download/v1.0.4/mda-win.zip',
      size: 1247768,
    },
  },
  id: 'studiorack/mda',
  version: '1.0.4',
};
const PLUGIN_LOCAL: PluginVersionLocal = {
  name: 'MDA',
  author: 'Paul Kellett',
  homepage: 'https://github.com/studiorack/mda',
  description: 'Collection of effect plug-ins, from delay to an overdrive and a vocoder.',
  date: '2020-12-20T08:00:00.000Z',
  license: 'gpl-3.0',
  tags: ['Effect', 'Delay', 'Vocoder'],
  files: {
    audio: {
      url: 'https://studiorack.github.io/studiorack-registry/plugins/studiorack/mda/mda.flac',
      size: 127392,
    },
    image: {
      url: 'https://studiorack.github.io/studiorack-registry/plugins/studiorack/mda/mda.jpg',
      size: 104156,
    },
    linux: {
      url: 'https://github.com/studiorack/mda/releases/download/v1.0.4/mda-linux.zip',
      size: 70938,
    },
    mac: {
      url: 'https://github.com/studiorack/mda/releases/download/v1.0.4/mda-mac.zip',
      size: 5122516,
    },
    win: {
      url: 'https://github.com/studiorack/mda/releases/download/v1.0.4/mda-win.zip',
      size: 1247768,
    },
  },
  id: 'studiorack/mda',
  version: '1.0.4',
  paths: [],
  status: 'installed',
};

if (process.platform === 'win32') {
  PLUGIN_LOCAL.paths = [
    path.join('test', 'plugins', 'DLL', 'studiorack', 'mda', '1.0.4', 'mda Bandisto.dll'),
    path.join('test', 'plugins', 'DLL', 'studiorack', 'mda', '1.0.4', 'mda BeatBox.dll'),
    path.join('test', 'plugins', 'DLL', 'studiorack', 'mda', '1.0.4', 'mda Combo.dll'),
    path.join('test', 'plugins', 'DLL', 'studiorack', 'mda', '1.0.4', 'mda De-ess.dll'),
    path.join('test', 'plugins', 'DLL', 'studiorack', 'mda', '1.0.4', 'mda Degrade.dll'),
    path.join('test', 'plugins', 'DLL', 'studiorack', 'mda', '1.0.4', 'mda Delay.dll'),
    path.join('test', 'plugins', 'DLL', 'studiorack', 'mda', '1.0.4', 'mda Detune.dll'),
    path.join('test', 'plugins', 'DLL', 'studiorack', 'mda', '1.0.4', 'mda Dither.dll'),
    path.join('test', 'plugins', 'DLL', 'studiorack', 'mda', '1.0.4', 'mda DubDelay.dll'),
    path.join('test', 'plugins', 'DLL', 'studiorack', 'mda', '1.0.4', 'mda Dynamics.dll'),
    path.join('test', 'plugins', 'DLL', 'studiorack', 'mda', '1.0.4', 'mda Envelope.dll'),
    path.join('test', 'plugins', 'DLL', 'studiorack', 'mda', '1.0.4', 'mda Image.dll'),
    path.join('test', 'plugins', 'DLL', 'studiorack', 'mda', '1.0.4', 'mda Leslie.dll'),
    path.join('test', 'plugins', 'DLL', 'studiorack', 'mda', '1.0.4', 'mda Limiter.dll'),
    path.join('test', 'plugins', 'DLL', 'studiorack', 'mda', '1.0.4', 'mda Loudness.dll'),
    path.join('test', 'plugins', 'DLL', 'studiorack', 'mda', '1.0.4', 'mda MultiBand.dll'),
    path.join('test', 'plugins', 'DLL', 'studiorack', 'mda', '1.0.4', 'mda Overdrive.dll'),
    path.join('test', 'plugins', 'DLL', 'studiorack', 'mda', '1.0.4', 'mda RePsycho!.dll'),
    path.join('test', 'plugins', 'DLL', 'studiorack', 'mda', '1.0.4', 'mda RezFilter.dll'),
    path.join('test', 'plugins', 'DLL', 'studiorack', 'mda', '1.0.4', 'mda RingMod.dll'),
    path.join('test', 'plugins', 'DLL', 'studiorack', 'mda', '1.0.4', 'mda RoundPan.dll'),
    path.join('test', 'plugins', 'DLL', 'studiorack', 'mda', '1.0.4', 'mda Shepard.dll'),
    path.join('test', 'plugins', 'DLL', 'studiorack', 'mda', '1.0.4', 'mda Splitter.dll'),
    path.join('test', 'plugins', 'DLL', 'studiorack', 'mda', '1.0.4', 'mda Stereo.dll'),
    path.join('test', 'plugins', 'DLL', 'studiorack', 'mda', '1.0.4', 'mda SubSynth.dll'),
    path.join('test', 'plugins', 'DLL', 'studiorack', 'mda', '1.0.4', 'mda Talkbox.dll'),
    path.join('test', 'plugins', 'DLL', 'studiorack', 'mda', '1.0.4', 'mda TestTone.dll'),
    path.join('test', 'plugins', 'DLL', 'studiorack', 'mda', '1.0.4', 'mda ThruZero.dll'),
    path.join('test', 'plugins', 'DLL', 'studiorack', 'mda', '1.0.4', 'mda Tracker.dll'),
    path.join('test', 'plugins', 'DLL', 'studiorack', 'mda', '1.0.4', 'mda VocInput.dll'),
    path.join('test', 'plugins', 'DLL', 'studiorack', 'mda', '1.0.4', 'mda Vocoder.dll'),
  ];
} else if (process.platform === 'darwin') {
  PLUGIN_LOCAL.paths = [
    path.join('test', 'plugins', 'Components', 'studiorack', 'mda', '1.0.4', 'mda.component'),
    path.join('test', 'plugins', 'VST', 'studiorack', 'mda', '1.0.4', 'mda Ambience.vst'),
    path.join('test', 'plugins', 'VST', 'studiorack', 'mda', '1.0.4', 'mda Bandisto.vst'),
    path.join('test', 'plugins', 'VST', 'studiorack', 'mda', '1.0.4', 'mda BeatBox.vst'),
    path.join('test', 'plugins', 'VST', 'studiorack', 'mda', '1.0.4', 'mda Combo.vst'),
    path.join('test', 'plugins', 'VST', 'studiorack', 'mda', '1.0.4', 'mda DX10.vst'),
    path.join('test', 'plugins', 'VST', 'studiorack', 'mda', '1.0.4', 'mda De-ess.vst'),
    path.join('test', 'plugins', 'VST', 'studiorack', 'mda', '1.0.4', 'mda Degrade.vst'),
    path.join('test', 'plugins', 'VST', 'studiorack', 'mda', '1.0.4', 'mda Delay.vst'),
    path.join('test', 'plugins', 'VST', 'studiorack', 'mda', '1.0.4', 'mda Detune.vst'),
    path.join('test', 'plugins', 'VST', 'studiorack', 'mda', '1.0.4', 'mda Dither.vst'),
    path.join('test', 'plugins', 'VST', 'studiorack', 'mda', '1.0.4', 'mda DubDelay.vst'),
    path.join('test', 'plugins', 'VST', 'studiorack', 'mda', '1.0.4', 'mda Dynamics.vst'),
    path.join('test', 'plugins', 'VST', 'studiorack', 'mda', '1.0.4', 'mda Image.vst'),
    path.join('test', 'plugins', 'VST', 'studiorack', 'mda', '1.0.4', 'mda JX10.vst'),
    path.join('test', 'plugins', 'VST', 'studiorack', 'mda', '1.0.4', 'mda Leslie.vst'),
    path.join('test', 'plugins', 'VST', 'studiorack', 'mda', '1.0.4', 'mda Limiter.vst'),
    path.join('test', 'plugins', 'VST', 'studiorack', 'mda', '1.0.4', 'mda Looplex.vst'),
    path.join('test', 'plugins', 'VST', 'studiorack', 'mda', '1.0.4', 'mda Loudness.vst'),
    path.join('test', 'plugins', 'VST', 'studiorack', 'mda', '1.0.4', 'mda MultiBand.vst'),
    path.join('test', 'plugins', 'VST', 'studiorack', 'mda', '1.0.4', 'mda Overdrive.vst'),
    path.join('test', 'plugins', 'VST', 'studiorack', 'mda', '1.0.4', 'mda Piano.vst'),
    path.join('test', 'plugins', 'VST', 'studiorack', 'mda', '1.0.4', 'mda RePsycho!.vst'),
    path.join('test', 'plugins', 'VST', 'studiorack', 'mda', '1.0.4', 'mda RezFilter.vst'),
    path.join('test', 'plugins', 'VST', 'studiorack', 'mda', '1.0.4', 'mda RingMod.vst'),
    path.join('test', 'plugins', 'VST', 'studiorack', 'mda', '1.0.4', 'mda RoundPan.vst'),
    path.join('test', 'plugins', 'VST', 'studiorack', 'mda', '1.0.4', 'mda Shepard.vst'),
    path.join('test', 'plugins', 'VST', 'studiorack', 'mda', '1.0.4', 'mda Splitter.vst'),
    path.join('test', 'plugins', 'VST', 'studiorack', 'mda', '1.0.4', 'mda Stereo.vst'),
    path.join('test', 'plugins', 'VST', 'studiorack', 'mda', '1.0.4', 'mda SubBass.vst'),
    path.join('test', 'plugins', 'VST', 'studiorack', 'mda', '1.0.4', 'mda Talkbox.vst'),
    path.join('test', 'plugins', 'VST', 'studiorack', 'mda', '1.0.4', 'mda TestTone.vst'),
    path.join('test', 'plugins', 'VST', 'studiorack', 'mda', '1.0.4', 'mda ThruZero.vst'),
    path.join('test', 'plugins', 'VST', 'studiorack', 'mda', '1.0.4', 'mda Tracker.vst'),
    path.join('test', 'plugins', 'VST', 'studiorack', 'mda', '1.0.4', 'mda VocInput.vst'),
    path.join('test', 'plugins', 'VST', 'studiorack', 'mda', '1.0.4', 'mda Vocoder.vst'),
    path.join('test', 'plugins', 'VST', 'studiorack', 'mda', '1.0.4', 'mda ePiano.vst'),
  ];
} else {
  PLUGIN_LOCAL.paths = [path.join('test', 'plugins', 'LV2', 'studiorack', 'mda', '1.0.4', 'mda.lv2')];
}

function format(obj: any) {
  return JSON.stringify(obj, null, 2);
}

beforeAll(async () => {
  await cli(`config set pluginFolder "${PLUGIN_DIR}"`);
  dirDelete(PLUGIN_DIR);
});

test('Plugin get', async () => {
  const output: CliOutput = await cli(`plugin get "${PLUGIN_ID}" --json`);
  expect(output.exitCode).toBe(0);
  expect(output.stdout).toMatch(format(PLUGIN));
});

test('Plugin install', async () => {
  const output: CliOutput = await cli(`plugin install "${PLUGIN_ID}" --json`);
  expect(output.exitCode).toBe(0);
  expect(output.stdout).toMatch(format(PLUGIN_LOCAL));
});

test('Plugin getLocal', async () => {
  const output: CliOutput = await cli(`plugin getLocal "${PLUGIN_ID}" --json`);
  expect(output.exitCode).toBe(0);
  expect(output.stdout).toMatch(format(PLUGIN_LOCAL));
});

test('Plugin listLocal', async () => {
  const output: CliOutput = await cli(`plugin listLocal --json`);
  expect(output.exitCode).toBe(0);
  expect(output.stdout).toMatch(format([PLUGIN_LOCAL]));
});

test('Plugin search', async () => {
  const output: CliOutput = await cli(`plugin search "mda" --json`);
  expect(output.exitCode).toBe(0);
  expect(output.stdout).toMatch(format([PLUGIN]));
});

test('Plugin uninstall', async () => {
  const PLUGIN_LOCAL_UPDATED: any = Object.assign({}, PLUGIN_LOCAL);
  PLUGIN_LOCAL_UPDATED.paths = [];
  PLUGIN_LOCAL_UPDATED.status = 'available';
  const output: CliOutput = await cli(`plugin uninstall "${PLUGIN_ID}" --json`);
  expect(output.exitCode).toBe(0);
  expect(output.stdout).toMatch(format(PLUGIN_LOCAL_UPDATED));
});
