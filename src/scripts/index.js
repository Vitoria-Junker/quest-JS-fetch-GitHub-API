import { getUser } from '/src/scripts/services/user.js'
import { getRepos } from '/src/scripts/services/repositories.js'
import { events } from '/src/scripts/services/events.js'
import { user } from '/src/scripts/objects/user.js'
import { screen } from '/src/scripts/objects/screen.js'

document.getElementById('btn-search').addEventListener('click', () => {
    const userName = document.getElementById('input-search').value
    
    if(validateEmptyInput(userName)) return    
    getUserData(userName)
})

document.getElementById('input-search').addEventListener('keyup', (e) => {
    const userName = e.target.value
    const key = e.which || e.keyCode
    const isEnterKeyPressed = key === 13

    if (isEnterKeyPressed) {
        if(validateEmptyInput(userName)) return  
        getUserData(userName)
    }
})


function validateEmptyInput(userName){
    if(userName.length === 0){
        alert('Enter a GitHub user name')
        return true
    }
}


 async function getUserData(userName) {

    const userResponse = await getUser(userName)

    if(userResponse.message === "Not Found") {
        screen.renderNotFound()
        return
    }

    const repositoriesResponse = await getRepos(userName)
    const eventsResponse = await events(userName)

    user.setInfo(userResponse)
    user.setRepositories(repositoriesResponse)
    user.setEvents(eventsResponse)

    screen.renderUser(user)
}





