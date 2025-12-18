import { Package } from '@open-audio-stack/core';
import CliTable3 from 'cli-table3';
import ora from 'ora';
import type { CliOptions } from './types/options.js';

export function formatOutput(result: Package[] | Package | undefined, versions?: string[], json?: boolean): string {
  if (!result) return `No results found`;
  if (json) return JSON.stringify(result, null, 2);

  const table = new CliTable3({
    head: ['Id', 'Name', 'Version', 'Installed', 'Date', 'License', 'Tags'],
  });
  if (result instanceof Array) {
    for (const index in result) {
      if (versions && versions.length > 0) {
        versions?.forEach((version: string) => {
          const row = formatRow(result[index], version);
          if (row) table.push(row);
        });
      } else {
        const row = formatRow(result[index]);
        if (row) table.push(row);
      }
    }
  } else {
    if (versions && versions.length > 0) {
      versions?.forEach((version: string) => {
        const row = formatRow(result, version);
        if (row) table.push(row);
      });
    } else {
      const row = formatRow(result);
      if (row) table.push(row);
    }
  }
  if (table.length === 0) return `No results found`;
  return table.toString();
}

export function formatRow(pkg: Package, version?: string) {
  if (!pkg) return;
  const versionNum: string = version || pkg.latestVersion();
  const pkgVersion = pkg.getVersion(versionNum);
  if (!pkgVersion) return;
  return [
    pkg.slug || '-',
    truncateString(pkgVersion.name || '-', 40),
    truncateString(versionNum || '-', 10),
    pkgVersion.installed ? '✓' : '-',
    truncateString(pkgVersion.date?.split('T')[0] || '-', 10),
    truncateString(pkgVersion.license || '-', 10),
    truncateString(pkgVersion.tags?.join(', ') || '-', 30),
  ];
}

// Helper function to format strings
export function truncateString(str: string, num: number) {
  if (str.length > num) {
    return str.slice(0, num) + '...';
  } else {
    return str;
  }
}

export async function withSpinner<T>(
  options: CliOptions | undefined,
  manager: any,
  spinnerMessage: string,
  action: () => Promise<T> | T,
  print?: (result: T, useJson: boolean) => void,
) {
  const useJson = Boolean(options && options.json);
  const spinner = useJson ? undefined : ora(spinnerMessage).start();
  try {
    if (manager) {
      if (options && options.log) manager.logEnable();
      else manager.logDisable();
    }
    const result = await action();
    if (spinner) spinner.succeed(spinnerMessage);

    const isStatusOnly = (val: any) => {
      if (!val || typeof val !== 'object') return false;
      const keys = Object.keys(val);
      // status or type+status objects are treated as status-only
      return keys.length <= 2 && keys.includes('status') && keys.every(k => k === 'status' || k === 'type');
    };

    if (print) {
      print(result, useJson);
    } else {
      if (useJson) {
        console.log(JSON.stringify(result, null, 2));
      } else {
        // When a spinner was used and the result is a simple status object
        // (e.g. { type: 'plugins', status: 'scan completed' }), the spinner
        // already displayed the human-readable status. Avoid printing it again.
        if (spinner && isStatusOnly(result)) {
          // nothing to print
        } else {
          console.log(result as any);
        }
      }
    }
  } catch (err) {
    const errorMessage = err instanceof Error ? err.message : String(err);
    if (spinner) {
      spinner.fail(errorMessage);
    } else {
      if (useJson) console.log(JSON.stringify({ error: errorMessage }, null, 2));
      else console.error(errorMessage);
    }
    process.exit(1);
  }
}
