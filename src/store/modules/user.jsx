import { createSlice } from '@reduxjs/toolkit'
import axios from 'axios'
// import { useState } from 'react'
// import { useNavigate } from 'react-router-dom'
const gitHubclientID = "Ov23lic3bKUAGFvB9d1c"
// const clientSecrets = "896350ba971a2f10182105fb5335c03842e96fdf"

const giteeclientID = "4f7c61f58c01462d3c3d60f1ea8543a5393b44099a2ac6840346c6ef713aa1bb"
// const giteeredirect_uri = "http://localhost:5173/loading"
// const giteeredirect_uri = "http://blog.lsltest.top/loading"
const giteeredirect_uri = import.meta.env.VITE_GITEE_REDIRECT_URI
// console.log('giteeclientID', import.meta.env.VITE_GITEE_REDIRECT_URI)
let githubURL = `https://github.com/login/oauth/authorize?client_id=${gitHubclientID}`
let giteeURL = `https://gitee.com/oauth/authorize?client_id=${giteeclientID}&redirect_uri=${giteeredirect_uri}&response_type=code&scope=user_info`
const userStore = createSlice({
    name: 'user',
    initialState: {
        code: "",
        userInfo: localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')) : {},
        vip: false
    },
    reducers: {
        setCode: (state, action) => {
            state.code = action.payload
        },
        setPlatform: (state, action) => {
            state.Platform = action.payload
        },
        Logout: (state,) => {
            state.userInfo = {}
            localStorage.removeItem('userInfo')
            console.log('Logout')
        }
    }
})

export const { setCode,setPlatform ,Logout} = userStore.actions
// 异步代码
export const login = (e) => {
    setPlatform(e)
    console.log('e', e)
    return async () => {
        if (e == 'github') {
            window.location.href = githubURL
        } else if (e == 'gitee') {
            window.location.href = giteeURL
        }
    }
}

export const getUserInfo = () => {
    let platform = localStorage.getItem('platform')
    return async (dispatch, getState) => {
        // github授权码
        const state = getState()
        const code = state.user.code
        const res = await axios.get(`/blogApi/getUserInfo?code=${code}&Platform=${platform}`)
        // // 存储用户信息
        if(!res.data.error){
            localStorage.setItem('userInfo',JSON.stringify(res.data))
            return true
        }else{
            return false
        }
    }
}

const reducers = userStore.reducer

export default reducers
