using ReactBookMark.Data;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ReactBookMark.Web.Models
{
    public class SignupViewModel : User
    {
        public string Password { get; set; }
    }
   
}
