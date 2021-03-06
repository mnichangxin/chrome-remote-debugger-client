import xhr from 'xhr'

export const json2FormUrl = jsonData => {
    let formUrl = ''

    Object.keys(jsonData).forEach((key, i) => {
        let value = jsonData[key]
        if (Object.prototype.toString.call(value) === '[object Object]')
            value = encodeURIComponent(JSON.stringify(value))
        if (i > 0) formUrl += '&'
        formUrl += `${key}=${value}`
    })

    return formUrl
}

export const getWsUrlOrigin = wsOrigin =>
    wsOrigin.replace(/^((https?|ws):\/\/|\/\/)/, '')

export const request = ({ url, method, formType, ...options }) =>
    new Promise((resolve, reject) => {
        if (formType) {
            options.headers = {
                'Content-Type':
                    'application/x-www-form-urlencoded;charset=UTF-8'
            }
            options.data = json2FormUrl(options.data || options.body)
        }
        xhr[method.toLowerCase() || 'get'](url || '', options, (err, res) => {
            if (err) return reject(err)
            if (res.statusCode < 200 || res.statusCode >= 400)
                return reject('Network error, please retry...')
            return resolve(JSON.parse(res.body))
        })
    })

export const to = (promise, errExt) =>
    promise
        .then(data => [null, data])
        .catch(err => {
            if (errExt) Object.assign(err, errExt)
            return [err, undefined]
        })

export const getRandomString = e => {
    e = e || 32
    const t = 'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678'
    const a = t.length
    let n = ''

    for (let i = 0; i < e; i++) n += t.charAt(Math.floor(Math.random() * a))

    return n
}

export const getCurrentScript = () => {
    if (document.currentScript) return document.currentScript
    const scriptElements = document.scripts || []
    const currentScript = scriptElements[scriptElements.length - 1]
    if (currentScript) return currentScript
    return null
}

export const getQuery = () => {
    const query = {}
    const search = location.search.replace('?', '')
    if (search) {
        const searchStrArr = search.split('&')
        searchStrArr.forEach(searchStrItem => {
            const queryStrArr = searchStrItem.split('=')
            const [key, value] = queryStrArr
            query[key] = value
        })
    }
    return query
}

export const getPlatform = userAgent => {
    const ua = userAgent.toLowerCase()
    const testUa = regexp => regexp.test(ua)

    let system = 'unknow'
    let platform = 'unknow'

    if (testUa(/windows|win32|win64|wow32|wow64/g)) {
        system = 'windows'
    } else if (testUa(/macintosh|macintel/g)) {
        system = 'macos'
    } else if (testUa(/x11/g)) {
        system = 'linux'
    } else if (testUa(/android|adr/g)) {
        system = 'android'
    } else if (testUa(/ios|iphone|ipad|ipod|iwatch/g)) {
        system = 'iOS'
    }
    if (system === 'windows' || system === 'macos' || system === 'linux') {
        platform = 'pc'
    } else if (system === 'android' || system === 'iOS' || testUa(/mobile/g)) {
        platform = 'mobile'
    }

    return { platform, system }
}

export const generatePid = (cacheSameOrigin = false) => {
    const currentScript = getCurrentScript()
    let pid = getRandomString(16)

    if (cacheSameOrigin) {
        const origin = location.href
        const storageKey = `__crd_pid_cache`
        const storageValue = localStorage.getItem(storageKey)

        if (storageValue) {
            const storageValueParser = JSON.parse(storageValue)
            if (storageValueParser.origin === origin) pid = storageValueParser.pid
        } else {
            localStorage.setItem(storageKey, JSON.stringify({ origin, pid }))
        }
    }
    if (!cacheSameOrigin && currentScript && currentScript.dataset.pid) {
        return currentScript.dataset.pid
    }

    return pid
}
