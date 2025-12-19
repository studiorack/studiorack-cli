import { Base, Package } from '@open-audio-stack/core';
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

// Simple spinner registry for the `output` API so callers can start/stop spinners
const _spinners: Map<string, ReturnType<typeof ora>> = new Map();

export enum OutputType {
  START = 'start',
  SUCCESS = 'success',
  ERROR = 'error',
}

/**
 * Low level output API that callers can use to mark start, success, and error
 * states for long-running operations. This provides clear control over when
 * spinners start/stop and when textual/json output is emitted.
 */
export function output(type: OutputType, payload: any, options?: CliOptions, base?: Base) {
  const useJson = Boolean(options && options.json);
  const isTest = Boolean(process.env.VITEST || process.env.NODE_ENV === 'test');
  const key = String(typeof payload === 'string' ? payload : (payload && payload.message) || payload || '');

  if (type === OutputType.START) {
    // configure base logging at start
    if (base) {
      if (options && options.log) base.logEnable();
      else base.logDisable();
    }

    if (useJson) {
      console.log(JSON.stringify({ status: 'inprogress', message: key }, null, 2));
      return;
    }

    if (isTest) {
      console.log(key);
      return;
    }

    // interactive run: create and start a spinner for this key
    const s = ora(key).start();
    _spinners.set(key, s);
    return;
  }

  if (type === OutputType.SUCCESS) {
    // If JSON requested and payload is an object, print it
    if (useJson && typeof payload === 'object') {
      console.log(JSON.stringify(payload, null, 2));
      return;
    }

    // For non-json modes we expect payload to be a string (commands should pass a string)
    const messageOut = String(payload);

    if (isTest) {
      // In test mode only print the final payload (no start/checkmark).
      console.log(messageOut);
      return;
    }

    const s = _spinners.get(key);
    if (s) {
      s.succeed(key);
      if (messageOut && messageOut !== key) console.log(messageOut);
      _spinners.delete(key);
      return;
    }

    // fallback
    console.log(key);
    if (messageOut && messageOut !== key) console.log(messageOut);
    return;
  }

  // ERROR
  const errMsg = payload instanceof Error ? payload.message : String(payload);
  if (useJson) {
    console.log(JSON.stringify({ error: errMsg }, null, 2));
    return;
  }

  if (isTest) {
    console.error(errMsg);
    return;
  }

  const s2 = _spinners.get(key);
  if (s2) {
    s2.fail(errMsg);
    _spinners.delete(key);
    return;
  }

  console.error(errMsg);
}
