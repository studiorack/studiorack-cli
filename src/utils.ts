import { Package } from '@open-audio-stack/core';
import CliTable3 from 'cli-table3';

export function formatOutput(result: Package[] | Package | undefined, version?: string, json?: boolean): string {
  if (!result) return `No results found`;
  if (json) return JSON.stringify(result, null, 2);

  const table = new CliTable3({
    head: ['Id', 'Name', 'Version', 'Date', 'License', 'Tags'],
  });
  if (result instanceof Array) {
    if (result.length === 0) {
      return `No results found`;
    }
    for (const index in result) {
      const pkg = result[index];
      const versionNum: string = version || pkg.latestVersion();
      const pkgVersion = pkg.getVersion(versionNum);
      if (pkgVersion) {
        table.push([
          pkg.slug || '-',
          truncateString(pkgVersion.name || '-', 40),
          truncateString(versionNum || '-', 10),
          truncateString(pkgVersion.date?.split('T')[0] || '-', 10),
          truncateString(pkgVersion.license || '-', 20),
          truncateString(pkgVersion.tags?.join(', ') || '-', 30),
        ]);
      }
    }
  } else {
    if (!result) {
      return `No result found`;
    }
    const pkg = result;
    const versionNum: string = version || pkg.latestVersion();
    const pkgVersion = pkg.getVersion(versionNum);
    if (!pkgVersion) {
      return `No result found`;
    }
    table.push([
      '-',
      truncateString(pkgVersion.name || '-', 40),
      truncateString(versionNum || '-', 10),
      truncateString(pkgVersion.date?.split('T')[0] || '-', 10),
      truncateString(pkgVersion.license || '-', 10),
      truncateString(pkgVersion.tags?.join(', ') || '-', 30),
    ]);
  }
  return table.toString();
}

// Helper function to format strings
export function truncateString(str: string, num: number) {
  if (str.length > num) {
    return str.slice(0, num) + '...';
  } else {
    return str;
  }
}
