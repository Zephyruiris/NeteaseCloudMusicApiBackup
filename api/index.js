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
  try {
    const app = await getApp()
    return app(req, res)
  } catch (error) {
    console.error('NCM API ERROR:', error)

    res.status(500).json({
      error: true,
      message: error.message,
      code: error.code,
      stack: error.stack
    })
  }
}
