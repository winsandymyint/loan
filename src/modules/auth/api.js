import { get } from 'utils/net'

const getCurrentUser = () => get('/users/me').then(res => res.data)

export { getCurrentUser }
