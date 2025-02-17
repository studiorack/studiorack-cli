import { Command } from 'commander';
import { CliOptions } from '../types/options.js';
import { inputGetParts, ManagerLocal, Package, PackageVersion } from '@open-audio-stack/core';

export function get(command: Command, manager: ManagerLocal) {
  command
    .command('get <input>')
    .option('-l, --log', 'Enable logging')
    .description('Get package metadata from registry')
    .action((input: string, options: CliOptions) => {
      if (options.log) manager.logEnable();
      else manager.logDisable();
      const [slug, version] = inputGetParts(input);

      const pkg: Package | undefined = manager.getPackage(slug);
      if (!pkg) console.error(`Package ${slug} not found in registry`);
      const versionNum: string = version || pkg?.latestVersion() || '0.0.0';
      const pkgVersion: PackageVersion | undefined = pkg?.getVersion(versionNum);
      if (!pkgVersion) console.error(`Package ${slug} version ${versionNum} not found in registry`);

      console.log(pkgVersion);
    });
}
