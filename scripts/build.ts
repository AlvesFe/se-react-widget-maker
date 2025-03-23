import { execSync } from 'child_process';
import { copyFileSync, existsSync, mkdirSync, readdirSync, readFileSync, rmSync, writeFileSync } from 'fs';
import { join } from 'path';
import chalk from 'chalk';

const root = process.cwd();
const dist = join(root, 'dist');
const build = join(root, 'build');

execSync('yarn tsc -b && yarn vite build', { stdio: 'inherit' });

if (!existsSync(build)) {
  mkdirSync(build);
} else {
  rmSync(build, { recursive: true });
  mkdirSync(build);
}

const indexHtml = join(dist, 'index.html');
const html = readFileSync(indexHtml, 'utf-8');
writeFileSync(indexHtml, html.replace('></script>', ' defer></script>'));

console.log(chalk.white('Copying files to the build folder...'));
copyFileSync(join(dist, 'index.html'), join(build, 'index.html'));
readdirSync(join(dist, 'assets')).forEach(file => {
  if (file.endsWith('.js')) {
    copyFileSync(join(dist, 'assets', file), join(build, 'index.js'));
  }
});

rmSync(dist, { recursive: true });

console.log(chalk.green('Files copied to the build folder!'));

console.table([
  { 'File': 'HTML', 'Path': 'build/index.html' },
  { 'File': 'JS', 'Path': 'build/index.js' },
]);
