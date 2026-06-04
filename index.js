#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import inquirer from 'inquirer';
import pc from 'picocolors';
import { Command } from 'commander';
import boxen from 'boxen';
import fg from 'fast-glob';

const program = new Command();

program
  .name('junk-reaper')
  .description('Interactively hunts down and obliterates hidden .DS_Store and .log files across your project.')
  .version('1.0.0')
  .parse(process.argv);

console.log(
  boxen(
    pc.yellow(pc.bold('🗑️ JUNK REAPER')) + '\n' + pc.gray('Sweep the hidden garbage.'),
    { padding: 1, margin: 1, borderStyle: 'double', borderColor: 'yellow' }
  )
);

const formatBytes = (bytes) => {
  if (bytes === 0) return '0 B';
  const k = 1024;
  const sizes = ['B', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
};

const run = async () => {
  process.stdout.write(pc.cyan('🔍 Scanning project for junk files (ignoring node_modules)...\n'));

  const startTime = Date.now();
  const files = await fg(['**/.DS_Store', '**/*.log', '**/Thumbs.db'], {
    dot: true,
    ignore: ['**/node_modules/**', '**/.git/**']
  });
  const timeTaken = ((Date.now() - startTime) / 1000).toFixed(2);

  if (files.length === 0) {
    console.log(pc.green(`✨ Scan complete in ${timeTaken}s. Your project is completely clean.`));
    console.log(pc.cyan('\nArchitected by @lakshanmuruganandam\n'));
    process.exit(0);
  }

  const targets = files.map(f => {
    const stats = fs.statSync(f);
    return { name: f, size: stats.size, sizeStr: formatBytes(stats.size) };
  });

  const totalSize = targets.reduce((acc, curr) => acc + curr.size, 0);

  console.log(pc.yellow(`⚠️  Found ${files.length} junk files taking up ${formatBytes(totalSize)} in ${timeTaken}s.`));

  const choices = targets.map(t => {
    const isLog = t.name.endsWith('.log');
    const icon = isLog ? '📝' : '🍎';
    const typeColor = isLog ? pc.blue : pc.magenta;

    return {
      name: `${icon} ${typeColor(t.name.padEnd(50))} ${pc.gray(t.sizeStr)}`,
      value: t.name,
      short: t.name
    };
  });

  const { selected } = await inquirer.prompt([{
    type: 'checkbox',
    name: 'selected',
    message: 'Select junk files to obliterate:',
    choices: choices,
    pageSize: 12,
    loop: false
  }]);

  if (selected.length === 0) {
    console.log(pc.gray('\nMission aborted. No files deleted.'));
    console.log(pc.cyan('\nArchitected by @lakshanmuruganandam\n'));
    process.exit(0);
  }

  const { confirm } = await inquirer.prompt([{
    type: 'confirm',
    name: 'confirm',
    message: pc.bgRed(pc.white(` WARNING: You are about to permanently delete ${selected.length} files. Proceed? `)),
    default: false
  }]);

  if (!confirm) {
    console.log(pc.gray('\nMission aborted.'));
    console.log(pc.cyan('\nArchitected by @lakshanmuruganandam\n'));
    process.exit(0);
  }

  console.log();
  let deleted = 0;
  for (const file of selected) {
    try {
      fs.unlinkSync(file);
      console.log(pc.green(`✔ Obliterated: `) + pc.white(file));
      deleted++;
    } catch (e) {
      console.log(pc.red(`❌ Failed to delete: `) + pc.white(file));
    }
  }

  console.log(
    boxen(
      pc.green(`Mission Accomplished.\n`) + pc.white(`Reaped ${deleted} junk files.`),
      { padding: 1, margin: { top: 1 }, borderStyle: 'round', borderColor: 'green' }
    )
  );

  console.log(pc.cyan('\nArchitected by @lakshanmuruganandam\n'));
};

run().catch(e => {
  console.error(pc.red('\nAn unexpected error occurred:'), e.message);
  process.exit(1);
});
