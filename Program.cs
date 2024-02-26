using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Azure.Cosmos;
using Microsoft.Extensions.Logging;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddRazorPages();

builder.Services.AddHttpContextAccessor();

// Add session services
builder.Services.AddDistributedMemoryCache();

builder.Services.AddSession(options =>
{
    // options.IdleTimeout = TimeSpan.FromSeconds(10);
    // options.Cookie.HttpOnly = true;
    // options.Cookie.IsEssential = true;
});
builder.Services.AddLogging(loggingBuilder =>
{
    loggingBuilder.AddConsole(); // Use Console logger provider
    loggingBuilder.SetMinimumLevel(LogLevel.Trace); // Set the minimum log level to Trace
});

builder.Services.AddSingleton<CosmosClient>(serviceProvider =>
{
    return new CosmosClient("AccountEndpoint=[SECRET ENDPOINT]");
});

var app = builder.Build();

// Configure the HTTP request pipeline.
if (!app.Environment.IsDevelopment())
{
    app.UseExceptionHandler("/Home/Error");
    // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
    app.UseHsts();
}

app.UseHttpsRedirection();
app.UseStaticFiles();

app.UseRouting();
app.UseSession();
app.UseAuthorization();

app.MapRazorPages();

app.Run();
