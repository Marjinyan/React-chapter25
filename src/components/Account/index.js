import { collection, getDocs, getDoc, doc, query, where } from 'firebase/firestore'
import { db } from '../../firebase-config'
import {useState, useEffect} from 'react'
import {useNavigate, useParams} from 'react-router-dom'
import PostList from '../PostList'

const Account = () => {
    const postList = collection(db, 'posts')
    const navigate = useNavigate()
    const [user, setUser] = useState(null)
    const [posts, setPosts] = useState([])
    const defaultPic= "https://www.shareicon.net/data/512x512/2016/05/24/770137_man_512x512.png"

    const {id} = useParams()

    const getUser = async () => {
        const docRef = doc(db,'users', id)
        const obj = await getDoc(docRef)
        if(!obj._document){
            return navigate('/profile/search')
        }
        getPosts(obj.data().userId)
        setUser({...obj.data(), id:obj.id})
    }

    const getPosts = async (id) => {
        const items = await getDocs(query(postList, where('userId','==',id)))
        setPosts(items.docs.map(elm => {
            return {
                ...elm.data(),
                id:elm.id
            }
        }))
    }

    useEffect(() => {
        getUser()
    }, [])

    return <div>
        {
            !user
                ?
                <p>Loading... please wait</p>
                :
                <div className="grid">
                    <div>
                        <img
                            className="profile-picture"
                            src={user.profilePicture || defaultPic}
                        />
                        <h3>{user.name} {user.surname}</h3>
                    </div>
                    <PostList posts={posts} />
                </div>
        }
    </div>
}

export default Account