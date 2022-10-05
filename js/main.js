import {options} from './api_information.js'

// variables
let leagueInput, yearInput
let button, countryName, warning, leaguePhoto
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

const mapLeagueToId = () => {
    let id

    if (leagueInput.value === 'Premier League') {
        id = 39
    } else if (leagueInput.value === 'Ligue 1') {
        id = 61
    } else if (leagueInput.value === 'La Liga' || leagueInput.value === 'Primera Division') {
        id = 25
    } else if (leagueInput.value === 'Serie A') {
        id = 135
    } else if (leagueInput.value === 'Bundesliga') {
        id = 78
    }

    return id
}

// 1 - goals, 2 - assists, 3 - red cards
const createGoodUrl = method => {

    const URL = API_LINK

    if (method === 1) {
        URL += '/topscorers'
    } else if (method === 2) {
        URL += '/topassists'
    } else if (method === 3) {
        URL += '/topredcards'
    }

    const id = mapLeagueToId()
    const season = yearInput.value
    URL += `?league=${id}&season=${season}`

    return URL
}

const getGoals = () => {

    const URL = createGoodUrl(1)

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
	    .catch(err => console.error(err))
}

const getAssists = () => {

    const URL = createGoodUrl(2)

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

    const URL = createGoodUrl(3)

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

    const allowed_leagues = ['Premier League', 'La Liga', 'Primera Division', 'Serie A', 'Bundesliga', 'Ligue 1']

    if (leagueInput.value === '' || yearInput.value === '') {
        warning.textContent = 'Podaj wszystkie dane'
    } else {
        getGoals()
        getAssists()
        getRedCards()

        leaugeName.textContent = leagueInput.value
        leagueInput.value = ''
        yearInput.value = ''
    }
}

document.addEventListener('DOMContentLoaded', main)