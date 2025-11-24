import { Package } from '@open-audio-stack/core';
import CliTable3 from 'cli-table3';

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
