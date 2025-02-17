import { exec, ExecException } from 'child_process';
import path from 'path';

interface CliOutput {
  exitCode: number;
  error: ExecException | null;
  stdout: string;
  stderr: string;
}
const CLI_PATH: string = path.resolve('./', 'build', 'index.js');

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
  return output;
  // const regex: RegExp = new RegExp(dirApp(), 'g');
  // return output.replace(regex, '${APP_DIR}');
}

export { cli, CliOutput };
