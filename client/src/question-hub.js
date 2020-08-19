import { HubConnectionBuilder, LogLevel } from '@microsoft/signalr'

export default {
    install(Vue) {
        let startedPromise = null

        const connection = new HubConnectionBuilder()
            .withUrl(`${ Vue.prototype.$http.defaults.baseURL }/question-hub`)
            .configureLogging(LogLevel.Information)
            .build()

        function start () {
            startedPromise = connection.start().catch(err => {
                console.error('Failed to connect with hub', err)
                return new Promise((resolve, reject) =>
                    setTimeout(() => start().then(resolve).catch(reject), 5000))
            })
            return startedPromise
        }
        connection.onclose(() => start())

        start()
    },
}
