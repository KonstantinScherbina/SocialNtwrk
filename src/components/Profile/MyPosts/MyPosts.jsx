import React from 'react';
import { useEffect } from 'react';
import { useReducer } from 'react';
// import profileReducer, { addPostActionCreator, updateNewPostTextActionCreator } from '../../../redux/profile-reducer';
import { addPostAction, updateNewpostTextAction } from '../../../redux/profile-reducer-slice';
import profileReducerSlice from '../../../redux/profile-reducer-slice';
// import { initialState } from '../../../redux/profile-reducer';
import s from './MyPosts.module.css';
import Post from './Post/Post';
import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';


// my posts on profile page
const MyPosts = () => {


    console.log("RENDER")

    // const { posts, newPostText } = useSelector((state) => state.profilePage.posts)
    const posts = useSelector((state) => state.profilePage.posts)


    debugger
    const [newPostText, setNewPostText] = useState()
    const dispatch = useDispatch()

    // const newPostText = ''

    let onAddPost = () => {
        dispatch(addPostAction(newPostText))
        setNewPostText('')
    }

    // let newPostElement = React.createRef();
    let onPostChange = (e) => {
        debugger
        let text = e.target.value
        debugger
        // dispatch(updateNewpostTextAction(text))
        (setNewPostText(text))
    }

    debugger

    let postsElements = posts.map(p => <Post message={p.message} likesCount={p.likesCount} />)

    debugger


    return (
        <div className={s.postsBlock}>
            <h3>My posts</h3>
            <div>
                <div>
                    <textarea
                        onChange={onPostChange}
                        placeholder="Enter your post"
                        value={newPostText} />
                </div>
                <div>
                    <button onClick={onAddPost}>Add post</button>
                </div>
            </div>
            <div className={s.posts}>
                {postsElements}
            </div>
        </div>
    )
}

export default MyPosts;