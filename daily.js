const fs = require('fs')
const dayjs = require('dayjs')
const path = require('path')

const indexFilePath = path.join(__dirname, 'quotation_index.txt')

function getCurrentIndex() {
  if (fs.existsSync(indexFilePath)) {
    return parseInt(fs.readFileSync(indexFilePath, 'utf-8'), 10)
  } else {
    return 0
  }
}

function saveCurrentIndex(index) {
  fs.writeFileSync(indexFilePath, index.toString())
}

function run() {
  try {
    const readme = fs.readFileSync('./README.md', 'utf-8')
    const index = readme.indexOf('<!--End-->')
    const after = readme.substring(index + 10)
    const date = dayjs().locale('zh-cn').format('YYYY-MM-DD')
    const quotation = fs.readFileSync('./quotations.md', 'utf-8')
    const quotations = quotation.split('\n').filter((it) => it.startsWith('-'))

    let currentIndex = getCurrentIndex()
    const daily = quotations[currentIndex]

    currentIndex = (currentIndex + 1) % quotations.length
    saveCurrentIndex(currentIndex)

    const before = `<!--Start-->
 <h4> <img src="https://emojis.slackmojis.com/emojis/images/1621024394/39092/cat-roll.gif?1621024394" width="28" /> <a href="https://github.com/liugezhou/liugezhou/blob/master/quotations.md"> 每日一言</a></h4>`
    const newReadme = `${before}

<kbd>${date}</kbd>

${daily}

<!--End-->${after}
`

    fs.writeFileSync('./README.md', newReadme)
    console.log('Update Success!')
  } catch (error) {
    console.log(error.message)
  }
}

run()