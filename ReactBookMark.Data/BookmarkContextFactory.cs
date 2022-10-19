using Microsoft.EntityFrameworkCore.Design;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.IO;
using System.Text;

namespace ReactBookMark.Data
{
    public class BookmarkContextFactory : IDesignTimeDbContextFactory<BookMarkDataContext>
    {
        public BookMarkDataContext CreateDbContext(string[] args)
        {
            var config = new ConfigurationBuilder()
                .SetBasePath(Path.Combine(Directory.GetCurrentDirectory(), $"..{Path.DirectorySeparatorChar}ReactBookMark.Web"))
                .AddJsonFile("appsettings.json")
                .AddJsonFile("appsettings.local.json", optional: true, reloadOnChange: true).Build();

            return new BookMarkDataContext(config.GetConnectionString("ConStr"));
        }
    }
   
}
