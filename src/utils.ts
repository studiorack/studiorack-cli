import CliTable3 from 'cli-table3';

export function formatOutput(result: any, json?: boolean, list?: boolean): string {
  if (!result) {
    return `Plugin not found`;
  }
  if (json) {
    return JSON.stringify(result, null, 2);
  }
  const table = new CliTable3({
    head: ['Id', 'Name', 'Version', 'Date', 'License', 'Tags'],
  });
  if (list) {
    if (result.length === 0) {
      return `No results found`;
    }
    for (const key in result) {
      const latest = result[key].versions ? result[key].versions[result[key].version] : result[key];
      table.push([
        latest.id || key || '-',
        truncateString(latest.name || '-', 40),
        truncateString(result[key].version || '-', 10),
        truncateString(latest.date?.split('T')[0] || '-', 10),
        truncateString(latest.license || '-', 20),
        truncateString(latest.tags?.join(', ') || '-', 30),
      ]);
    }
  } else {
    const latest = result.versions ? result.versions[result.version] : result;
    table.push([
      latest.id || '-',
      truncateString(latest.name || '-', 40),
      truncateString(result.version || '-', 10),
      truncateString(latest.date?.split('T')[0] || '-', 10),
      truncateString(latest.license || '-', 10),
      truncateString(latest.tags?.join(', ') || '-', 30),
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
