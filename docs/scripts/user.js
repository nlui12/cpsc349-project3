import * as mockroblog from './mockroblog.js'
/*
Initialize all components from HTML
*/
const btn = document.querySelector(".mobile-menu-button")
const menu = document.querySelector(".mobile-menu")
const myPost = document.querySelector(".postContainer")


/*
Extracting object from local storage and parsing it JSON
*/
const account = JSON.parse(localStorage.getItem('profile'))

/*
Api variables
*/
const userPost = mockroblog.getUserTimeline(account.username)


//Event Listeners 
btn.addEventListener('click', () => {
    console.log("Hello");
    menu.classList.toggle("hidden")
})

userPost.forEach(obj => {
    myPost.innerHTML += `
    <span
    <span class="font-bold text-indigo-600 text-sm tracking-wide"> 
    ${obj.timestamp}</span>
    <p class="pt-1">
        ${obj.text}
    </p>
    <br>
    `
})