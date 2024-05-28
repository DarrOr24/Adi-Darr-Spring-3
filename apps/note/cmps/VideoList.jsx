const { useState, useEffect } = React

import { youtubeService } from "../services/youtube.service.js"

export function VideoList({searchValue}){

    const[videos, setVideos] = useState([])
    const[isReady, setIsReady] = useState(false)


    useEffect(() => {
        console.log('fromvideo list:',searchValue)

        youtubeService.getVideos(searchValue)
            .then((videosFromService) => setVideos(videosFromService))
            .finally(setIsReady(true))
    }, [])

    

    if(!isReady) return <div className="loader"></div>
    return <section className="video-list">
         <ul>
            {videos.map(({id, snippet}) => 
                <li  key={id.videoId } >
                    <h2> {snippet.title}</h2>
                    <img src={snippet.thumbnails.default.url} alt=""></img>       
                </li>)}
            </ul>
    </section>
}