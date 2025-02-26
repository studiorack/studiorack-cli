import path from 'path';
import { execaSync, SyncResult } from 'execa';
import { getSystem, SystemType } from '@open-audio-stack/core';

const CLI_PATH: string = path.resolve('./', 'build', 'index.js');

export function cli(...args: string[]): string {
  const result: SyncResult = execaSync('node', [CLI_PATH, ...args]);
  return cleanOutput(result.stdout as string);
}

function cleanOutput(output: string): string {
  if (getSystem() === SystemType.Win) {
    output = output.replace(/\\/g, '/');
  }
  return output;
}
