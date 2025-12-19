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

export function cli(...args: string[]): string {
  const result: SyncResult = execaSync('node', [CLI_PATH, ...args], {
    env: { ...process.env, NODE_OPTIONS: '--no-warnings=ExperimentalWarning' },
  });
  return cleanOutput(result.stdout as string);
}

export type CliResult = {
  exitCode: number | null;
  stdout: string;
  stderr: string;
};

export function cliCatch(...args: string[]): CliResult {
  try {
    const result: SyncResult = execaSync('node', [CLI_PATH, ...args], {
      env: { ...process.env, NODE_OPTIONS: '--no-warnings=ExperimentalWarning' },
    });
    return {
      exitCode: result.exitCode ?? 0,
      stdout: cleanOutput(String(result.stdout ?? '')),
      stderr: cleanOutput(String(result.stderr ?? '')),
    };
  } catch (error: any) {
    // execa throws an error with stdout/stderr and exitCode properties
    const exitCode = typeof error.exitCode === 'number' ? error.exitCode : 1;
    const stdout = cleanOutput(String(error.stdout ?? ''));
    const stderr = cleanOutput(String(error.stderr ?? error.message ?? ''));
    return { exitCode, stdout, stderr };
  }
}

export function cleanOutput(output: string): string {
  if (getSystem() === SystemType.Win) {
    output = output.replace(/\\/g, '/');
  }
  return output;
}
