import { TextField, Box, Button } from '@mui/material';
import {useState} from 'react'
import {getAuth, signInWithEmailAndPassword} from 'firebase/auth'
import {useNavigate, Link} from 'react-router-dom'

const Login = () => {

    const [user, setUser] = useState({login:'', password:''})
    const [error, setError] = useState('')
    const auth = getAuth()
    const navigate = useNavigate()
    
    const handleSubmit = event => {
        event.preventDefault()
        signInWithEmailAndPassword(auth, user.login, user.password)
        .then(r => {
            navigate('/profile')
        })
        .catch(err => setError(err.message))
    }

    return (
        <div style={{ padding: 13 }}>
        <h1>Sign in</h1>
        <Box sx={{ width: 500 }}>
            {error && <p style={{color:"red"}}>{error}</p>}
            <form onSubmit={handleSubmit}>
                <div>
                    <TextField 
                        required 
                        fullWidth 
                        label="Email address"
                        value={user.login}
                        onChange={e => setUser({...user, login:e.target.value})}
                    />
                </div>
                <div>
                    <TextField 
                        required 
                        fullWidth 
                        type="password" 
                        label="Password"
                        value={user.password}
                        onChange={e => setUser({...user, password:e.target.value})}
                    />
                </div>
                <div>
                    <Button variant="contained" type="submit">Login</Button>
                </div>
            </form>
            <Link to='/signup' className="link">Create new account</Link>
        </Box>
        </div>
    );
};
export default Login;
