using ApplicationManager.Service;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;
using System;

namespace ApplicationManager.Console
{
    class Program
    {
        static void Main(string[] args)
        {
            var serviceProvider = new ServiceCollection()
                        .AddLogging()
                        .AddSingleton<IEmail, Email>()
                           .BuildServiceProvider();

            //configure console logging
            serviceProvider
                .GetService<ILoggerFactory>()
                .AddConsole(LogLevel.Debug);

            var logger = serviceProvider.GetService<ILoggerFactory>()
                .CreateLogger<Program>();
            logger.LogDebug("Starting application");

            //do the actual work here
            var bar = serviceProvider.GetService<IEmail>();
            var cc= bar.PaerserEmailAsync("","","","");
            System.Console.WriteLine($"Count:{cc.Result}");
            System.Console.ReadLine();
            logger.LogDebug("All done!");

        }
    }
}
