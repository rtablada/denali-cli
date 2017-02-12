import * as chalk from 'chalk';

let loglevels = [
  'debug',
  'info',
  'success',
  'warn',
  'error',
  'silent'
];

let env = process.env.DENALI_ENV || process.env.NODE_ENV || 'development';

let defaultLevels: { [env: string]: string } = {
  development: 'debug',
  test: 'info',
  production: 'info'
};

export default {
  loglevel: defaultLevels[env],
  raw(level: string, output: string) {
    if (loglevels.indexOf(this.loglevel) <= loglevels.indexOf(level)) {
      process.stdout.write(output || '');
    }
  },
  debug(...msgs: any[]) {
    if (loglevels.indexOf(this.loglevel) <= loglevels.indexOf('debug')) {
      msgs = msgs.map((msg) => chalk.cyan(msg));
      console.log(msgs.shift(), ...msgs);
    }
  },
  info(...msgs: any[]) {
    if (loglevels.indexOf(this.loglevel) <= loglevels.indexOf('info')) {
      console.log(msgs.shift(), ...msgs);
    }
  },
  warn(...msgs: any[]) {
    if (loglevels.indexOf(this.loglevel) <= loglevels.indexOf('warn')) {
      msgs = msgs.map((msg) => chalk.yellow(msg));
      console.warn(msgs.shift(), ...msgs);
    }
  },
  error(...msgs: any[]) {
    if (loglevels.indexOf(this.loglevel) <= loglevels.indexOf('error')) {
      msgs = msgs.map((msg) => chalk.red(msg));
      console.error(msgs.shift(), ...msgs);
    }
  },
  success(...msgs: any[]) {
    if (loglevels.indexOf(this.loglevel) <= loglevels.indexOf('success')) {
      msgs = msgs.map((msg) => chalk.green(msg));
      console.error(msgs.shift(), ...msgs);
    }
  }
};