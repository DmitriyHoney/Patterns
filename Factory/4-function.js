'use strict';
const color = {
  'info': '\x1b[37m',
  'error': '\x1b[31m',
  'warn': '\x1b[33m'
};

const logger = (cl = 'info') => {
  const currentCl = color[cl];
  return (msg) => {
    console.log(`${currentCl}${new Date().toISOString()}\t${msg}`);
  };
};

//Usage

const info = logger('info');
const error = logger('error');
const warn = logger('warn');

info('I`m info');
error('I`m error');
warn('I`m warn');
