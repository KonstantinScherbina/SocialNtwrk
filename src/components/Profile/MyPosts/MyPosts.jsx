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

const MyPosts = () => {

    // const [state, dispatch] = useReducer(profileReducer, initialState)

    const { posts, newPostText } = useSelector((state) => state.profilePage)
    

    const dispatch = useDispatch()

    let onAddPost = () => {
        dispatch(addPostAction())
    }

    let newPostElement = React.createRef();
    let onPostChange = () => {
        let text = newPostElement.current.value;
        dispatch(updateNewpostTextAction(text))
    }
   

    let postsElements =
        posts.map(p => <Post message={p.message} likesCount={p.likesCount} />)



    return (
        <div className={s.postsBlock}>
            <h3>My posts</h3>
            <div>
                <div>
                    <textarea onChange={onPostChange} ref={newPostElement}
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