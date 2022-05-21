import { exec, ExecException } from 'child_process';

interface CliOutput {
  code: number;
  error: ExecException | null;
  stdout: string;
  stderr: string;
}

function cli(cmd: string, cwd = '.'): Promise<CliOutput> {
  return new Promise(resolve => {
    exec(cmd, { cwd }, (error, stdout, stderr) => {
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
  return output.stdout.trim().split('\n').pop();
}

export {
  cli,
  CliOutput,
  getLastLine
};
