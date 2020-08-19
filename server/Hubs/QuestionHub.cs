namespace server.Hubs
{
    using System.Threading.Tasks;
    using Microsoft.AspNetCore.SignalR;

    /// <inheritdoc />
    public class QuestionHub: Hub<IQuestionHub>
    {
    }
}
