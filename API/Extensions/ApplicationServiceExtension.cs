using Application.Activities;
using Application.Core;
using Application.Interfaces;
using FluentValidation;
using FluentValidation.AspNetCore;
using Microsoft.EntityFrameworkCore;
using Persistence;
using Infrastructure.Photos;

namespace API.Extensions
{
    public static class ApplicationServiceExtension
    {
        public static IServiceCollection AddApplicationServices(this IServiceCollection services, IConfiguration configuration)
        {
            // Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
            services.AddEndpointsApiExplorer();
            services.AddSwaggerGen();
            services.AddDbContext<DataContext>(opt => 
            {
               opt.UseSqlite(configuration.GetConnectionString("DefaultConnection"));
            });
 
             services.AddCors(opt => {
                opt.AddPolicy("CorsPolicy", policy => {
                    policy.AllowAnyHeader().AllowAnyMethod().WithOrigins("http://localhost:3000");
                });
             });

             services.AddMediatR(config => config.RegisterServicesFromAssembly(typeof(List.Handler).Assembly));
             services.AddAutoMapper(typeof(MappingProfiles).Assembly);
             services.AddFluentValidationAutoValidation();
             services.AddValidatorsFromAssemblyContaining<Create>();
             services.AddHttpContextAccessor();
             services.AddScoped<IUserAccessor, UserAccessor>();
             services.AddScoped<IPhotoAccessor, PhotoAccessor>();
             services.Configure<CloudinarySettings>(configuration.GetSection("Cloudinary"));
             

             return services;
        }
    }
}