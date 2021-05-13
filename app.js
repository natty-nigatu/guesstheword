let view = document.querySelector("#view") //shows letters of word to be guessed
let keys = document.querySelectorAll(".key") //all keys on keyboard display
let lifeHolder = document.querySelector("#life-holder")

let viewletters = null //DOM view of letters in the word

let isOver
let life
let foundCounter
let word
let triedLetters // keeps a list of tried letters

////////////add listeners
for (let key of keys){
    key.addEventListener("click", chooseKey)
}

document.body.addEventListener("keypress", handleKey)
///////////////////////////////

//handles whenever a letter is selected
function chooseKey(event){
    if(isOver) return

    let letter = event.srcElement.id

    if (triedLetters.includes(letter))
        return
    
    let found = false

    for (let i = 0; i < word.length; i++){
        if(word[i].toLowerCase() === letter){
            showLetter(i, letter)
            found = true
            foundCounter += 1
        }
    }

    triedLetters.push(letter)

    if (found)
        event.srcElement.classList.add("selected")
    else{
        event.srcElement.classList.add("selected-wrong")
        life -= 1
        updateLifeView()
    }
    
    checkGameOver()
}

function handleKey(event){
    let key = document.querySelector(`#${event.key}`)
    key.click()
}

function updateLifeView(){
    let colors = ["limegreen","lawngreen", "gold", "yellow", "orange", "orangered"]

    let lifeElement = lifeHolder.children.life

    lifeElement.style.width = `${85  * life}px`
    lifeElement.style.backgroundColor = colors[6 - life]

}

//reveals a letter if found
function showLetter(index, letter){
    let toBeRevealed = viewletters[index]

    toBeRevealed.innerText = letter.toUpperCase()
    toBeRevealed.classList.add("found")
}

function checkGameOver(){
    if (foundCounter == word.length)
        gameOver("win")
    else if (life == 0)
        gameOver("lose")
    
}

function gameOver(status){
    lifeHolder.innerHTML=""
    
    let msgText = document.createElement("span")
    msgText.classList.add("message")

    if(status === "win"){
        msgText.innerText = "Congratualtions, You Won!"
        msgText.style.color = "limegreen"
        for(let letter of viewletters){
            letter.style.border="limegreen 2px solid"
        }
    }
    else{
        msgText.innerText = "Game Over, You Lost!"
        msgText.style.color = "crimson"
        for(let letter of viewletters){
            letter.style.border="crimson 2px solid"
        }
    }

    let resetBtn = document.createElement("button")
    resetBtn.classList.add("reset-button")
    resetBtn.innerText = "Play Again"
    resetBtn.addEventListener("click", reset)

    if(status == "lose")
    {
        for (let i = 0; i < word.length; i++){
            showLetter(i, word[i])
        }
    }

    let div = document.createElement("div")
    div.classList.add("over-view")
    div.append(msgText, resetBtn)
    lifeHolder.append(div)
    console.dir(div)
    resetKeyboard()
    isOver = true
}

function resetKeyboard(){
    
    for(let key of keys)
        key.setAttribute("class", "key")
}

function reset() {
    document.body.style.backgroundColor = "white";
    generate()
}

function generate(){

    isOver = false
    foundCounter = 0   
    life = 6
    word = getword().toUpperCase()
    triedLetters = []
    lifeHolder.innerHTML='<div id="life"></div>'
    updateLifeView() 
    
    view.innerHTML=""

    for (let i = 0; i < word.length; i++){
        let letter = document.createElement("span")
        letter.classList.add("letter")
        view.append(letter)
    }

    viewletters = document.querySelectorAll(".letter")
}

function getword(){
    
    let words = ["producer","environment","rotten","battery","sentence","mosaic","mechanism","restrict","vertical","safety","rub","mist","responsible","beat","hard","flight","stuff","crude","elegant","lid","develop","organisation","requirement","shout","course","casualty","characteristic","TRUE","breed","leave","empire","bring","sculpture","justice","creep","use","humor","fantasy","perform","explosion","variety","bulletin","product","drink","mainstream","continental","brag","prospect",
    "nationalist","activate","cream","tight","half","fabricate","concentrate","chapter","fear","lesson","earthflax","convince","win","chest","tasty","hostility","remark","organize","copper","deal","rub","mother","abortion","feature","wrist","appreciate","represent","kinship","revise","inhibition","revenge","jacket","distort","bake","chase","cruel","price","morning","research","intelligence","open","element","approve","outside","retreat","vegetation","suspicion","shelter","soil"]

    return words[Math.floor(Math.random() * words.length)]
}

generate()