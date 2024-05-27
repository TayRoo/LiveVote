using VoteLive.Models;
using VoteLive.Repository;
using VoteLive.Services.Interfaces;
using System.Threading.Tasks;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;
using System.Net.Http.Json;

namespace VoteLive.Services
{
    public class VoteService : IVoteService
    {
        private readonly ApplicationDbContext _context;
        private HttpClient _httpClient;

        public VoteService(ApplicationDbContext context, HttpClient httpClient)
        {
            _context = context;
            _httpClient = httpClient ?? throw new ArgumentNullException(nameof(httpClient));
        }

        public async Task PostVoteAsync(Vote vote)
        {
            await _httpClient.PostAsJsonAsync($"api/PostVote", vote);
        }
        public async Task<List<Vote>> GetAllVotesAsync()
        {
            var voteList = await _httpClient.GetFromJsonAsync<List<Vote>>($"api/GetVotes");
            return voteList;
        }
        // add it in DB
        public async Task<Vote> AddVoteAsync(Vote vote)
        {
            _context.Votes.Add(vote);
            await _context.SaveChangesAsync();
            return vote;
        }
    }
}
