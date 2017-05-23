using Microsoft.SharePoint.Client;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using TestSPAppWeb.Helpers;
using TestSPAppWeb.Models;
using TestSPAppWeb.Services;

namespace TestSPAppWeb.Controllers
{
    public class HomeController : Controller
    {
        [SharePointContextFilter]
        public ActionResult Index()
        {
            ViewBag.Message = "Your application description page.";
            ViewBag.Current = "Home";
            var spContext = SharePointContextProvider.Current.GetSharePointContext(HttpContext);
            ViewBag.SPHostUrl = spContext.SPHostUrl.AbsoluteUri.TrimEnd('/');
            ViewBag.SPAppWebUrl = spContext.SPAppWebUrl.AbsoluteUri.TrimEnd('/');

            return View();
        }

        public ActionResult About()
        {
            ViewBag.Message = "Your application description page.";
            ViewBag.Current = "About";
            var spContext = SharePointContextProvider.Current.GetSharePointContext(HttpContext);
            ViewBag.SPHostUrl = spContext.SPHostUrl.AbsoluteUri.TrimEnd('/');
            ViewBag.SPAppWebUrl = spContext.SPAppWebUrl.AbsoluteUri.TrimEnd('/');

            return View();
        }

        public ActionResult Contact()
        {
            ViewBag.Message = "Your contact page.";
            ViewBag.Current = "Contact";
            var spContext = SharePointContextProvider.Current.GetSharePointContext(HttpContext);
            ViewBag.SPHostUrl = spContext.SPHostUrl.AbsoluteUri.TrimEnd('/');
            ViewBag.SPAppWebUrl = spContext.SPAppWebUrl.AbsoluteUri.TrimEnd('/');

            return View();
        }
    }
}
