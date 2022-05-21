import { exec, ExecException } from 'child_process';
import path from 'path';

interface CliOutput {
  code: number;
  error: ExecException | null;
  stdout: string;
  stderr: string;
}

const CLI_PATH: string = path.resolve('./', 'dist', 'index.js');

function cli(cmd: string, cwd = '.'): Promise<CliOutput> {
  return new Promise(resolve => {
    exec(`node ${CLI_PATH} ${cmd}`, { cwd }, (error, stdout, stderr) => {
      resolve({
        code: error && error.code ? error.code : 0,
        error,
        stdout,
        stderr
      });
    });
  });
};

function getLastLine(output: CliOutput): string | undefined {
  console.log(output.stdout);
  return output.stdout.trim().split('\n').pop();
}

export {
  cli,
  CliOutput,
  getLastLine
};
