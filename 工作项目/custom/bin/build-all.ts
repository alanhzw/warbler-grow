const {execSync} = require('child_process');

let fs = require('fs');
let path = require('path');

//解析需要遍历的文件夹，我这以E盘根目录为例
let filePath = 'src/pages';

let dirList = [];

/**
 * 文件遍历方法
 * @param filePath 需要遍历的文件路径
 */
function fileDisplay(filePath) {
  // 没有入口文件 报错
  if (fs.existsSync(`${filePath}/index.ts`)) {
    const entry = filePath.replace('src\\pages\\', '').replace(/\\/gi, '/');
    if (entry) {
      dirList.push(entry);
    }
  } else {
    //根据文件路径读取文件，返回文件列表
    const files = fs.readdirSync(filePath);
    //遍历读取到的文件列表
    files.forEach((filename) => {
      //获取当前文件的绝对路径
      let filedir = path.join(filePath, filename);
      //根据文件路径获取文件信息，返回一个fs.Stats对象
      const stats = fs.statSync(filedir);

      let isDir = stats.isDirectory();//是文件夹

      if (isDir) {
        fileDisplay(filedir);//递归，如果是文件夹，就继续遍历该文件夹下面的文件
      }
    });
  }
}

function startBuild() {
  console.log('开始')
  //调用文件遍历方法
  fileDisplay(filePath);
  console.log(`共 ${dirList.length} 个文件`)
  const cmd = dirList.map(entry => `npm run build ${entry}`).join(' && ')
  console.log(cmd)
  try {
    execSync(` ${cmd}`, {stdio: [0, 1, 2]}, (error) => {
      if (error) {
        console.error(error);
      }
    });
  } catch (e) {
    console.log('遇到错误', e)
  }
}

startBuild();
