'use strict'
let askSaveDiv = document.createElement('div')
let theDivThatsActuallyAskingForSave = document.createElement('div')
let theGoodAcceptButton = document.createElement('button')
let theUglyDeclineButton = document.createElement('button')
let _gameDiv = document.createElement('div')
let toggleSaveButton = document.createElement('button')
toggleSaveButton.textContent = 'Toggle Local Storage Permission'
toggleSaveButton.style.bottom = '32px'
toggleSaveButton.classList.add('importantStuff')
toggleSaveButton.onclick = () => {
    save = !save
}
let destroyAskSaveDiv = () => {
    askSaveDiv.remove()
    document.body.append(_gameDiv)
    document.body.append(toggleSaveButton)
}
theDivThatsActuallyAskingForSave.textContent = 'Allow saving???\n(By allowing this, you allow me to use local storage in my code)'
theGoodAcceptButton.textContent = 'ok'
theGoodAcceptButton.style.marginRight = '5px'
theUglyDeclineButton.textContent = 'NO I NEVER ALLOW COOKIES'
theGoodAcceptButton.onclick = () => {
    save = true
    destroyAskSaveDiv()
}
theUglyDeclineButton.onclick = () => destroyAskSaveDiv()
askSaveDiv.append(theDivThatsActuallyAskingForSave, theGoodAcceptButton, theUglyDeclineButton)
document.body.append(askSaveDiv)
let save = false
let counter1 = 0n
let aUpgrades1 = JSON.parse(localStorage.getItem('Aupg1')) || 0
let A = JSON.parse(localStorage.getItem('A')) || 0
if (localStorage.getItem('save')) {
    destroyAskSaveDiv()
    save = true
    document.body.append(_gameDiv)
}
if (localStorage.getItem('&ci1') && save) counter1 = BigInt(localStorage.getItem('&ci1'))
function saving() {
    if (!save) {
        localStorage.clear()
        return requestAnimationFrame(saving)
    }
    localStorage.setItem('save', save ? 'true' : '')
    localStorage.setItem('&ci1', counter1.toString())
    localStorage.setItem('Aupg1', JSON.stringify(aUpgrades1))
    localStorage.setItem('A', JSON.stringify(A))
    return requestAnimationFrame(saving)
}
requestAnimationFrame(saving)
Node.prototype.loreyDisplay = async function(text = '', msInbetween = 50, before = '', after = '') {
    let div = document.createElement('div')
    this.appendChild(div)
    let textRn = ''
    for (let char of text) {
        textRn += char
        div.textContent = `${before}${textRn}${after}`
        if (textRn !== text) await new Promise(resolve => setTimeout(resolve, msInbetween))
    }
    return div
}
Node.prototype.waitForResponse = async function(buttonText = 'Respond') {
    let [input, button] = [document.createElement('input'), document.createElement('button')]
    this.appendChild(input)
    button.textContent = buttonText
    this.appendChild(button)
    let response
    await new Promise(resolve => {
        button.onclick = () => {
            response = input.value
            resolve()
        }
    })
    return [response, input, button]
}
// reused
String.prototype.indexHasText = function(text = '', index = 0) {
    return this.slice(index, index + text.length) === text
}
// reused
String.prototype.parseStory = async function(parent = document.body, startingSignals = [
    'text',
    'question'
]) {
    let usefulLines = []
    for (let line of this.split('\n')) {
        let type = ''
        for (let signal of startingSignals) {
            if (!line.indexHasText(signal)) continue
            type = signal
        }
        if (!type) continue
        usefulLines.push(line)
        let newText = line.slice(type.length)
        switch(startingSignals.indexOf(type)) {
            case 0:
                {
                    let div
                    await parent.loreyDisplay(newText).then(elem => div = elem)
                    await new Promise(resolve => setTimeout(resolve, 3000))
                    div?.remove?.()
                }
            break
            case 1:
                {
                    let div
                    await parent.loreyDisplay(newText).then(elem => div = elem)
                    let [, ...elems] = []
                    await parent.waitForResponse().then(([, ..._elems]) => elems = _elems)
                    div?.remove?.()
                    elems.forEach(elem => elem.remove())
                }
            break
        }
    }
    return usefulLines.join('\n')
}
let keys = new Set([])
addEventListener('keydown', ev => keys.add(ev.key))
addEventListener('keyup', ev => keys.delete(ev.key))
let newsDiv = document.createElement('div')
newsDiv.style.position = 'absolute'
let origWidth = newsDiv.getBoundingClientRect().width
let moving = false
let repositionNewsDiv = () => {
    newsDiv.style.left = ''
    newsDiv.style.right = `${-parseFloat(newsDiv.getBoundingClientRect().width)}px`
    newsDiv.style.width = 'auto'
    origWidth = newsDiv.getBoundingClientRect().width
    newsDiv.style.width = `${origWidth}px`
    newsDiv.style.right = `${-parseFloat(newsDiv.getBoundingClientRect().width)}px`
}
let newsTexts = ['Hello, this was made on 12/16/2020, version made on 2/3/2023.', 'This is definently a normal incremental.', `Is it weird when people say &im`, `Times you encountered this before: &ci1`, 'Hello Fieler, I\'m Austin.']
let getRandomNewsText = () => {
    let normal = newsTexts[Math.floor(Math.random() * newsTexts.length)]
    let modified = normal.replace(/&im/g, modifyNumber(A)).replace(/&ci1/g, counter1)
    if (!normal.includes('&ci1')) return modified
    counter1++
    return modified
}
newsDiv.textContent = getRandomNewsText()
newsDiv.style.whiteSpace = 'nowrap'
addEventListener('resize', () => repositionNewsDiv())
_gameDiv.append(newsDiv)
repositionNewsDiv()
let scrollLeftAndRespawn = () => {
    newsDiv.style.left = `${newsDiv.getBoundingClientRect().left - 4}px`
    if (newsDiv.getBoundingClientRect().left < -origWidth) {
        newsDiv.textContent = getRandomNewsText()
        repositionNewsDiv()
    }
    return requestAnimationFrame(scrollLeftAndRespawn)
}
requestAnimationFrame(scrollLeftAndRespawn)
let otherStuff1 = document.createElement('div')
otherStuff1.style.position = 'absolute'
otherStuff1.style.top = '42px'
_gameDiv.append(otherStuff1)
let hr = document.createElement('hr')
otherStuff1.style.left = '0px'
otherStuff1.style.width = '100%'
hr.style.margin = '0px'
let AdisplayDiv = document.createElement('div')
AdisplayDiv.id = 'AdisplayDiv1'
function modifyNumber(n) {
    let int = Math.round(n)
    let e = int.toString().length - 1
    let firstDigits = fixDecimal((int / 10 ** e).toFixed(2))
    return `${firstDigits}e${e}`
}
let displayingA = () => {
    AdisplayDiv.textContent = modifyNumber(A)
    return requestAnimationFrame(displayingA)
}
requestAnimationFrame(displayingA)
let firstButton = document.createElement('button')
firstButton.textContent = 'Click to begin earning A'
let loreDiv1 = document.createElement('div')
let firstLored = false
let lorePart = async() => {
    if (1e2 * 10 ** (Math.floor(aUpgrades1 / 10)) < 1e10 || firstLored) return
    firstButton.remove()
    otherStuff1.append(loreDiv1)
    firstLored = true
    let story1 = `textHi Fieler.\ntextI heard you have ${aUpgrades1} A generator upgrades\nquestionDo you wanna VrooM now?\ntextI don\'t know what it is but I\'ve heard it helps generate A`
    await story1.parseStory(loreDiv1)
    await loreDiv1.loreyDisplay('WIP')
}
let earningAId
firstButton.onclick = () => {
    earningAId = requestAnimationFrame(startEarningA)
    firstButton.id = 'firstButton1MaybeIdk'
    firstButton.textContent = modifyNumber(1e2 * 10 ** (Math.floor(aUpgrades1 / 10)))
    firstButton.onclick = async() => {
        lorePart()
        if (firstLored) return
        if (A < 1e2 * 10 ** (Math.floor(aUpgrades1 / 10))) return
        A -= 1e2 * 10 ** (Math.floor(aUpgrades1 / 10))
        aUpgrades1 += 1
        firstButton.textContent = modifyNumber(1e2 * 10 ** (Math.floor(aUpgrades1 / 10)))
    }
}
if (A) firstButton.onclick()
otherStuff1.append(hr, AdisplayDiv, firstButton)
async function startEarningA() {
    A += aUpgrades1 + 1 + ((1 + aUpgrades1) * 6 ** Math.floor(aUpgrades1 / 10) * 8)
    await new Promise(resolve => setTimeout(resolve, 100))
    return earningAId = requestAnimationFrame(startEarningA)
}
function VrooM() {
    cancelAnimationFrame(earningAId)
    aUpgrades1 = 0
    A = A ** 0.1
    requestAnimationFrame(startEarningA)
}
function fixDecimal(n) {
    if (!n.includes('.')) return n
    let arr = n.split('.')
    for (let [i, digit] of Object.entries(arr[1].split('').reverse())) {
        if (digit === '0') continue
        if (i !== '0') arr[1] = arr[1].slice(0, `-${i}`)
        break
    }
    if (arr[1][arr[1].length - 1] === '0') arr.pop()
    return arr.join('.')
}
/*
    ? doesn't work?!?! */addEventListener('beforeunload', ev => console.log(ev))
lorePart()
let keyHoldSystem = function() {
    return requestAnimationFrame(keyHoldSystem)
}
requestAnimationFrame(keyHoldSystem)
firstButton.addEventListener('keydown', ev => {
    if (ev.key !== ' ') return
    firstButton.onclick()
})
// important stuff
let versionDiv = document.createElement('div')
versionDiv.textContent = `AOI1 vD.2-za0s)`
versionDiv.classList.add('importantStuff')
versionDiv.style.bottom = '16px'
let licenseDiv = document.createElement('div')
licenseDiv.textContent = `Austin's Ordinary Incremental 1 © 2020 by Austin is licensed under Attribution 4.0 International. To view a copy of this license, visit http://creativecommons.org/licenses/by/4.0/`
licenseDiv.classList.add('importantStuff')
licenseDiv.style.bottom = '0px'
document.body.append(versionDiv, licenseDiv)
// todo add VrooM