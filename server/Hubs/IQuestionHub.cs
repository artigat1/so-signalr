namespace server.Hubs
{
    using System;
    using System.Threading.Tasks;

    public interface IQuestionHub
    {
        Task QuestionScoreChange(Guid questionId, int score);

        Task AnswerCountChange(Guid questionId, int count);
    }
}
