//------------------------------------------------------------------------------
// <auto-generated>
//    This code was generated from a template.
//
//    Manual changes to this file may cause unexpected behavior in your application.
//    Manual changes to this file will be overwritten if the code is regenerated.
// </auto-generated>
//------------------------------------------------------------------------------

namespace FrontEnd_MVC_Developer_Test.Models
{
    using System;
    using System.Collections.Generic;
    using System.Data.SqlClient;
    using System.Linq;
    
    public partial class Article
    {
        public int articleId { get; set; }
        public string title { get; set; }
        public string descripton { get; set; }
        public string articleContent { get; set; }
        public bool showDescription { get; set; }
        public bool isActive { get; set; }
    }
}