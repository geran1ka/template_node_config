export const argsParse = ([, , ...argv], words = []) => {
  const args = {};

  for (const key of words) {
    args[key] = key === argv[0];

    if (args[key] && argv[0] === 'add') {
      args[key] = { task: argv[1] };
    }

    if (args[key] && (argv[0] === 'get' || argv[0] === 'delete')) {
      args[key] = { id: argv[1] };
    }

    if (args[key] && argv[0] === 'update') {
      args[key] = { id: argv[1], newTask: argv[2] || '' };
    }

    if (args[key] && argv[0] === 'status') {
      args[key] = { id: argv[1], newStatus: argv[2] || '' };
    }
  }

  for (let i = 0; i < argv.length; i++) {
    if (argv[i][0] !== '-') continue;

    if (argv[i + 1] && argv[i + 1][0] !== '-') {
      if (argv[i][1] === '-') {
        args[argv[i].substring(2)] = argv[i + 1];
      } else {
        args[argv[i].substring(1)] = argv[i + 1];
      }
      continue;
    }

    if (argv[i].startsWith('--')) {
      if (argv[i].includes('=')) {
        const [key, value] = argv[i].split('=');
        args[key.substring(2)] = value;
      } else {
        args[argv[i].substring(2)] = true;
      }
      continue;
    }

    if (argv[i].startsWith('-no-')) {
      args[argv[i].substring(4)] = false;
      continue;
    }

    args[argv[i].substring(1)] = true;
  }
  return args;
};
