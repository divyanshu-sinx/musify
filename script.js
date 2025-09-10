const songs = [
    { id: 101, categ: "reel", title: "Gata Only", author: "FloyyMenor" },
    { id: 102, categ: "Featured", title: "Saiyaara", author: "Faheem Abdullah" },
    { id: 103, categ: "reel", title: "Sahiba", author: "Stebin Ben" },
    { id: 105, categ: "Featured", title: "Tere vaaste", author: "Stebin Ben" },
    { id: 104, categ: "reel", title: "Favourite", author: "Stebin Ben" },
    { id: 106, categ: "reel", title: "Hayat", author: "Stebin Ben" },
    { id: 107, categ: "featured", title: "Shaky", author: "Stebin Ben" },
    { id: 108, categ: "reel", title: "Espresso", author: "Stebin Ben" },
    { id: 109, categ: "reel", title: "Oxygen", author: "Stebin Ben" },
]
const types = [], data = {}
for (const element of songs) {
    if (!types.includes(element.categ.toLowerCase())) types.push(element.categ.toLowerCase())
}
// types.splice(types.indexOf("featured"), 1)
// types.unshift("featured")
for (const element of types) {
    let i = []
    for (const val of songs) {
        if (element === val.categ.toLowerCase()) i.push(val)
    }
    data[element] = i
}

let main = document.querySelector("main")

for (const key in data) {
    let div = document.createElement("div")
    div.className = "sec1"
    div.innerHTML = `<h2>${key} Songs</h2>
            <div class="songs flex">
            </div>`
    for (const element of data[key]) {
        let secDiv = document.createElement("div")
        secDiv.className = "song"
        secDiv.id = element.id
        secDiv.innerHTML = `<img src="src/img/${element.id}.webp" alt="song" class="thumb">
                    <h3>${element.title}</h3>
                    <h4>${element.author}</h4>`
        div.children[1].append(secDiv)
    }
    main.append(div)
}
// ............................
let musics = document.querySelectorAll(".song")
let currSong = null, repeat = true, intv
let player = document.querySelector(".player")
let nameDisp = document.querySelector(".upper h4")
let actMin = document.querySelector("#actMin")
let audio = document.querySelector("audio")
let actSec = document.querySelector("#actSec")
let ppBtn = document.querySelector("#pp-btn")
let seekbar = document.querySelector("#seekbar")
let currMin = document.querySelector("#currMin")
let currSec = document.querySelector("#currSec")
let next = document.querySelector("#for-btn")
let prev = document.querySelector("#back-btn")
let volBar = document.querySelector("#volume")
let search=  document.querySelector("#search")
// ................................
musics = Array.from(musics)
musics.forEach(function (x) {
    x.addEventListener(("click"), function (e) {
        if (e.target.matches(".thumb")) {
            update(e.target)
            player.style.display = "flex"
        }
    })
})
// ..........................
function update(x) {
    if (currSong) currSong.classList.remove("playing")
    currSong = x.closest(".song")
    currSong.classList.add("playing")
    musify()
}
function musify() {
    audio.src = `src/songs/${currSong.id}.mp3`
    audio.play()
    ppBtn.name = "pause-outline"
    nameDisp.textContent = currSong.children[1].textContent + " - " + currSong.lastElementChild.textContent
    audio.addEventListener("loadedmetadata", function () {
        actMin.textContent = format(Math.floor(audio.duration / 60))
        actSec.textContent = format(Math.floor(audio.duration % 60))
    }, { once: true })
    if (intv) clearInterval(intv)
    intv = setInterval(app, 1000)
}
// .............................
function format(x) {
    if (x < 10) return "0" + x
    else return x
}
// ......................
ppBtn.parentElement.addEventListener(("click"), function () {
    if (audio.paused) {
        audio.play()
        ppBtn.name = "pause-outline"
    } else {
        audio.pause()
        ppBtn.name = "play-outline"
    }
})
next.addEventListener(("click"), function () {
    if (currSong.nextElementSibling) update(currSong.nextElementSibling)
    else if (currSong.closest(".sec1").nextElementSibling) {
        update(currSong.closest(".sec1").nextElementSibling.querySelector(".song"))
    }
})
prev.addEventListener(("click"), function () {
    if (currSong.previousElementSibling) update(currSong.previousElementSibling)
    else if (currSong.closest(".sec1").previousElementSibling) {
        let elem = currSong.closest(".sec1").previousElementSibling.querySelectorAll(".song")
        elem = Array.from(elem)
        update(elem[elem.length-1])
    }
})
// ..........................
function app() {
    seekbar.value = audio.currentTime / audio.duration * 100
    currMin.textContent = format(Math.floor(audio.currentTime / 60))
    currMin.textContent = format(Math.floor(audio.currentTime % 60))
}
audio.addEventListener(("ended"), function () {
    if (currSong.nextSibling) update(currSong.nextSibling)
    else if (currSong.closest(".sec1").nextElementSibling) {
        update(currSong.closest(".sec1").nextElementSibling.querySelector(".song"))
    } else {
        currSong.classList.remove("playing")
        clearInterval(intv)
        player.style.display = "none"
    }
})
// ........................
document.querySelector(".loop").addEventListener(("click"), function () {
    audio.loop = !audio.loop
    audio.loop ? console.log("loop on") : console.log("loop off")
})
// .....................
seekbar.addEventListener(("change"), function () {
    clearInterval(intv)
    audio.currentTime = audio.duration / 100 * seekbar.value
    intv = setInterval(app, 1000)
})
volBar.addEventListener(("input"), function () {
    audio.volume = volBar.value / 100
})
// ................
search.addEventListener(("input"),function() {
    if(search.value.trim()!=""){

    }
})