const { useState, useEffect } = React

import { youtubeService } from "../services/youtube.service.js"

export function VideoList({searchValue, onSelectVideo}){

    const[videos, setVideos] = useState([])
    const[isReady, setIsReady] = useState(false)

    

    useEffect(() => {
        console.log('fromvideo list:',searchValue)

        youtubeService.getVideos(searchValue)
            .then((videosFromService) => setVideos(videosFromService))
            .finally(setIsReady(true))
    }, [videos])

    function selectVideo(ev,videoId){
        ev.stopPropagation()

        const videoUrl = `https://www.youtube.com/embed/${videoId}?autoplay=1&mute=1`
        onSelectVideo(videoUrl)
        setIsReady(false)
        
    }

    

    if(!isReady) return <div className="loader"></div>
    return <section className="video-list">
         <ul>
            {videos.map(({id, snippet}) => 
                <li  key={id.videoId }  >
                    <div onClick={(event)=>selectVideo(event,id.videoId)}>
                        <h2> {snippet.title}</h2>
                        <img src={snippet.thumbnails.default.url} alt=""></img> 
                    </div>
                          
                </li>)}
            </ul>
    </section>
}