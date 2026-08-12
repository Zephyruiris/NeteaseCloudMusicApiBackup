const generateConfig = require('../generateConfig')
const { consturctServer } = require('../server')

let appPromise

async function getApp() {
  if (!appPromise) {
    appPromise = (async () => {
      await generateConfig()
      return await consturctServer()
    })()
  }

  return appPromise
}

module.exports = async (req, res) => {
  const app = await getApp()
  return app(req, res)
}
