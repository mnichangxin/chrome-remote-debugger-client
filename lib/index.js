import chobitsu from '@mnichangxin/chobitsu'
import Socket from './socket'
import { mergeOptions } from './options'
import { getMetaData } from './metaData'
import { request, to } from './utils'

export default class DebuggerClient {
    constructor(options) {
        options = mergeOptions(options)
        this.pid = options.pid
        this.wsOrigin = options.wsOrigin
        this.metaData = getMetaData()
        this.socket = null
    }
    async register() {
        const url = `//${this.wsOrigin}/register`
        const requestData = {
            pid: this.pid,
            wsOrigin: this.wsOrigin,
            metaData: this.metaData
        }
        const [err, res] = await to(
            request({
                url,
                method: 'post',
                formType: true,
                data: requestData
            })
        )
        if (err) return [err, null]
        if (res.errNo === 0) return [null, res]
        return [null, null]
    }
    initSocket() {
        this.socket = new Socket(
            `ws://${this.wsOrigin}/devtools/page/${this.pid}`
        )
        this.socket.io.emit('connected')
        this.socket.io.on('cdp', chobitsu.sendRawMessage.bind(chobitsu))
        chobitsu.setOnMessage(message => this.socket.io.emit('cdp', message))
    }
    async init() {
        const [err, res] = await this.register()
        if (err) return console.log(err)
        if (res) this.initSocket()
        else console.log('Please refresh page to retry...')
    }
}
