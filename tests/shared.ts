import { dirAppData } from '@studiorack/core';
import { exec, ExecException } from 'child_process';
import path from 'path';

interface CliOutput {
  exitCode: number;
  error: ExecException | null;
  stdout: string;
  stderr: string;
}

const APP_DIR: string = path.join(dirAppData(), 'studiorack');
const CLI_PATH: string = path.resolve('./', 'dist', 'index.js');

function cli(cmd: string, cwd = '.'): Promise<CliOutput> {
  return new Promise(resolve => {
    exec(`node ${CLI_PATH} ${cmd}`, { cwd }, (error, stdout, stderr) => {
      resolve({
        exitCode: error && error.code ? error.code : 0,
        error,
        stdout: cleanOutput(stdout),
        stderr,
      });
    });
  });
}

function cleanOutput(output: string): string {
  const regex: RegExp = new RegExp(APP_DIR, 'g');
  return output.replace(regex, '${APP_DIR}');
}

export { cli, CliOutput };
