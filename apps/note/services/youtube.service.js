'use strict'

const YT_KEY = 'AIzaSyDdy4gq_KDmQFlt7gMQPRbPd3pW0BgqXqc'
const STORAGE_KEY_VIDEOS = 'videosDB'

var gCacheVideos = loadFromStorage(STORAGE_KEY_VIDEOS) || {}


export const youtubeService = {
    getVideos,
    getSearchValues
}

function getVideos(value){
    if(gCacheVideos[value]) return Promise.resolve(gCacheVideos[value])

    const url = `https://www.googleapis.com/youtube/v3/search?part=snippet
    &videoEmbeddable=true&type=video&key=${YT_KEY}&q=${value}`
    
    return axios.get(url)
        .then(res => {
            gCacheVideos[value] = res.data.items
            saveToStorage(STORAGE_KEY_VIDEOS, gCacheVideos)
            console.log(res.data.items)
            return res.data.items
        })
}

