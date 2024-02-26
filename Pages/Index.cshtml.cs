using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;
using Cart = fitMode.Models.Cart;
using Microsoft.Azure.Cosmos;
using System.Collections;
using Newtonsoft.Json.Linq;

namespace fitMode.Pages {
    public class IndexModel : PageModel {
        private readonly ILogger<IndexModel> _logger;
        private readonly IHttpContextAccessor _httpContextAccessor;
        private readonly Container _container; 
        private readonly CosmosClient _client;
        private readonly ArrayList names = new ArrayList();
        private readonly ArrayList prices = new ArrayList();
        private readonly ArrayList quantities = new ArrayList();
        private readonly ArrayList images = new ArrayList();
        public string? SessionId { get; private set; }
        public List<Cart>? Cart1 { get; private set; }

        public IndexModel(ILogger<IndexModel> logger, CosmosClient client, IConfiguration configuration, IHttpContextAccessor httpContextAccessor) {
            _logger = logger;
            _client = client;
            _httpContextAccessor = httpContextAccessor;
            var databaseId = configuration["CosmosDbSettings:DatabaseName"];
            var containerId = configuration["CosmosDbSettings:ContainerName"];
            _container = _client.GetContainer(databaseId, containerId);
        }

        public async Task OnGetAsync() {
            if (_httpContextAccessor.HttpContext != null && _httpContextAccessor.HttpContext.Session != null) {
                SessionId = _httpContextAccessor.HttpContext.Session.Id;
            } else {
                SessionId = null;
                Console.WriteLine("Session Id is null");
            }
            //The cookie is used to connect the user to their Cosmos Database Container entry so that they can access their shopping cart.
            if (!HttpContext.Request.Cookies.ContainsKey("MyCookie")) {
                CookieOptions options = new CookieOptions();
                options.Expires = DateTime.Now.AddHours(2);
                options.IsEssential = true;
                options.Path = "/";
                if (SessionId != null) {
                    HttpContext.Response.Cookies.Append("MyCookie", SessionId, options);
                }
                else {
                    Console.WriteLine("Session Id is null");
                }
            }
            string? cookieName = HttpContext.Request.Cookies["MyCookie"];
            if (cookieName != null) {
                string cookieValueString = cookieName.ToString();
                string cookieValueStringFirst4Characters = cookieValueString.Substring(0, 4);
                Cart1 = new List<Cart>();
                string query = $"SELECT * FROM c WHERE c.id = '{cookieValueStringFirst4Characters}'";
                using (FeedIterator<Cart> feedIterator = _container.GetItemQueryIterator<Cart>(new QueryDefinition(query)))
                {
                    while (feedIterator.HasMoreResults) {
                        FeedResponse<Cart> response = await feedIterator.ReadNextAsync();
                        Cart1.AddRange(response);
                    }
                }
            } else {
                // An empty cart needs to be created if they do not have an active shopping cart so that the null error does not occur in the index.cshtml file.
                Cart1 = new List<Cart>();
            }
        }

        public async Task<IActionResult> OnPostAdd(string name, float price, int quantity, string image) {
            string? cookieName = HttpContext.Request.Cookies["MyCookie"];
            string cookieValueString = cookieName != null ? cookieName.ToString() : "default value";
            string cookieValueStringFirst4Characters = cookieValueString.Substring(0, 4);
            try {
                string query = $"SELECT * FROM c WHERE c.id = '{cookieValueStringFirst4Characters}'";
                var queryIterator = _container.GetItemQueryIterator<dynamic>(new QueryDefinition(query));
                //Product name checking is handled in the Javascript so that there are no duplicate entries so this method either adds the new product selection to the already existing shopping cart or creates a new shopping cart entirely if there are no products present.
                if (queryIterator.HasMoreResults) {
                    var response = await queryIterator.ReadNextAsync();
                    if (response.Any()) {
                        foreach (var item in response) {
                            var namesTemp = item["names"];
                            var pricesTemp = item["prices"];
                            var quantitiesTemp = item["quantities"];
                            var imagesTemp = item["images"];
                                namesTemp.Add(name);
                                pricesTemp.Add(price);
                                quantitiesTemp.Add(quantity);
                                imagesTemp.Add(image);
                                ItemResponse<JObject> response2 = await _container.ReplaceItemAsync(item, cookieValueStringFirst4Characters, new PartitionKey(cookieValueStringFirst4Characters));
                        }
                    } else {
                        names.Add(name);
                        prices.Add(price);
                        quantities.Add(quantity);
                        images.Add(image);
                        var newCart = new Cart {
                            id = cookieValueStringFirst4Characters,
                            names = new ArrayList(names),
                            prices = new ArrayList(prices),
                            quantities = new ArrayList(quantities),
                            images = new ArrayList(images),
                        };
                        ItemResponse<Cart> response2 = await _container.CreateItemAsync(newCart, new PartitionKey(newCart.id));
                    }
                } else {
                    Console.WriteLine("Query iterator has no more results");
                }
            }
            catch (Exception ex) {
                Console.WriteLine($"An error occurred: {ex.Message}");
            }
        return RedirectToPage("Index");
        }

