const tokenName = 'aspire-user-token'

const isLocalStorageAvailable = () => {
    try {
        window.localStorage.setItem('test', 'test')
        window.localStorage.removeItem('test')
        return true
    } catch (e) {
        return false
    }
}

const storage = {
    isAuthenticated: () => storage.get('user') !== null,

    get: key => {
        if (isLocalStorageAvailable()) {
            return window.localStorage.getItem(key)
        }

        const regex = new RegExp('(?:(?:^|.*;\\s*)' + key + '\\s*\\=\\s*([^;]*).*$)|^.*$')
        const cookie = document.cookie.replace(regex, '$1')
        if (cookie) {
            return cookie
        }
        return null
    },

    set: (key, value) => {
        if (isLocalStorageAvailable()) {
            window.localStorage.setItem(key, value)
            return
        }
        const date = new Date()
        date.setTime(date.getTime() + 86400000)
        document.cookie = `${key}=${value};expires=${date.toGMTString()}`
        return
    },

    remove: key => {
        if (isLocalStorageAvailable()) {
            window.localStorage.removeItem(key)
            return
        }
        const expiry = '=; expires=Thu, 01 Jan 1970 00:00:00 GMT'
        document.cookie = `${key}${expiry}`
        return
    }
}

export { tokenName }

export default storage
