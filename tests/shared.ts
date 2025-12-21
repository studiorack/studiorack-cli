import { expect } from 'vitest';
import path from 'path';
import { stripVTControlCharacters } from 'util';
import { execaSync, SyncResult } from 'execa';
import { getSystem, SystemType } from '@open-audio-stack/core';

const CLI_PATH: string = path.resolve('./', 'build', 'index.js');

// ANSI escape codes for colors and formatting vary across systems
// Sanitize output for snapshot testing (only apply to strings)
expect.addSnapshotSerializer({
  serialize: val => stripVTControlCharacters(val as string),
  test: val => typeof val === 'string',
});

export type CliResult = {
  code: number | null;
  out: string;
  err: string;
};

export function cli(...args: string[]): CliResult {
  try {
    const result: SyncResult = execaSync('node', [CLI_PATH, ...args], {
      env: { ...process.env, NODE_OPTIONS: '--no-warnings=ExperimentalWarning' },
    });
    return {
      code: result.exitCode ?? 0,
      out: cleanOutput(String(result.stdout ?? '')),
      err: cleanOutput(String(result.stderr ?? '')),
    };
  } catch (error: any) {
    return {
      code: error.exitCode ?? 1,
      out: cleanOutput(String(error.stdout ?? '')),
      err: cleanOutput(String(error.stderr ?? error.message ?? '')),
    };
  }
}

export function cleanOutput(output: string): string {
  if (getSystem() === SystemType.Win) {
    output = output.replace(/\\/g, '/');
  }
  return output;
}
