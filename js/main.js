import requestOptions from './api_information.js'

const leagueInput = document.querySelector('.league-input')
const yearInput = document.querySelector('.year-input')

const button = document.querySelector('button')
const countryName = document.querySelector('.league-name')
const warning = document.querySelector('.warning')
const leaguePhoto = document.querySelector('.league-flag')

const nameMostGoals = document.querySelector('.name-top-goalscorer')
const goals = document.querySelector('.number-of-goals')
const imageGoalscorer = document.querySelector('.goals')
const nameMostAsists = document.querySelector('.name-top-assists')
const assists = document.querySelector('.number-of-assists')
const imageAssists = document.querySelector('.assists')
const nameMostRedCards = document.querySelector('.name-top-red-cards')
const redCards = document.querySelector('.number-of-red-cards')
const imageRedCards = document.querySelector('.red-cards')


const id = leagueInput.value || 39
const seson = yearInput.value || 2022
const API_LINK = 'https://v3.football.api-sports.io/players'
const API_ID_SEASON = `?league=${id}&season=${seson}`

const getGoals = () => {

    const URL = API_LINK + '/topscorers' + API_ID_SEASON

    fetch(URL , requestOptions)
	    .then(res => res.json())
	    .then(res => {
            const imageTopGoalscorer = res.response[0].player.photo
            const nameTopGoalscorer = res.response[0].player.name
            const numberOfGoals = res.response[0].statistics[0].goals.total

            imageGoalscorer.setAttribute('src', imageTopGoalscorer)
            nameMostGoals.textContent = nameTopGoalscorer
            goals.textContent = numberOfGoals + '⚽'
        })
	    .catch(err => console.error(err));
}

const getAssists = () => {

    const URL = API_LINK + '/topassists' + API_ID_SEASON

    fetch(URL, requestOptions)
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

    const URL = API_LINK + '/topredcards' + API_ID_SEASON

    fetch(URL, requestOptions)
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

getGoals()
getAssists()
getRedCards()