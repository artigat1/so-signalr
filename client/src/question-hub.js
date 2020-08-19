import { HubConnectionBuilder, LogLevel } from '@microsoft/signalr'

export default {
    install(Vue) {
        // use a new Vue instance as the interface for Vue components to receive/send SignalR events
        // this way every component can listen to events or send new events using this.$questionHub
        const questionHub = new Vue()
        Vue.prototype.$questionHub = questionHub

        let startedPromise = null

        const connection = new HubConnectionBuilder()
            .withUrl(`${ Vue.prototype.$http.defaults.baseURL }/question-hub`)
            .configureLogging(LogLevel.Information)
            .build()

        // LISTENERS

        // Forward server side SignalR events through $questionHub, where components will listen to them
        connection.on('QuestionScoreChange', (questionId, score) => {
            questionHub.$emit('score-changed', { questionId, score })
        })

        // Forward server side SignalR events through $questionHub, where components will listen to them
        connection.on('AnswerCountChange', (questionId, answerCount) => {
            questionHub.$emit('answer-count-changed', { questionId, answerCount })
        })

        connection.on('AnswerAdded', answer => {
            questionHub.$emit('answer-added', answer)
        })

        questionHub.questionOpened = (questionId) => {
            return startedPromise
                .then(() => connection.invoke('JoinQuestionGroup', questionId))
                .catch(console.error)
        }

        // EVENTS

        questionHub.questionClosed = (questionId) => {
            return startedPromise
                .then(() => connection.invoke('LeaveQuestionGroup', questionId))
                .catch(console.error)
        }

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
