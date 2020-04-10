using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Data.SqlClient;
using System.Linq;


namespace FrontEnd_MVC_Developer_Test.Models
{
    public class articleModel
    {
        public static List<Article> DisplayArticles()
        {
            try
            {
                using (var rs = new ArticleDatabaseEntities())
                {
                    var articles = from a in rs.Articles
                                   select a;

                    List<Article> artcleData = articles.ToList();
                    return artcleData;
                }
            }
            catch (Exception)
            {
                throw;
            }
        }

        public static int UpdateArticleStatus(int id)
        {
            try
            {
                Article articleItem = null;

                using (var rs = new ArticleDatabaseEntities())
                {
                    articleItem = rs.Articles
                                    .Where(o => o.articleId == id)
                                    .FirstOrDefault<Article>();
                    articleItem.isActive = !articleItem.isActive;
                    rs.Entry(articleItem).State = EntityState.Modified;
                    return rs.SaveChanges();
                }
                
            }
            catch (Exception)
            {
                throw;
            }
        }

        public static int UpdateArticleShowDescription(int id)
        {
            try
            {
                Article articleItem = null;

                using (var rs = new ArticleDatabaseEntities())
                {
                    articleItem = rs.Articles
                                    .Where(o => o.articleId == id)
                                    .FirstOrDefault<Article>();

                    articleItem.showDescription = !articleItem.showDescription;
                    rs.Entry(articleItem).State = EntityState.Modified;
                    return rs.SaveChanges();
                }
            }
            catch (Exception)
            {
                throw;
            }
        }
    }
}