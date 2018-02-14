const gulp = require('gulp');
const program = require('commander');
const log = require('debug')('v-tools:cli');
const server = require('../server');

require('../gulpfile');

const {
  version
} = require('../../package.json');

program
  .version(version)
  .command('run [task]')
  .description('run gulp task')
  .action((task) => {
    if (!task) {
      program.help();
    } else if (task === 'server') {
      console.log('server start:');
      server();
    } else {
      log(`task run: ${task}`);
      gulp.start(task);
    }
  })
  .on('--help', () => {
    console.log(' Usage:');
  });

program.parse(process.argv);
