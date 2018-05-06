const webdriver = require('selenium-webdriver')
const chrome = require('selenium-webdriver/chrome')

//config start
const uslListFileNmae = 'list.txt'//url list.
const logFileDirPath = '/chormedriver_data/'//save chrome user data. need to permit writing data.
const logLevel = '0'
//config end

//export
const capabilities = webdriver.Capabilities.chrome()
const chromeOptions = {
  'args': [/*'incognito',*/ 'enable-logging', 'log-level=' + logLevel, 'user-data-dir=' + logFileDirPath],
}
capabilities.set('chromeOptions', chromeOptions)

const config = {
    uslListFileNmae: uslListFileNmae,
    logFileDirPath: logFileDirPath,
    capabilities: capabilities,
    logFilePath: logFileDirPath + 'chrome_debug.log',
}
module.exports = config
