import { TextField, Button } from "@mui/material";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import {collection,addDoc} from 'firebase/firestore'
import { useState } from "react";
import { db } from "../../firebase-config";
import {useNavigate, Link} from 'react-router-dom'

const Signup = () => {
    const [user, setUser] = useState({name: "",surname: "",login: "",password: ""});
    const [error, setError] = useState('')
    const auth = getAuth()
    const navigate = useNavigate()

    const userList = collection(db, "users")

    const handleSubmit = event => {
        event.preventDefault()
        createUserWithEmailAndPassword(auth, user.login, user.password)
        .then(async r => {
            setError('')
            await addDoc(userList, {
                name:user.name,
                surname:user.surname,
                profilePicture:"",
                userId:r.user.uid,
            })
            navigate('/')
        })
        .catch(err => {
            setError(err.message)
        })
    }

    return <div style={{ padding: 30 }}>
        <h1>Signup</h1>
        {error && <p style={{color:"red"}}>{error}</p>}
        <form onSubmit={handleSubmit}>
            <div>
                <TextField
                    label="name"
                    value={user.name}
                    onChange={(e) => setUser({ ...user, name: e.target.value })}
                    />
            </div>
            <div>
                <TextField
                    label="surname"
                    value={user.surname}
                    onChange={(e) => setUser({ ...user, surname: e.target.value })}
                />
            </div>
            <div>
                <TextField
                    label="login"
                    required
                    value={user.login}
                    onChange={(e) => setUser({ ...user, login: e.target.value })}
                />
            </div>
            <div>
                <TextField
                    label="password"
                    required
                    type="password"
                    value={user.password}
                    onChange={(e) => setUser({ ...user, password: e.target.value })}
                />
            </div>
            <div>
                <Button type="submit">Save</Button>
            </div>
        </form>
        <Link to="/" className="link">Already have an account? Sign In</Link>
    </div>
};
export default Signup;
