using System.Text.Json;

namespace API.Extensions
{
    public static class HttpExtensions
    {
        public static void AddPaginationHeader(this HttpResponse response, int currentPage, int itemsPerPage, int totalItem, int totalPages)
        {
            var paginationHeader = new {
                currentPage, 
                itemsPerPage,
                totalItem,
                totalPages
            };

#pragma warning disable ASP0019 // Suggest using IHeaderDictionary.Append or the indexer
            response.Headers.Add("Pagination", JsonSerializer.Serialize(paginationHeader));
#pragma warning restore ASP0019 // Suggest using IHeaderDictionary.Append or the indexer
#pragma warning disable ASP0019 // Suggest using IHeaderDictionary.Append or the indexer
            response.Headers.Add("Access-Control-Expose-Headers", "Pagination");
#pragma warning restore ASP0019 // Suggest using IHeaderDictionary.Append or the indexer
        }
    }
}