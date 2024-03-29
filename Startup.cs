﻿// using System;
// using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Threading.Tasks;
using Listr.Repositories;
using Listr.Services;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.HttpsPolicy;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using MySql.Data.MySqlClient;

namespace Listr
{
  public class Startup
  {
    public Startup(IConfiguration configuration)
    {
      Configuration = configuration;
    }

    public IConfiguration Configuration { get; }

    // This method gets called by the runtime. Use this method to add services to the container.
    public void ConfigureServices(IServiceCollection services)
    {
      //ADD USER AUTH through JWT
      services.AddAuthentication(CookieAuthenticationDefaults.AuthenticationScheme).AddCookie(options =>
      {
        options.LoginPath = "/Account/Login";
        options.Events.OnRedirectToLogin = (context) =>
                {
                  context.Response.StatusCode = 401;
                  return Task.CompletedTask;
                };
      });

      services.AddCors(options =>
      {
        options.AddPolicy("CorsDevPolicy", builder =>
          {
            builder
              .WithOrigins(new string[] { "http://localhost:8080" })
              .AllowAnyMethod()
              .AllowAnyHeader()
              .AllowCredentials();
          });
      });

      services.AddMvc();
      services.AddControllers();

      //CONNECT TO DB
      services.AddScoped<IDbConnection>(x => CreateDbConnection());

      //NOTE REGISTER SERVICES

      // Brought to us by Boise Code Works... Thanks!!!
      services.AddTransient<AccountRepository>();
      services.AddTransient<AccountService>();

      // Repositories Inherited from BaseApiRepository
      services.AddTransient<KeepRepository>();
      services.AddTransient<KeepsService>();
      

      // Services Inherited from BaseApiService
      services.AddTransient<VaultService>();
      services.AddTransient<VaultRepository>();
    }

    private IDbConnection CreateDbConnection()
    {
      string connectionString = Configuration.GetSection("db").GetValue<string>("gearhost");
      return new MySqlConnection(connectionString);
    }

    // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
    public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
    {
      if (env.IsDevelopment())
      {
        app.UseDeveloperExceptionPage();
        app.UseCors("CorsDevPolicy");
      }
      else
      {
        app.UseHsts();
      }

      app.UseHttpsRedirection();
      app.UseAuthentication();
      app.UseRouting();

      app.UseAuthorization();
      app.UseDefaultFiles();
      app.UseStaticFiles();

      app.UseEndpoints(endpoints =>
      {
        endpoints.MapControllers();
      });
    }
  }
}