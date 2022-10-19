using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Text;

namespace ReactBookMark.Data
{
   
        public class BookMarkDataContext : DbContext
        {
            private readonly string _connectionString;

            public BookMarkDataContext(string connectionString)
            {
                _connectionString = connectionString;
            }
            protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
            {
                optionsBuilder.UseSqlServer(_connectionString);
            }
            public DbSet<User> Users { get; set; }
            public DbSet<BookMark> Bookmarks { get; set; }
        }
    }

