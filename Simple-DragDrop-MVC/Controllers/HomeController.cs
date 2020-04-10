using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using FrontEnd_MVC_Developer_Test.Models;

namespace FrontEnd_MVC_Developer_Test.Controllers
{
    public class HomeController : Controller
    {
        public ActionResult Index()
        {
            var articles = articleModel.DisplayArticles();
            return View(articles);
        }

        public ActionResult SaveDisplayChanges(int id)
        {
            var ret = articleModel.UpdateArticleStatus(id);
            return View();
        }

        public ActionResult ChangeShowDescription(int id)
        {
            var ret = articleModel.UpdateArticleShowDescription(id);
            return View();
        }
    }
}
