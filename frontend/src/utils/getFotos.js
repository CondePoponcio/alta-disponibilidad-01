import {api} from './api'
import getRandomNumber from './getRandomNumber';
const getFotos = async () => {

    var find = 'battle'
    let fotos = await api.get(`https://api.themoviedb.org/3/search/movie?api_key=15d2ea6d0dc1d476efbca3eba2b9bbfb&query=${find}`)
    var temp = fotos.data.results.map((item, index) => {
        var num = getRandomNumber(1,5)
        var fecha = (new Date(item.release_date)).toISOString()
        return {
            Title: item.title,
            Description: item.overview,
            CreatedAt: fecha,
            UpdatedAt: fecha,
            DeletedAt: null,
            Poster: `https://image.tmdb.org/t/p/w500/${item.poster_path}`
        }
    })
    console.log("Photos: ", temp)
    return temp
}

export default getFotos