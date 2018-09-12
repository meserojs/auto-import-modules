const path = require('path')
const glob = require('glob')
const fs = require('fs')

module.exports = function (args) {
  let folder = void 0
  let modules = void 0

  typeof args === 'string' ? (folder = args) : ((folder = args.folder) && (modules = args.modules))

  if (!modules) {
    modules = fs.readdirSync(folder).filter(v => fs.statSync(path.resolve(folder, v)).isDirectory())
  }

  for (let module of modules) {
    const modulePath = path.resolve(folder, module)
    const files = glob.sync(path.resolve(modulePath, './*.js'))

    if (!files) {
      continue;
    }

    for (let file of files) {
      const basename = path.basename(file)

      basename[0] !== '@' && basename[0] !== '_' && require(file)
    }
  }
}
