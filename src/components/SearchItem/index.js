import { Link } from 'react-router-dom'

const SearchItem = ({person}) => {
    const defPicture = 'https://cdn.dribbble.com/users/2364329/screenshots/4759681/dribbble-11.jpg'
    return <div className="search-result-item">
        <img src={person.profilePicture ? person.profilePicture : defPicture} />
        <h3>{person.name} {person.surname}</h3>
        <Link to={'/profile/user/account/'+person.id}>See Profile</Link>
    </div>
}

export default SearchItem