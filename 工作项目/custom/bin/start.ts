// eslint-disable-next-line @typescript-eslint/no-var-requires
const iconv = require("iconv-lite");
const { exec, spawn } = require('child_process');

const targetDir = process.argv[2];
const entry = `src/pages/${targetDir}`;

const vcs = spawn('vue-cli-service', ['serve', entry]);

vcs.stdout.on('data', (data) => {
  console.log(`stdout: ${data}`);
});

vcs.stderr.on('data', (data) => {
  console.error(`stderr: ${data}`);
});

vcs.on('close', (code) => {
  console.log(`child process exited with code ${code}`);
});
