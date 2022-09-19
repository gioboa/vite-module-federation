# Vite/Rollup plugin for Module Federation

## Thanks 🤝

Big thanks to:

[Manfred Steyer](https://twitter.com/manfredsteyer), Speaker, Trainer, Consultant and Author with focus on Angular. Google Developer Expert (GDE) and Microsoft MVP.

who collaborate with me to make this possible.

## Reason why 🤔

[Microservices](https://martinfowler.com/articles/microservices.html) nowadays is a well known concept and maybe you are using it in your current company.
Do you know that now you can apply similar ideas in the Frontend?
With [Module Federation](https://blog.logrocket.com/building-micro-frontends-webpacks-module-federation/#:~:text=Module%20federation%20is%20a%20JavaScript,between%20two%20different%20application%20codebases.) you can load separately compiled and deployed code into an unique application.
This plugin makes Module Federation work together with [Vite](https://vitejs.dev/).

## Working implementation

👉 Here you can find a [working implementation](https://github.com/gioboa/svelte-microfrontend-demo) that shows how use the plugin.

## Getting started 🚀

This plugin is based on top of [native-federation](https://www.npmjs.com/package/@softarc/native-federation) so this library is a [peer dependency](https://docs.npmjs.com/cli/v8/configuring-npm/package-json#peerdependencies).

You need to extend the Vite configuration with this plugin:

```typescript
import { defineConfig } from 'vite';
import { federation } from '@gioboa/vite-module-federation';
import { esBuildAdapter } from './module-federation/esbuild-adapter';

// https://vitejs.dev/config/
export default defineConfig(async () => ({
  plugins: [
    federation({
      options: {
        workspaceRoot: __dirname,
        outputPath: 'dist',
        tsConfig: 'tsconfig.json',
        federationConfig: 'module-federation/federation.config.cjs',
        verbose: false,
      },
      adapter: esBuildAdapter,
    }),
    [...]
  ],
}));
```

<br>

### Second step

You need to define two different configurations in the `federationConfig` property.<br>
Here two examples:

- [host](https://www.npmjs.com/package/@softarc/native-federation#configuring-hosts)
- [remote](https://www.npmjs.com/package/@softarc/native-federation#configuring-remotes)
  <br><br>

### Last step

As this plugin is tooling-agnostic, you need a simple adapter for your bundler, it's just a matter of one function.
Here an example:

```typescript
import type { BuildAdapter } from '@softarc/native-federation/build';
import * as esbuild from 'esbuild';

export const esBuildAdapter: BuildAdapter = async (options) => {
  const { entryPoint, external, outfile } = options;

  await esbuild.build({
    entryPoints: [entryPoint],
    external,
    outfile,
    bundle: true,
    sourcemap: false,
    minify: true,
    format: 'esm',
    target: ['esnext'],
  });
};
```

<br>

### So far so good 🎉

Now you are ready to use Module Federation in Vite!
