using Domain;
using Microsoft.AspNetCore.Identity;
using System;


namespace Persistence
{
    public class DbInitializer
    {
        public static async Task SeedData(AppDbContext context, UserManager<User> userManager)
        {
            var users = new List<User>
            {
                new() { DisplayName = "Ismaeel Moussa", UserName = "ismaeel.moussa@test.com", Email = "ismaeel.moussa@test.com" },
                new() { DisplayName = "Abdalnoor Alhajo", UserName = "abdalnoor.alhajo@test.com", Email = "abdalnoor.alhajo@test.com" },
                new() { DisplayName = "Ali Shwail", UserName = "ali.shwail@test.com", Email = "ali.shwail@test.com" },
                new() { DisplayName = "Ali Mohammed", UserName = "ali.mohammed@test.com", Email = "ali.mohammed@test.com" },
            };

            if (!userManager.Users.Any())
            {
                foreach( var user in users)
                {
                    await userManager.CreateAsync(user, "Pa$$w0rd");
                }
            }


            if (context.Activities.Any()) return;
            
            
            var activities = new List<Activity>
            {  new()
                {
                    Title = "Basketball Match at Altinbas University",
                    Date = DateTime.Now.AddMonths(1),
                    Description = "Playing basketball match.",
                    Category = "sport", 
                    City = "Istanbul",
                    Venue = "Altinbas Mahmutbey Campus, Istanbul, Turkey",
                    Latitude = 41.0575, 
                    Longitude = 28.8204, 
                    Attendees =
                    [
                        new() { UserId = users[3].Id, IsHost = true },
                        new() { UserId = users[0].Id },
                        new() { UserId = users[2].Id },
                        new() { UserId = users[1].Id },
                    ]
                },
                new()
                {
                    Title = "Historical Agriculture Talk",
                    Date = DateTime.Now.AddMonths(4),
                    Description = "A look back at agriculture and history, held near the Hagia Sophia.",
                    Category = "agriculture", 
                    City = "Istanbul", 
                    Venue = "Hagia Sophia, Sultanahmet, Istanbul, Turkey", 
                    Latitude = 41.0086, 
                    Longitude = 28.9800, 
                    Attendees =
                    [
                        new() { UserId = users[0].Id, IsHost = true },
                        new() { UserId = users[2].Id },
                        new() { UserId = users[1].Id },
                        new() { UserId = users[3].Id }
                    ]
                },
                new()
                {
                    Title = "Topkapi Palace Cultural Tour",
                    Date = DateTime.Now.AddMonths(1),
                    Description = "A guided cultural tour of the Topkapi Palace.",
                    Category = "culture",
                    City = "Istanbul", 
                    Venue = "Topkapi Palace, Cankurtaran, Istanbul, Turkey", 
                    Latitude = 41.0116, 
                    Longitude = 28.9834, 
                    Attendees =
                    [
                        new() { UserId = users[1].Id, IsHost = true },
                        new() { UserId = users[2].Id },
                        new() { UserId = users[0].Id }
                    ]
                },
                new()
                {
                    Title = "Blue Mosque Architectural Study",
                    Date = DateTime.Now.AddMonths(2),
                    Description = "Exploring the culture and architecture of the Blue Mosque.",
                    Category = "culture",
                    City = "Istanbul", 
                    Venue = "Blue Mosque, Sultanahmet, Istanbul, Turkey", 
                    Latitude = 41.0054, 
                    Longitude = 28.9768, 
                    Attendees =
                    [
                        new() { UserId = users[2].Id, IsHost = true },
                        new() { UserId = users[3].Id }
                    ]
                },
                new()
                {
                    Title = "Live Music at the Grand Bazaar",
                    Date = DateTime.Now.AddMonths(2),
                    Description = "Finding hidden music spots in the Grand Bazaar.",
                    Category = "music",
                    City = "Istanbul", 
                    Venue = "Grand Bazaar, Beyazıt, Istanbul, Turkey", 
                    Latitude = 41.0105, 
                    Longitude = 28.9681, 
                    Attendees =
                    [
                        new() { UserId = users[0].Id, IsHost = true },
                        new() { UserId = users[2].Id }
                    ]
                },
                new()
                {
                    Title = "Urban Agriculture Meetup near Galata",
                    Date = DateTime.Now.AddMonths(3),
                    Description = "Discussing urban farming with a view of the Galata Tower.",
                    Category = "agriculture", 
                    City = "Istanbul", 
                    Venue = "Galata Tower, Bereketzade, Istanbul, Turkey", 
                    Latitude = 41.0256, 
                    Longitude = 28.9744, 
                    Attendees =
                    [
                        new() { UserId = users[3].Id, IsHost = true }
                    ]
                },
                new()
                {
                    Title = "Dolmabahçe Palace Garden Tour",
                    Date = DateTime.Now.AddMonths(4),
                    Description = "A historical look at the agriculture and gardens of the palace.",
                    Category = "agriculture", 
                    City = "Istanbul", 
                    Venue = "Dolmabahçe Palace, Vişnezade, Istanbul, Turkey", 
                    Latitude = 41.0391, 
                    Longitude = 29.0017, 
                    Attendees =
                    [
                        new() { UserId = users[2].Id, IsHost = true },
                        new() { UserId = users[1].Id }
                    ]
                },
                new()
                {
                    Title = "Cultural Cruise on the Bosphorus",
                    Date = DateTime.Now.AddMonths(5),
                    Description = "Exploring cultural sights along the Bosphorus.",
                    Category = "culture",
                    City = "Istanbul", 
                    Venue = "Bosphorus Strait, Istanbul, Turkey", 
                    Latitude = 41.1194, 
                    Longitude = 29.0753, 
                    Attendees =
                    [
                        new() { UserId = users[1].Id, IsHost = true }
                    ]
                },
                new()
                {
                    Title = "Classical Music in the Basilica Cistern",
                    Date = DateTime.Now.AddMonths(6),
                    Description = "An atmospheric concert in the Basilica Cistern.",
                    Category = "music",
                    City = "Istanbul", 
                    Venue = "Basilica Cistern, Yerebatan, Istanbul, Turkey", 
                    Latitude = 41.0084, 
                    Longitude = 28.9779, 
                    Attendees =
                    [
                        new() { UserId = users[1].Id, IsHost = true },
                        new() { UserId = users[3].Id }
                    ]
                },
                new()
                {
                    Title = "Taksim Square & Istiklal Street Walk",
                    Date = DateTime.Now.AddMonths(7),
                    Description = "A trip and photography walk starting at Taksim.",
                    Category = "trip",
                    City = "Istanbul", 
                    Venue = "Taksim Square, Gümüşsuyu, Istanbul, Turkey", 
                    Latitude = 41.0369, 
                    Longitude = 28.9870, 
                    Attendees =
                    [
                        new() { UserId = users[2].Id, IsHost = true },
                        new() { UserId = users[1].Id }
                    ]
                },
                new()
                {
                    Title = "Sunset Filming at Maiden's Tower",
                    Date = DateTime.Now.AddMonths(8),
                    Description = "A film-making meetup to capture the sunset.",
                    Category = "film",
                    City = "Istanbul", 
                    Venue = "Maiden's Tower, Salacak, Istanbul, Turkey", 
                    Latitude = 41.0211, 
                    Longitude = 29.0041, 
                    Attendees =
                    [
                        new() { UserId = users[0].Id, IsHost = true },
                        new() { UserId = users[3].Id  },
                        new() { UserId = users[1].Id },
                    ]
                }

            };

            context.Activities.AddRange(activities);
            await context.SaveChangesAsync();
        }
    }
}