        public async Task<IActionResult> OnPostQuantity(string name, float price, int quantity, string image) {
            string? cookieName = HttpContext.Request.Cookies["MyCookie"];
            string cookieValueString = cookieName != null ? cookieName.ToString() : "default value";
            string cookieValueStringFirst4Characters = cookieValueString.Substring(0, 4);
            try {
                //Adding and subtracting the quantities are handled in the Javascript so this method just updates the quantity depending on if it was a plus or minus action that occurred.
                string query = $"SELECT * FROM c WHERE c.id = '{cookieValueStringFirst4Characters}'";
                var queryIterator = _container.GetItemQueryIterator<dynamic>(new QueryDefinition(query));
                if (queryIterator.HasMoreResults) {
                    var response = await queryIterator.ReadNextAsync();
                    if (response.Any()) {
                        foreach (var item in response) {
                            var names = item["names"];
                            var prices = item["prices"];
                            var quantities = item["quantities"];
                            var images = item["images"];
                            // The following for block checks for the product name match so it knows what product quantity to update.
                            for (int i = 0; i < names.Count; i++) {
                                if (names[i] == name) {
                                    names[i] = name;
                                    prices[i] = price;
                                    quantities[i] = quantity;
                                    images[i] = image;
                                    ItemResponse<JObject> response2 = await _container.ReplaceItemAsync(item, cookieValueStringFirst4Characters, new PartitionKey(cookieValueStringFirst4Characters));
                                }
                            }
                        }
                    }
                }
            }
            catch (Exception ex) {
                Console.WriteLine($"An error occurred: {ex.Message}");
            }
        return RedirectToPage("Index");
        }

        public async Task<IActionResult> OnPostRemove(string name) {
            string? cookieName = HttpContext.Request.Cookies["MyCookie"];
            string cookieValueString = cookieName != null ? cookieName.ToString() : "default value";
            string cookieValueStringFirst4Characters = cookieValueString.Substring(0, 4);
            try {
                string query = $"SELECT * FROM c WHERE c.id = '{cookieValueStringFirst4Characters}'";
                var queryIterator = _container.GetItemQueryIterator<dynamic>(new QueryDefinition(query));
                if (queryIterator.HasMoreResults) {
                    var response = await queryIterator.ReadNextAsync();
                    if (response.Any()) {
                        foreach (var item in response) {
                            var names = item["names"];
                            var prices = item["prices"];
                            var quantities = item["quantities"];
                            var images = item["images"];
                            for (int i = 0; i < names.Count; i++) {
                                if (names[i] == name) {
                                    names.RemoveAt(i);
                                    prices.RemoveAt(i);
                                    quantities.RemoveAt(i);
                                    images.RemoveAt(i);
                                    //The following if block either removes the product entry or the document in the container entirely depending on if it was the last item in the shopping cart that was removed.
                                    if (names.Count == 0) {
                                        ItemResponse<JObject> response2 = await _container.DeleteItemAsync<JObject>(cookieValueStringFirst4Characters, new PartitionKey(cookieValueStringFirst4Characters));
                                    } else {
                                        ItemResponse<JObject> response2 = await _container.ReplaceItemAsync(item, cookieValueStringFirst4Characters, new PartitionKey(cookieValueStringFirst4Characters));
                                    }
                                }
                            }
                        }
                    }
                }
            }
            catch (Exception ex) {
                Console.WriteLine($"An error occurred: {ex.Message}");
            }
        return RedirectToPage("Index");
        }
    }
}