const webdriver = require('selenium-webdriver')
const chrome = require('selenium-webdriver/chrome')
const path = require('path')
const fs = require('fs')
const config = require('./config.js')

async function main() {
  let urlList = getURLListSync();
  let driver = await new webdriver.Builder()
  .withCapabilities(config['capabilities'])
  .build()
  let n = urlList.length
  for (let i = 0; i < n; i++) {
    let url = urlList[i]
    console.log(`(${i} / ${n}: ${url}`)
    await fs.appendFile(config['logFilePath'], `---\n${url}\n\n` ,'utf8', e => e)
    await driver.get(url)
    await driver.sleep(200)
  }
  await driver.quit()
}

function getURLListSync() {
  const filePath = path.join(__dirname, config['uslListFileNmae']);
  var urlList = fs.readFileSync(filePath).toString().split("\n");
  urlList = urlList.filter(function(e){return e !== "";});
  return urlList;
}

function renameLogFileSync() {
  let renameCount = 0;
  let afterRename = config['logFilePath'];
  while (isExistFileSync(afterRename)) {
    afterRename = config['logFilePath'] + ".org" + renameCount++
  }
  if (renameCount !== 0) {
    fs.renameSync(config['logFilePath'], afterRename)
  }
}

function isExistFileSync(file) {
  try {
    fs.statSync(file)
    return true
  } catch(err) {
    if(err.code === 'ENOENT') return false
  }
}

renameLogFileSync()
main()
