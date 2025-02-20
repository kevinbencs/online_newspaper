import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
    return {
        rules: {
          userAgent: '*',
          allow: ['/', '/newsletter/unsubscribe'],
          disallow: ['/api/','/singin/twofa/','/resetpassword/','/newsletter/unsubscribe/','/dhdhdhsefgsgerhtrherwgerhagfws/','/auth/','/about/','/dashboard/','/createdadmin/','/editarticle/','/lockedarticle/','/newarticle','/writecarrier','/writenewsletter']
        },
        sitemap: `${process.env.URL}/sitemap.xml`,
      }
}