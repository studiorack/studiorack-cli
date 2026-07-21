import { expect } from 'vitest';
import path from 'path';
import { stripVTControlCharacters } from 'util';
import { execa, Result } from 'execa';
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

// Async (not execaSync): a synchronous spawn blocks the whole worker event loop for as long as
// the CLI command runs (e.g. steinberg/validator install can take 30s+ on a slow CI runner),
// during which Vitest's worker<->main RPC heartbeat (onTaskUpdate) can't be serviced and times
// out at 60s, failing the run with an "Unhandled Error" even though every test passed.
export async function cli(...args: string[]): Promise<CliResult> {
  try {
    const result: Result = await execa('node', [CLI_PATH, ...args], {
      // Some commands (e.g. `create`) prompt via inquirer, which reads stdin. execaSync closed
      // its pipe immediately after the sync call returned, giving inquirer an instant EOF; the
      // async API leaves stdin open indefinitely by default, so it would hang until the test
      // timeout. Ignore stdin explicitly so prompts always force-close the same way (deterministic
      // and non-interactive either way).
      stdin: 'ignore',
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
