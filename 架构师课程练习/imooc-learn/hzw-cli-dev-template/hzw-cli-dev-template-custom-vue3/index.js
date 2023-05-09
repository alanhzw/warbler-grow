const fse = require("fse")
const inquirer = require('inquirer')
const glob = require('glob')
const ejs = require('ejs')


/**
 * @description: ejs 模板渲染
 * @param {*}
 * @return {*}
 */
async function ejsRender(options) {
  return new Promise((resolve, reject) => {
    // 遍历文件列表
    glob("**", {
      cwd: options.targetPath,
      nodir: true,
      ignore: options.ignore || []
    }, (err, files) => {
      if (err) {
        reject(err)
      }
      // 对文件列表使用 ejs 进行渲染
      Promise.all(files.map((file) => {
        const filePath = path.join(process.cwd(), file)
        return new Promise((resolve1, reject1) => {
          ejs.renderFile(filePath, options, {}, (err, res) => {
            if (err) {
              reject1(err)
            }
            // 将源文件替换成 ejs 渲染后的文件
            fse.writeFileSync(filePath, res)
            resolve1(res)
          })
        })
      }))
        .then(() => resolve(files))
        .catch((err) => reject(err))
    })
  })
}


async function install(options) {
  const promptArr = []
  const descriptPrompt = {
    type: 'input',
    message: '请输入组件描述',
    name: 'description',
    validate: (a) => {
      if (a) {
        return true;
      }
      return '组件描述不可以为空';
    },
  }
  promptArr.push(descriptPrompt)
  const answer = await inquirer.prompt(promptArr);
  options.description = answer.description
  // 获取模板缓存路径
  // 获取模板所在目录 获取当前目录
  const { sourcePath, targetPath } = options
  try {
    // 确保目录存在 不存在会创建
    fse.ensureDirSync(sourcePath);
    fse.ensureDirSync(targetPath);
    // 拷贝模板到当前目录
    fse.copySync(templatePath, targetPath)
    // ejs 模板渲染
    options.ignore = ['node_modules/**', ...options.templateInfo.ignore]
    // const ops = { ignore }
    await ejsRender(options)
    // const { installCommand, startCommand } = this.templateInfo
    // 依赖安装
    // await this.execCommand(installCommand, '依赖安装成功')
    // 启动命令
    // await this.execCommand(startCommand, '项目启动成功')
  } catch (error) {
    log.error(error.message)
  } finally {
    spinner.stop(true)
    log.warn('模板安装成功')
  }

}

module.exports = install