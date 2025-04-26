import { writeFileSync, existsSync, mkdirSync, readFileSync } from 'fs';




try {
    let s = readFileSync('./actions/adminnewpassword.ts','utf8');
    s = s.replaceAll('/*', '');
    s = s.replaceAll('*/', '')
    writeFileSync('./actions/adminnewpassword.ts', s)

    s = readFileSync('./actions/adminsignup.ts','utf8');
    s = s.replaceAll('/*', '');
    s = s.replaceAll('*/', '')
    writeFileSync('./actions/adminsignup.ts', s)

    s = readFileSync('./actions/editarticle.ts','utf8');
    s = s.replaceAll('/*', '');
    s = s.replaceAll('*/', '')
    writeFileSync('./actions/editarticle.ts', s)    

    s = readFileSync('./actions/writeCareer.ts','utf8');
    s = s.replaceAll('/*', '');
    s = s.replaceAll('*/', '')
    writeFileSync('./actions/writeCareer.ts', s)    

    s = readFileSync('./actions/editcareer.ts','utf8');
    s = s.replaceAll('/*', '');
    s = s.replaceAll('*/', '')
    writeFileSync('./actions/editcareer.ts', s) 
    
    s = readFileSync('./app/[category]/[year]/[month]/[day]/[title]/paywall/page.tsx','utf8');
    s = s.replaceAll('/*', '');
    s = s.replaceAll('*/', '')
    writeFileSync('./app/[category]/[year]/[month]/[day]/[title]/paywall/page.tsx', s)    
    
    s = readFileSync('./app/[category]/[year]/[month]/[day]/[title]/page.tsx','utf8');
    s = s.replaceAll('/*', '');
    s = s.replaceAll('*/', '')
    writeFileSync('./app/[category]/[year]/[month]/[day]/[title]/page.tsx', s)   

    
    s = readFileSync('./app/authors/[name]/[page]/page.tsx','utf8');
    s = s.replaceAll('/*', '');
    s = s.replaceAll('*/', '')
    writeFileSync('./app/authors/[name]/[page]/page.tsx', s)    
    
    s = readFileSync('./app/career/[title]/page.tsx','utf8');
    s = s.replaceAll('/*', '');
    s = s.replaceAll('*/', '')
    writeFileSync('./app/career/[title]/page.tsx', s)

    s = readFileSync('./app/career/page.tsx','utf8');
    s = s.replaceAll('/*', '');
    s = s.replaceAll('*/', '')
    writeFileSync('./app/career/page.tsx', s)


    s = readFileSync('./app/category/[name]/[page]/page.tsx','utf8');
    s = s.replaceAll('/*', '');
    s = s.replaceAll('*/', '')
    writeFileSync('./app/category/[name]/[page]/page.tsx', s)


    s = readFileSync('./app/important/[page]/page.tsx','utf8');
    s = s.replaceAll('/*', '');
    s = s.replaceAll('*/', '')
    writeFileSync('./app/important/[page]/page.tsx', s)


    s = readFileSync('./app/latest/[page]/page.tsx','utf8');
    s = s.replaceAll('/*', '');
    s = s.replaceAll('*/', '')
    writeFileSync('./app/latest/[page]/page.tsx', s)


    s = readFileSync('./app/rss/route.ts','utf8');
    s = s.replaceAll('/*', '');
    s = s.replaceAll('*/', '')
    writeFileSync('./app/rss/route.ts', s)


    s = readFileSync('./app/sitemap.ts','utf8');
    s = s.replaceAll('/*', '');
    s = s.replaceAll('*/', '')
    writeFileSync('./app/sitemap.ts', s)

    s = readFileSync('./app/api/article/route.ts','utf8');
    s = s.replaceAll('/*', '');
    s = s.replaceAll('*/', '')
    writeFileSync('./app/api/article/route.ts', s)

    
    s = readFileSync('./app/api/audio/route.ts','utf8');
    s = s.replaceAll('/*', '');
    s = s.replaceAll('*/', '')
    writeFileSync('./app/api/audio/route.ts', s)

    
    s = readFileSync('./app/api/career/route.ts','utf8');
    s = s.replaceAll('/*', '');
    s = s.replaceAll('*/', '')
    writeFileSync('./app/api/career/route.ts', s)

    
    s = readFileSync('./app/api/category/route.ts','utf8');
    s = s.replaceAll('/*', '');
    s = s.replaceAll('*/', '')
    writeFileSync('./app/api/category/route.ts', s)

    
    s = readFileSync('./app/api/colleague/route.ts','utf8');
    s = s.replaceAll('/*', '');
    s = s.replaceAll('*/', '')
    writeFileSync('./app/api/colleague/route.ts', s)
    
    s = readFileSync('./app/api/user/route.ts','utf8');
    s = s.replaceAll('/*', '');
    s = s.replaceAll('*/', '')
    writeFileSync('./app/api/user/route.ts', s)

    
    s = readFileSync('./app/api/video/route.ts','utf8');
    s = s.replaceAll('/*', '');
    s = s.replaceAll('*/', '')
    writeFileSync('./app/api/video/route.ts', s)
    
    s = readFileSync('./app/(protected)/(admin)/lockedarticle/allarticles/page.tsx','utf8');
    s = s.replaceAll('/*', '');
    s = s.replaceAll('*/', '')
    writeFileSync('./app/(protected)/(admin)/lockedarticle/allarticles/page.tsx', s)

    s = readFileSync('./app/api/img/route.ts','utf8');
    s = s.replaceAll('/*', '');
    s = s.replaceAll('*/', '')
    writeFileSync('./app/api/img/route.ts', s)

    s = readFileSync('./app/page.tsx','utf8');
    s = s.replaceAll('/*', '');
    s = s.replaceAll('*/', '')
    writeFileSync('./app/page.tsx', s)



} catch (error) {
    console.log(error)
}
