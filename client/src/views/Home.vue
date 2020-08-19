<template>
    <div>
        <h1>
            This totally looks like Stack Overflow
            <button class="btn btn-primary mt-2 float-right" v-b-modal.addQuestionModal>
                <i class="fas fa-plus" /> Ask a question
            </button>
        </h1>
        <ul class="list-group question-previews mt-4">
            <question-preview :key="question.id"
                              :question="question"
                              class="list-group-item list-group-item-action mb-3"
                              v-for="question in questions" />
        </ul>
        <add-question-modal @question-added="onQuestionAdded" />
    </div>
</template>

<script>
    import QuestionPreview from '@/components/question-preview'
    import AddQuestionModal from '@/components/add-question-modal'

    export default {
        components: {
            QuestionPreview,
            AddQuestionModal,
        },
        data() {
            return {
                questions: [],
            }
        },
        created() {
            this.$http.get('/api/question').then(res => {
                this.questions = res.data
            })
        },
        methods: {
            onQuestionAdded(question) {
                this.questions = [question, ...this.questions]
            },
        },
    }
</script>

<style>
    .question-previews .list-group-item {
        cursor: pointer;
    }
</style>
