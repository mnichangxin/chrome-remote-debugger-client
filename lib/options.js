import { generatePid, getQuery, getWsUrlOrigin } from './utils'

export const defaultOptionsFactory = () => {
    const wsOriginQuery = getQuery().wsOrigin
    const hasWsOriginQuery = !!wsOriginQuery
    const pid = generatePid()
    const wsOrigin = getWsUrlOrigin(hasWsOriginQuery ? wsOriginQuery : location.host)

    return { pid, wsOrigin, hasWsOriginQuery }
}

export const mergeOptions = (options = {}) => {
    const defaultOptions = defaultOptionsFactory()
    if (options.wsOrigin && defaultOptions.hasWsOriginQuery) {
        options.wsOrigin = defaultOptions.wsOrigin
    }
    return {
        ...defaultOptions,
        ...options
    }
}
