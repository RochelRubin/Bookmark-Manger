using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using ReactBookMark.Data;
using ReactBookMark.Web.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ReactBookMark.Web.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BookmarkController : ControllerBase
    {
        private string _connectionString;
        public BookmarkController(IConfiguration configuration)
        {
            _connectionString = configuration.GetConnectionString("ConStr");
        }
        [Route("mybookmarks")]
        [HttpGet]
        [Authorize]
        public List<BookMark> MyBookMarks()
        {
            var repo = new BookMarkRepo(_connectionString);
            int userId = repo.GetByEmail(User.Identity.Name).Id;
            return repo.GetBookMarks(userId);
        }
        [Route("addbookmark")]
        [HttpPost]
        [Authorize]
        public void AddBookMark(BookMark bookMark)
        {
            var repo = new BookMarkRepo(_connectionString);
            
            bookMark.UserId = repo.GetByEmail(User.Identity.Name).Id;
            repo.AddBookMarks(bookMark);
        }
        [Route("editbookmark")]
        [HttpPost]
        [Authorize]
        public void EditBookMark(EditBookMarkViewModel edit)
        {
            var repo = new BookMarkRepo(_connectionString);
            repo.EditBookMarks(edit.Title, edit.Id);
        }
        [Route("deletebookmark")]
        [HttpPost]
        [Authorize]
        public void DeleteBookMark(BookMark bookMark)
        {
            var repo = new BookMarkRepo(_connectionString);
            repo.DeleteBookMarks(bookMark);
        }
        [Route("populerbookmarks")]
        [HttpGet]
        [Authorize]
        public List<BookMarkCount> PopulerBookMarks()
        {
            var repo = new BookMarkRepo(_connectionString);
            return repo.GetPopulerBookMarks();
        }
    }
}
