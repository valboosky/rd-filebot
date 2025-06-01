import { spawn } from 'child_process';

export function runFilebot(inputPath, outputPath, type) {
  return new Promise((resolve) => {
    const args = [
      '-rename', inputPath,
      '--output', outputPath,
      '--db', type === 'movie' ? 'TheMovieDB' : 'TheTVDB',
      '--format', '{n} ({y})/{n} ({y})',
      '--action', 'copy'
    ];

    const child = spawn('filebot', args);

    let log = '';
    child.stdout.on('data', (data) => log += data.toString());
    child.stderr.on('data', (data) => log += data.toString());

    child.on('close', (code) => {
      const success = code === 0;
      resolve({ success, log });
    });
  });
}