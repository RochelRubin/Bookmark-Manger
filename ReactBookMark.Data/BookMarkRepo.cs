using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace ReactBookMark.Data
{
    public class BookMarkRepo
    {
        private readonly string _connectionString;

        public BookMarkRepo(string connectionString)
        {
            _connectionString = connectionString;
        }
        public void AddUser(User user, string password)
        {
            var hash = BCrypt.Net.BCrypt.HashPassword(password);
            user.PasswordHash = hash;
            using var ctx = new BookMarkDataContext(_connectionString);
            ctx.Users.Add(user);
            ctx.SaveChanges();
        }

        public User Login(string email, string password)
        {
            var user = GetByEmail(email);
            if (user == null)
            {
                return null;
            }

            var isValidPassword = BCrypt.Net.BCrypt.Verify(password, user.PasswordHash);
            if (!isValidPassword)
            {
                return null;
            }

            return user;

        }

        public User GetByEmail(string email)
        {
            using var ctx = new BookMarkDataContext(_connectionString);
            return ctx.Users.FirstOrDefault(u => u.Email == email);
        }
        public void AddBookMarks(BookMark bookMark)
        {
            using var ctx = new BookMarkDataContext(_connectionString);
            ctx.Bookmarks.Add(bookMark);
            ctx.SaveChanges();
        }
        public List<BookMark> GetBookMarks(int id)
        {
            using var ctx = new BookMarkDataContext(_connectionString);
            return ctx.Bookmarks.Where(i => i.UserId == id).ToList();
        }
        public void EditBookMarks(string title, int id)
        {
            using var ctx = new BookMarkDataContext(_connectionString);
            ctx.Database.ExecuteSqlInterpolated($"UPDATE Bookmarks SET Title = {title} WHERE id = {id}");

        }
        public void DeleteBookMarks(BookMark bookMark)
        {
            using var ctx = new BookMarkDataContext(_connectionString);
            ctx.Bookmarks.Remove(bookMark);
            ctx.SaveChanges();
        }
        public List<BookMarkCount> GetPopulerBookMarks()
        {
            using var ctx = new BookMarkDataContext(_connectionString);
            return ctx.Bookmarks.GroupBy(u => u.Url).Select(u => new BookMarkCount
            {
                Url = u.Key,
                Count = u.Count()
            }).OrderByDescending(u => u.Count).Take(5).ToList();
        }
    }
}
