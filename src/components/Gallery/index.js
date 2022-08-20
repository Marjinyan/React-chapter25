import { Button } from '@mui/material'
import { collection, getDocs, query, where } from 'firebase/firestore'
import { useEffect, useState } from 'react'
import { useOutletContext } from 'react-router-dom'
import { db } from '../../firebase-config'
import AddPost from '../AddPost'
import PostList from '../PostList'


const Gallery = () => {
    const postList = collection(db, "posts")
    const {user} = useOutletContext()
    const [posts, setPosts] = useState([])
    const [showWindow, setShowWindow] = useState(false)

    const getPosts = async () => {
        const items = await getDocs(query(postList,where("userId", "==", user)))
        setPosts(items.docs.map(elm => ({
            ...elm.data(),
            id:elm.id
        }) ))
    }  

    useEffect(() => {
        getPosts()
    }, [])

    return <div className="gallery">
        <Button onClick={() => setShowWindow(!showWindow)}>
            {showWindow ? 'Close' : 'Open' }
        </Button>
        {showWindow && <AddPost/> }
        <PostList posts = {posts}/>
    </div>
}

export default Gallery