import axios from 'axios'
import { getCookie, deleteCookie } from '../../helpers/cookie.js'
export default {
  state: {
    list: [],
    token: undefined,
    isAuth: false,
  },
  mutations: {
    updateList(state, list) {
      state.list = list
    },
    changeTaskState(state, id) {
      state.list.forEach((task) => {
        if (task.id === id) {
          task.completed = !task.completed
          return
        }
      })
    },
    addNewTask(state, newTask) {
      state.list.splice(state.list.length, 1, newTask)
    },
    deleteTask(state, taskId) {
      const idx = state.list.findIndex((el) => el.id === taskId)
      state.list.splice(idx, 1)
    },
    setToken(state, token) {
      state.token = token
    },
    saveTokens(state, tokens) {
      window.document.cookie = `accessToken=${tokens.accessToken};max-age=3600`
      window.localStorage.setItem(`refreshToken`, tokens.refreshToken)

      state.token = tokens.accessToken
    },
    Auth(state) {
      state.isAuth = true
    },
    Exit(state) {
      window.localStorage.removeItem('refreshToken')
      deleteCookie('accessToken')
      state.isAuth = false
    },
  },
  actions: {
    async authUser(ctx, user) {
      const hasError = false
      return axios
        .post('https://test-to-do-list1.herokuapp.com/auth', {
          login: user.login,
          password: user.password,
        })
        .then((res) => {
          ctx.commit('saveTokens', res.data)
          return { hasError }
        })

        .catch((e) => {
          return { hasError: true }
        })
    },
    async createUser(ctx, newUser) {
      return axios
        .post('https://test-to-do-list1.herokuapp.com/registr', {
          login: newUser.login,
          password: newUser.password,
        })
        .catch((e) => e)
    },
    async refreshTokens(ctx, refreshToken) {
      return axios({
        method: 'post',
        url: 'https://test-to-do-list1.herokuapp.com/auth/refresh',
        data: {
          refreshToken,
        },
      })
        .then((res) => {
          ctx.commit('saveTokens', res.data)

          return res
        })
        .catch((e) => {
          return e.response
        })
    },
    async getList(ctx) {
      ctx.dispatch('checkTokens', { fnName: 'getListFromServer' })
    },
    async getListFromServer(ctx) {
      axios({
        method: 'get',
        url: 'https://test-to-do-list1.herokuapp.com/',
        headers: { Authorization: `Bearer ${ctx.state.token}` },
      })
        .then((list) => {
          ctx.commit('updateList', list.data)
        })
        .catch((e) => e.response)
    },
    async updateTaskState(ctx, itemId) {
      ctx.commit('changeTaskState', itemId)
      await ctx.dispatch('checkTokens', { fnName: 'updateList' })
    },
    async createTask(ctx, newTask) {
      ctx.commit('addNewTask', newTask)
      await ctx.dispatch('checkTokens', { fnName: 'updateList' })
    },
    async deleteTask(ctx, taskId) {
      ctx.commit('deleteTask', taskId)
      await ctx.dispatch('checkTokens', { fnName: 'updateList' })
    },
    async updateList(ctx) {
      axios({
        method: 'post',
        url: 'https://test-to-do-list1.herokuapp.com/auth/update',
        headers: { Authorization: `Bearer ${ctx.state.token}` },
        data: {
          list: ctx.state.list,
        },
      }).catch((e) => e.response)
    },
    async checkTokens(ctx, payload) {
      const token = getCookie('accessToken')

      if (token) {
        await ctx.dispatch(payload.fnName, payload.fnPayload)
        ctx.commit('Auth')
      } else {
        const refreshToken = localStorage.getItem('refreshToken')

        if (refreshToken) {
          const response = await ctx.dispatch('refreshTokens', refreshToken)

          if (response.status === 200) {
            await ctx.dispatch(payload.fnName, payload.fnPayload)
            ctx.commit('Auth')
          } else {
            ctx.commit('Exit')
          }
        } else {
          ctx.commit('Exit')
        }
      }
    },
  },
  getters: {
    getAllList(state) {
      return state.list
    },
    getAuth(state) {
      return state.isAuth
    },
  },
}
