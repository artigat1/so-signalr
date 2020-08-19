<template>
    <b-modal @hidden="onHidden" hide-footer id="addAnswerModal" ref="addAnswerModal" title="Add new Answer">
        <b-form @reset.prevent="onCancel" @submit.prevent="onSubmit">
            <b-form-group label="Your Answer:" label-for="answerInput">
                <b-form-textarea :max-rows="10"
                                 :rows="6"
                                 id="answerInput"
                                 placeholder="Type your answer"
                                 v-model="form.body" />
            </b-form-group>

            <button class="btn btn-primary float-right ml-2" type="submit">Submit</button>
            <button class="btn btn-secondary float-right" type="reset">Cancel</button>
        </b-form>
    </b-modal>
</template>

<script>
    export default {
        data() {
            return {
                form: {
                    body: '',
                },
                questionId: this.$route.params.id,
            }
        },
        methods: {
            onSubmit(evt) {
                this.$http
                    .post(`api/question/${ this.questionId }/answer`, this.form)
                    .then(res => {
                        this.$emit('answer-added', res.data)
                        this.$refs.addAnswerModal.hide()
                    })
            },
            onCancel(evt) {
                this.$refs.addAnswerModal.hide()
            },
            onHidden() {
                Object.assign(this.form, {
                    answer: '',
                })
            },
        },
    }
</script>
