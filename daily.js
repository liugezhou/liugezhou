const sample = require('lodash/sample')
const fs = require('fs')
const dayjs = require('dayjs')

function run() {
  try {
    const readme = fs.readFileSync('./README.md', 'utf-8')
    const index = readme.indexOf('<!--End-->')
    const after = readme.substring(index + 10)
    const date = dayjs().locale('zh-cn').format('YYYY-MM-DD')
    const quotation = fs.readFileSync('./quotations.md', 'utf-8')
    const quotations = quotation.split('\n').filter((it) => it.startsWith('-'))
    const daily = sample(quotations)
    const before = `<!--Start-->
 <h4> <img src="https://emojis.slackmojis.com/emojis/images/1621024394/39092/cat-roll.gif?1621024394" width="28" /> <a href="https://github.com/liugezhou/liugezhou/blob/master/quotations.md"> 每日一言</a></h4>`
    const newReadme = `${before}

<kbd>${date}</kbd>

${daily}

<p align="right">
<img src="https://visitor-badge.glitch.me/badge?page_id=liugezhou.liugezhou" />
</p>
<!--End-->${after}
`

    fs.writeFileSync('./README.md', newReadme)
    console.log('Update Success!')
  } catch (error) {
    console.log(error.message)
  }
}

run()
