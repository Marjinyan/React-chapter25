import { ImageList, ImageListItem, ImageListItemBar } from '@mui/material'
import { useNavigate } from 'react-router-dom'

const PostList = ({posts}) => {
    const navigate = useNavigate()

    const postDetails = (post) => {
        if(window.confirm('would you like to switch to the post details page?')){
            navigate('/profile/post/'+post.id)
        }
    }

    return <div >
        <ImageList sx={{width:800}} cols={3} variant="masonry">
        {
            posts.map(post => {
                return (
                <ImageListItem key={post.id}>
                    <img src={post.photo} onClick={() => postDetails(post)} />
                    <ImageListItemBar
                        title={post.title}
                        subtitle={post.likes.length + " LIKES!"}
                    />
                </ImageListItem>
                )
            })
        }
        </ImageList>
    </div>
}
export default PostList