import { BuildHelperParams, federationBuilder } from '@softarc/native-federation/build.js';
import * as fs from 'fs';
import * as path from 'path';

export async function federation(params: BuildHelperParams) {
  return {
    name: 'vite-module-federation', // required, will show up in warnings and errors
    async options(o: unknown) {
      await federationBuilder.init(params);
      o!['external'] = federationBuilder.externals;
    },
    async closeBundle() {
      await federationBuilder.build();
      transformIndexHtml(params);
    },
  };
}

function transformIndexHtml(params: BuildHelperParams): void {
  const filePath = path.join(params.options.workspaceRoot, params.options.outputPath, 'index.html');

  const html = fs.readFileSync(filePath, 'utf-8');
  const modified = html.replace(/type="module"/g, 'type="module-shim"');
  fs.writeFileSync(filePath, modified);
}
