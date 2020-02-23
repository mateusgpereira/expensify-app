import { login, logout } from '../../actions/auth'

test('should setup login action object', () => {
    const uid ='123asd'
    const loginAction = login(uid)
    expect(loginAction).toEqual({
        type: 'LOGIN',
        uid
    })
})

test('should setup logout action object', () => {
    const logoutAction = logout()
    expect(logoutAction).toEqual({type: 'LOGOUT'})
})