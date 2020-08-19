namespace server.Hubs
{
    using System;
    using System.Threading.Tasks;
    using Models;

    public interface IQuestionHub
    {
        Task QuestionScoreChange(Guid questionId, int score);

        Task AnswerCountChange(Guid questionId, int answerCount);

        Task AnswerAdded(Answer answer);
    }
}
