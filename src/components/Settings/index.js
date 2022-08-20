import {useRef} from 'react'
import {db, storage} from '../../firebase-config'
import {getDownloadURL, ref, uploadBytesResumable} from 'firebase/storage'
import {updateDoc, collection, doc, query, where, getDocs} from 'firebase/firestore'
import { useNavigate, useOutletContext } from 'react-router-dom'
import { Button } from '@mui/material'

const Settings = () => {
    const photoRef = useRef()
    const userList = collection(db, "users")
    const {user} = useOutletContext()
    const navigate = useNavigate()

    const handleSubmit = event => {
        event.preventDefault()
        const file = photoRef.current.files[0];
        if(!file){
            return
        }
        const storageRef = ref(storage, `files/${Date.now() + file.name}`)
        const uploadTask = uploadBytesResumable(storageRef, file)
        uploadTask.on("state_changed", null, null, () => {
            console.log("Uploaded...")

            getDownloadURL(uploadTask.snapshot.ref)
                .then(async (downloadURL) => {
                    const q = query(userList, where("userId", "==", user));
                    const info = await getDocs(q)
                    if(info.size > 0){
                        let id = info.docs[0].id
                        await updateDoc(doc(db, "users", id), {profilePicture:downloadURL})
                        navigate("/profile")
                    }
                });
        })
    }
    return <div>
        <form onSubmit={handleSubmit}>
            <input type="file" ref={photoRef} />
            <div>
                <Button variant="contained" type="submit">Upload!</Button>
            </div>
        </form>
    </div>
}
export default Settings