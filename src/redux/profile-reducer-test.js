import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import profileReducerSlice from "./profile-reducer-slice";

it('length of posts should be incremented', () => {
    let action = addPostAction('it-kamasutra.com')
    let state = {
        posts: [
            { id: 1, message: 'Hi, how are you?', likesCount: 12 },
            { id: 2, message: 'It\'s my first post', likesCount: 11 },
            { id: 3, message: 'Blabla', likesCount: 11 },
            { id: 4, message: 'Dada', likesCount: 11 }
        ]
    }
    let newState = profileReducerSlice(state, action)

    expect(newState.posts.length).toBe(5)
});