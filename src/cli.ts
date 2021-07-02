import * as fs from 'fs';
import * as yargs from 'yargs';
import { Documentation } from './index';

export async function main() {
  const args = yargs
    .usage('Usage: $0')
    .option('output', { type: 'string', alias: 'o', required: false, desc: 'Output filename (defaults to API.md)' })
    .example('$0', 'Generate documentation for the current module as a single file (auto-resolves node depedencies)')
    .argv;

  const docs = await Documentation.forLocalPackage(process.cwd(), { readme: false });

  const output = args.output ?? 'API.md';

  const markdown = docs.render();
  fs.writeFileSync(output, markdown);
}

main().catch(e => {
  console.error(e);
  process.exit(1);
});
