import {options} from './api_information.js'

// variables
let leagueInput, yearInput
let button, warning, leaguePhoto, leaugeName
let nameMostGoals, goals, imageGoals, nameMostAsists, assists, imageAssists,
 nameMostRedCards, redCards, imageRedCards
const API_LINK = 'https://api-football-v1.p.rapidapi.com/v3/players'

const main = () => {
    prepareDOMElements()
    preapereDOMEvents()
}

const prepareDOMElements = () => {
    leagueInput = document.querySelector('.league-input')
    yearInput = document.querySelector('.year-input')

    button = document.querySelector('button')
    leaugeName = document.querySelector('.league-name')
    warning = document.querySelector('.warning')
    leaguePhoto = document.querySelector('.league-flag')

    nameMostGoals = document.querySelector('.name-top-goalscorer')
    goals = document.querySelector('.number-of-goals')
    imageGoals = document.querySelector('.goals')
    nameMostAsists = document.querySelector('.name-top-assists')
    assists = document.querySelector('.number-of-assists')
    imageAssists = document.querySelector('.assists')
    nameMostRedCards = document.querySelector('.name-top-red-cards')
    redCards = document.querySelector('.number-of-red-cards')
    imageRedCards = document.querySelector('.red-cards')
}

const preapereDOMEvents = () => {
    button.addEventListener('click', getAllStatistics)
}

const checkInput = () => {

    let id, name

    if (leagueInput.value.toLowerCase() === 'premier league') {
        id = 39, name = "Premier League"
    } else if (leagueInput.value.toLowerCase() === 'ligue 1') {
        id = 61, name = "Ligue 1"
    } else if (leagueInput.value.toLowerCase() === 'la liga' || leagueInput.value === 'primera division') {
        id = 25, name = "La Liga"
    } else if (leagueInput.value.toLowerCase() === 'serie a') {
        id = 135, name = "Serie A"
    } else if (leagueInput.value.toLowerCase() === 'bundesliga') {
        id = 78, name = "Bundesliga"
    } else {
        id = -1, name = "Error"
    }

    return [id, name]
}

const getGoals = () => {

    const id = checkInput()[0]
    const seaseon = yearInput.value
    const URL = API_LINK + '/topscorers' + `?league=${id}&season=${seaseon}`

    fetch(URL , options)
	    .then(res => res.json())
	    .then(res => {
            const imageTopGoalscorer = res.response[0].player.photo
            const nameTopGoalscorer = res.response[0].player.name
            const numberOfGoals = res.response[0].statistics[0].goals.total
            const actualLeaguePhoto = res.response[0].statistics[0].league.logo

            imageGoals.setAttribute('src', imageTopGoalscorer)
            leaguePhoto.setAttribute('src', actualLeaguePhoto)
            nameMostGoals.textContent = nameTopGoalscorer
            goals.textContent = numberOfGoals + '⚽'
        })
	    .catch(err => console.log(err))
}

const getAssists = () => {

    const id = checkInput()[0]
    const seaseon = yearInput.value
    const URL = API_LINK + '/topassists' + `?league=${id}&season=${seaseon}`

    fetch(URL, options)
        .then(res => res.json())
        .then(res => {
            const imageTopAssists = res.response[0].player.photo
            const nameTopAssists = res.response[0].player.name
            const numberOfAssists = res.response[0].statistics[0].goals.assists

            imageAssists.setAttribute('src', imageTopAssists)
            nameMostAsists.textContent = nameTopAssists
            assists.textContent = numberOfAssists + '🅰'
        })
        .catch(err => console.log(err))
}

const getRedCards = () => {

    const id = checkInput()[0]
    const seaseon = yearInput.value
    const URL = API_LINK + '/topredcards' + `?league=${id}&season=${seaseon}`

    fetch(URL, options)
        .then(res => res.json())
        .then(res => {
            const imageTopRedCards = res.response[0].player.photo
            const nameTopRedCards = res.response[0].player.name
            const numberOfRedCards = res.response[0].statistics[0].cards.red

            imageRedCards.setAttribute('src', imageTopRedCards)
            nameMostRedCards.textContent = nameTopRedCards
            redCards.textContent = numberOfRedCards + '🟥'
        })
        .catch(err => console.log(err))
}

const getAllStatistics = () => {

    const allowed_leagues = ['premier League', 'la liga', 'primera division', 'serie a', 'bundesliga', 'ligue 1']

    if (leagueInput.value === '' || yearInput.value === '') {
        warning.textContent = 'Podaj wszystkie dane'
    } else {
        getGoals()
        getAssists()
        getRedCards()

        leaugeName.textContent = checkInput()[1]
        leagueInput.value = ''
        yearInput.value = ''
        warning.textContent = ''
    }
}

const checkEnter = e => {
    if (e.key === 'Enter') {
        getAllStatistics()
    }
}

document.addEventListener('DOMContentLoaded', main)