import {useOutletContext} from 'react-router-dom'
import {useEffect, useState} from 'react'
import { collection, getDocs, query, where } from 'firebase/firestore'
import { db } from '../../firebase-config'
import Gallery from '../Gallery'

const Profile = () => {
    const {user} = useOutletContext()
    const [account, setAccount] = useState(null)
    const userList = collection(db, 'users')
    const defaultPicture = "https://www.shareicon.net/data/512x512/2016/05/24/770137_man_512x512.png"

    const getUserProfile = async () => {
        const q = query(userList, where('userId', '==', user));
        const info = await getDocs(q)
        if(info.size > 0){
            const obj = info.docs[0]
            setAccount({...obj.data(), id:obj.id})
        }
    }

    useEffect(() => {
        getUserProfile()
    }, [])

    return <div className="grid">
        <div>
            {
                !account
                    ?
                    <p>Please wait loading....</p>
                    :
                    <div>
                        <img
                            className="profile-picture"
                            src={account.profilePicture ? account.profilePicture : defaultPicture}
                        />
                        <h1>{account.name} {account.surname}</h1>
                    </div>
            }
        </div>
        <Gallery />
    </div>
}

export default Profile