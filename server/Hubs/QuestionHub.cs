namespace server.Hubs
{
    using System;
    using System.Threading.Tasks;
    using Microsoft.AspNetCore.SignalR;
    using Microsoft.Extensions.Logging;

    /// <inheritdoc />
    public class QuestionHub: Hub<IQuestionHub>
    {
        private readonly ILogger logger;

        public QuestionHub(ILogger<QuestionHub> logger)
        {
            this.logger = logger;
        }

        // These 2 methods will be called from the client
        public async Task JoinQuestionGroup(Guid questionId)
        {
            this.logger.LogInformation($"Client {Context.ConnectionId} is viewing {questionId}");
            await Groups.AddToGroupAsync(Context.ConnectionId, questionId.ToString());
        }

        public async Task LeaveQuestionGroup(Guid questionId)
        {
            this.logger.LogInformation($"Client {Context.ConnectionId} is no longer viewing {questionId}");
            await Groups.RemoveFromGroupAsync(Context.ConnectionId, questionId.ToString());
        }
    }
}
