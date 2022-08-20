import { doc, getDoc, updateDoc } from 'firebase/firestore'
import {useParams, useOutletContext, useNavigate} from 'react-router-dom'
import {useState, useEffect} from 'react'
import { db } from '../../firebase-config'
import { Button } from '@mui/material'

const PostDetails = () => {
    const {id} = useParams()
    const {user} = useOutletContext()
    const [post, setPost] = useState(null)
    const [didILiked, setDidILiked] = useState(false)
    const navigate = useNavigate()

    const getPostInfo = async () => {
        const item = doc(db, 'posts', id)
        const obj = await getDoc(item)
        if(!obj._document){
            return navigate('/profile')
        }
        if(obj.data().likes.includes(user)){
            setDidILiked(true)
        }
        setPost(obj.data())
    }

    const handleLike = async () => {
        const currentPost = doc(db,'posts', id)
        let likes = [...post.likes, user]
        await updateDoc(currentPost, {likes})
        setDidILiked(true)
        setPost({...post, likes:likes})
    }

    const handleUnlike = async () => {
        const currentPost = doc(db,'posts', id)
        let temp = [...post.likes]
        temp.splice(post.likes.indexOf(user), 1)
        await updateDoc(currentPost, {likes:temp})
        setDidILiked(false)
        setPost({...post, likes:[...temp]})
    }
    

    useEffect(() => {
        getPostInfo()
    }, [])

    return <div>
        {
            post && <div className="post">
                {
                    didILiked
                        ?
                        <Button onClick={handleUnlike} variant="contained">Unlike</Button>
                        :
                        <Button onClick={handleLike} variant="contained">Like</Button>
                }
                <h3>{post.title} ({post.likes.length} LIKES)</h3>
                <img src={post.photo}/>
            </div>
        }
    </div>
    }
    export default PostDetails