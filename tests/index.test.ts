import { exec, ExecException } from 'child_process';
import path from 'path';

interface CliOutput {
  code: number;
  error: ExecException | null;
  stdout: string;
  stderr: string;
}

const PLUGIN_DIR: string = path.join('test', 'plugins');

test('Example test', async () => {
  const output: CliOutput = await cli(`studiorack test "${PLUGIN_DIR}"`);
  expect(output.stdout).toEqual(`⎋ /Users/kimturley/Library/Preferences/studiorack/config.json
`);
});

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
