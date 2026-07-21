import { Base, isTests, Package } from '@open-audio-stack/core';
import CliTable3 from 'cli-table3';
import ora, { Ora } from 'ora';
import type { CliOptions } from './types/options.js';

// Default sort for every list/search/filter command: most-downloaded first, falling back to
// name for packages with equal (or no) download data, so results stay stable and alphabetical
// among ties instead of reflecting arbitrary Map insertion order.
export function sortByDownloads(packages: Package[]): Package[] {
  return packages.sort((a: Package, b: Package) => {
    const downloadsDiff = b.getTotalDownloads() - a.getTotalDownloads();
    if (downloadsDiff !== 0) return downloadsDiff;
    return (a.getVersionLatest()?.name || a.slug).localeCompare(b.getVersionLatest()?.name || b.slug);
  });
}

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

export enum OutputType {
  START = 'start',
  SUCCESS = 'success',
  ERROR = 'error',
}

let spinner: Ora | undefined;

export function output(type: OutputType, message: any, options?: CliOptions, base?: Base) {
  // console.log('\n output', type, message, options);
  const useJson = Boolean(options && options.json);
  if (message.message) message = message.message;

  // If logging, ensure core package logging is enabled.
  if (base) {
    if (options && options.log) base.logEnable();
    else base.logDisable();
  }

  // If json, output json only.
  if (useJson) {
    console.log(JSON.stringify({ type, message }, null, 2));
    return;
  }

  // If test, output text only.
  if (isTests()) {
    console.log(message);
    return;
  }

  // If interactive run, use spinners. ora only prefixes the checkmark/cross onto the first
  // line of `message` - fine for a one-line status, but it splices into and misaligns anything
  // multi-line (e.g. a rendered table), so print those separately after a plain succeed/fail.
  const isMultiline = typeof message === 'string' && message.includes('\n');
  if (type === OutputType.START) {
    // Reuse an already-spinning spinner (e.g. the upfront registry sync in index.ts) rather than
    // stopping and restarting one, so the sync-then-command sequence reads as one continuous
    // spinner that just relabels itself, instead of two separate flashes.
    if (spinner && spinner.isSpinning) spinner.text = message;
    else spinner = ora(message).start();
    return;
  } else if (type === OutputType.SUCCESS) {
    if (isMultiline) {
      spinner?.succeed();
      console.log(message);
    } else {
      spinner?.succeed(message);
    }
    return;
  } else {
    if (isMultiline) {
      spinner?.fail();
      console.log(message);
    } else {
      spinner?.fail(message);
    }
    return;
  }
}
