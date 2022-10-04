#!/usr/bin/env node
import fs from 'fs';
import path from 'path';

const [_first, _second, ...args] = process.argv;

export const logger = (message) => {
  // Render message
  if (message) {
    console.log();
    for (let msg of message.split('\n')) {
      console.log(msg);
    }
  }
  console.log();
};

if (args[0] === '--help') {
  logger({ message: 'Usage: npx @gioboa/vite-module-federation' });
  process.exit(0);
}

export const run = () => {
  const messages = [];
  const viteConfigLocation = path.resolve('./config.vite.js');
  if (!fs.existsSync(viteConfigLocation)) {
    messages.push(`Vite configuration not found.`);
  }

  if (!!messages.length) {
    logger(messages.join('\n'));
  }
};

run(args);
