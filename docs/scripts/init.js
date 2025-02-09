import * as mockroblog from './mockroblog.js'
// window.mockroblog = mockroblog

/*
Initialize all components from HTML
*/
// class = "btn-login"   document.querySelector(".")
// id = "btn-login"   document.querySelector("#")
const btnLogIn = document.querySelector(".btn-login") //DOM
const btnSignUp = document.querySelector(".btn-signup")
const inputUsername = document.querySelector(".input-username")
const inputPassword = document.querySelector(".input-password")
const btn = document.querySelector(".mobile-menu-button")
const menu = document.querySelector(".mobile-menu")
const loginContainer = document.querySelector(".login-container")
const signupContainer = document.querySelector(".signup-container")
const logoutNav = document.querySelector(".logout-nav")
const signupNav = document.querySelector(".signup-nav")
const btnCreate = document.querySelector(".btn-create")
const createUserEmail = document.querySelector(".create-email")
const createUserAcc = document.querySelector(".create-username")
const createUserPassword = document.querySelector(".create-password")
const emailErrorElement = document.getElementById('eerror')
const userErrorElement = document.getElementById('uerror')
const passwordErrorElement = document.getElementById('perror')
const textLogin = document.querySelector('.text-login')
const displayUser = document.querySelector(".userName")
const displayContainer = document.querySelector(".display-container")

let testUser
let createUser
let uerrorMessage
let eerrorMessage
let perrorMessage
let fakeEmail



//Event Listeners 
btnLogIn.addEventListener('click', (e) =>{
    
    testUser = mockroblog.authenticateUser((inputUsername.value),(inputPassword.value));
    
    
    if (testUser != null)
    {
        e.preventDefault()
        alert(`Login Successful \n\nWelcome ${testUser.username}`); 
        /*
        Local storage
        */
        localStorage.setItem('profile', JSON.stringify(testUser))
        localStorage.setItem('loggedin', 'true')
        location.href = "user.html";   
    }
    else if (inputUsername.value == '' || inputUsername.value == null)
    {   
        e.preventDefault();
        alert('Login Failed \n\nUsername cannot be empty.')       
    }
    //Disabled for security reasons
    // else if (inputUsername.value != 'ProfAvery' || inputUsername.value != 'KevinAWortman' || inputUsername.value != 'Beth_CSUF')
    // {
    //     e.preventDefault();
    //     alert('Login Failed \n\nUsername not recognized');
    // }
    // else if (inputUsername.value == 'ProfAvery' || inputUsername.value == 'KevinAWortman' || inputUsername.value == 'Beth_CSUF')
    // {
    //     e.preventDefault();
    //     alert('Login Failed \n\nIncorrect Password');
    // }
    else if (inputPassword.value == '' || inputPassword.value == null)
    {
        e.preventDefault();
        alert('Login Failed \n\nPassword cannot be empty.')
    }
    else 
    {
        e.preventDefault();
        alert('Login Failed \n\nUsername or password do not match any credentials in the system.')
    }

  
})


btn.addEventListener('click', () => {
    console.log("mobile");
    menu.classList.toggle("hidden")
})

btnSignUp.addEventListener('click', () => {
    loginContainer.classList.toggle("hidden")
    signupContainer.classList.toggle("hidden")
    signupNav.textContent = "Login"  
})


if(localStorage.getItem('loggedin') === 'true')
{
    const account = JSON.parse(localStorage.getItem('profile'))
    displayUser.textContent = `${account.username}`
    signupNav.textContent = 'Log Out'
    signupNav.style.backgroundColor = "red"
    loginContainer.classList.toggle("hidden")
    displayContainer.classList.toggle("hidden")
    logoutNav.classList.toggle("hidden")
        
}

logoutNav.addEventListener('click', () => {
    localStorage.clear()
    alert("Successfully logged out.")
    location.href = "index.html"
})

signupNav.addEventListener('click', () => {
    if(localStorage.getItem('loggedin') === 'true')
    {
    localStorage.clear()
    alert("Successfully logged out.")
    location.href = "index.html"
    }
    logInSignupHelper()      
})

textLogin.addEventListener('click', () =>{
    logInSignupHelper()
})

btnCreate.addEventListener('click', (e) => {
       
    createUser = mockroblog.createUser(createUserAcc.value, createUserEmail.value, createUserPassword.value);
    
    for (let i =0; i < createUserEmail.value.length; i++)
    {
        if (createUserEmail.value[i] == '@')
        {
            fakeEmail = 0;
            break;
        }
        else if (i == createUserEmail.value.length-1)
        {
            e.preventDefault()
            eerrorMessage = 'Please enter a valid email address.'
            emailErrorElement.innerText = eerrorMessage
            eerror.classList.toggle("hidden")
            fakeEmail = 1;
        }
        
    }

    if (createUserAcc.value.length>=4 &&createUserEmail.value.length>=7 &&createUserPassword.value.length>=8 && fakeEmail != 1)
    {
        alert(`User successfully created.\n\n Email:${createUser.email} \n\n Username: ${createUser.username} \n\n Password: ${createUser.password}`)
        location.href = "user.html";

    }
    else if (createUserEmail.value.length < 7)
    {
        e.preventDefault()
        eerrorMessage = 'Please enter a valid email address.'
        emailErrorElement.innerText = eerrorMessage
        eerror.classList.toggle("hidden")
    }
    else if (createUserAcc.value.length < 4 || createUserAcc.value.length > 20)
    {
        e.preventDefault()
        uerrorMessage = 'Username must be between 4 - 20 characters.'
        userErrorElement.innerText = uerrorMessage
        uerror.classList.toggle("hidden")
    }
    else if (createUserAcc.value == "ProfAvery" || createUserAcc.value == "KevinAWortman" || createUserAcc.value == "Beth_CSUF")
    {
        e.preventDefault()
        uerrorMessage = 'Username already taken.'
        console.log("taken")
        userErrorElement.innerText = uerrorMessage
        uerror.classList.toggle("hidden")
    }
    else if (createUserPassword.value.length < 8 || createUserPassword.value.length > 25)
    {
        e.preventDefault()
        perrorMessage = 'Password must be between 8 - 25 characters.'
        passwordErrorElement.innerText = perrorMessage
        perror.classList.toggle("hidden")
    }

         
})



// Helper functions
function logInSignupHelper(){
    loginContainer.classList.toggle("hidden")
    signupContainer.classList.toggle("hidden")

    if (loginContainer.classList.contains("hidden"))
    {
        signupNav.textContent = "Login"
    }
    else
    {
        signupNav.textContent = "Sign Up"
    }    
   
}