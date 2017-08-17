using ApplicationManager.DAL;
using ApplicationManager.DAL.Entites;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.SpaServices.Webpack;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using System.Text;
using ApplicationManager.Model;

namespace ApplicationManager
{
    public class Startup
    {
        public Startup(IHostingEnvironment env)
        {
            var builder = new ConfigurationBuilder()
                .SetBasePath(env.ContentRootPath)
                .AddJsonFile("appsettings.json", optional: true, reloadOnChange: true)
                .AddJsonFile($"appsettings.{env.EnvironmentName}.json", optional: true)
                .AddEnvironmentVariables();
            Configuration = builder.Build();
        }

        public IConfigurationRoot Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddDbContext<AppDbContext>(options =>
                options.UseSqlServer(Configuration.GetConnectionString("DefaultConnection")));
            ConfigureServicesIdentity(services);

            services.AddAuthorization(cfg =>
            {
                cfg.AddPolicy("isSuperUser", p => p.RequireClaim("isSuperUser", "true"));
            });

            services.Configure<AppConfiguration>(Configuration.GetSection("AppConfiguration"));
            services.AddTransient<IdentitySetup>();

     //       services.AddSingleton<IBaseRepository<ApplicationEntiry>, ApplicationRepository>();
            services.AddMvc();
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IHostingEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
                app.UseWebpackDevMiddleware(new WebpackDevMiddlewareOptions
                {
                    HotModuleReplacement = true
                });
            }
            else
            {
                app.UseExceptionHandler("/Home/Error");
            }



            app.UseStaticFiles();
            app.UseAuthentication();
            app.UseMvc(routes =>
            {
                routes.MapRoute(
                    name: "default",
                    template: "{controller=Home}/{action=Index}/{id?}");

                routes.MapSpaFallbackRoute(
                    name: "spa-fallback",
                    defaults: new { controller = "Home", action = "Index" });
            });
        }
        private void ConfigureServicesIdentity(IServiceCollection services)
        {
            services.AddIdentity<UserEntity, IdentityRole>().AddEntityFrameworkStores<AppDbContext>().AddDefaultTokenProviders(); ;
            var TokenValidationParameters = new TokenValidationParameters
            {
                IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(Configuration.GetSection("AppConfiguration:Key").Value)),
                ValidAudience = Configuration.GetSection("AppConfiguration:SiteUrl").Value,
                ValidateIssuerSigningKey = true,
                ValidateLifetime = true,
                ValidIssuer = Configuration.GetSection("AppConfiguration:SiteUrl").Value
            };
            services.AddAuthentication(o =>
            {
                o.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
                o.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
            }).AddJwtBearer(o =>
            {
                o.SaveToken = true;
                o.RequireHttpsMetadata = false;
                o.TokenValidationParameters = TokenValidationParameters;

            });
            //services.Configure<IdentityOptions>(config =>
            //{
            //    config.Cookies.ApplicationCookie.Events =
            //        new CookieAuthenticationEvents
            //        {
            //            OnRedirectToLogin = ctx =>
            //            {
            //                // If we were redirect to login from api..
            //                if (ctx.Request.Path.StartsWithSegments("/api") && ctx.Response.StatusCode == 200)
            //                {
            //                    ctx.Response.StatusCode = 401;
            //                    return Task.FromResult<object>(null);
            //                }

            //                ctx.Response.Redirect(ctx.RedirectUri);
            //                return Task.FromResult<object>(null);
            //            },
            //            OnRedirectToAccessDenied = ctx =>
            //            {
            //                // If access is denied from api...
            //                if (ctx.Request.Path.StartsWithSegments("/api") && ctx.Response.StatusCode == 200)
            //                {
            //                    ctx.Response.StatusCode = 403;
            //                    return Task.FromResult<object>(null);
            //                }

            //                ctx.Response.Redirect(ctx.RedirectUri);
            //                return Task.FromResult<object>(null);
            //            }
            //        };
            //});
        }
    }
}
