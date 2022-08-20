import { Button, TextField } from '@mui/material'
import { collection, addDoc } from 'firebase/firestore'
import {db, storage} from '../../firebase-config'
import {getDownloadURL, ref, uploadBytesResumable} from 'firebase/storage'
import {useOutletContext} from 'react-router-dom'
import {useState, useRef} from 'react'

const AddPost = () => {
    const postList = collection(db, "posts")
    const [text, setText] = useState("")
    const {user} = useOutletContext()
    const photoRef = useRef()
    const [loading, setLoading] = useState(false)

    const handleSubmit = event => {
        event.preventDefault()
        setLoading(true)
        const file = photoRef.current.files[0]
        if(!file){
            return
        }
        const storageRef = ref(storage, `posts/${Date.now() + file.name}`)
        const uploadTask = uploadBytesResumable(storageRef, file)
        uploadTask.on("state_changed", null, null, () => {
            console.log("Uploaded...")

            getDownloadURL(uploadTask.snapshot.ref)
                .then(async (downloadURL) => {
                    await addDoc(postList, {
                        userId:user,
                        photo:downloadURL,
                        title:text,
                        likes:[]
                    })
                    setText("")
                    photoRef.current.value=""
                    setLoading(false)
                });
        })
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <TextField
                    required
                    fullWidth
                    variant="filled"
                    label="What’s on your mind?"
                    value={text}
                    onChange={e => setText(e.target.value)}
                />
                <input type="file" ref={photoRef} />
                <div>
                    <Button disabled={loading} type="submit" variant="contained">POST</Button>
                </div>
            </form>
        </div>
    );
};
export default AddPost;
