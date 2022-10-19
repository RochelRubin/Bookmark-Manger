using System;
using System.Collections.Generic;
using System.Text;

namespace ReactBookMark.Data
{
    public class BookMark
    {
        public string Id { get; set; }
        public int UserId { get; set; }
        public string Title { get; set; }
        public string Url { get; set; }
    }
}
