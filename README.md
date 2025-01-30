# Online newspaper.

Here is the next.js code for an online newspaper.

Page: https://online-newspaper.vercel.app/

Admin Page: https://online-newspaper.vercel.app/dhdhdhsefgsgerhtrherwgerhagfws

Technologies used: `next.js, typeScript, tailwindCSS, supabase, mongodb, mongoose, bcrypt, sendgrid, chart.js, jsonwebtoken, react-chartjs-2, socket.io, socket.io-client, speakeasy, srw, zod, cross-env, flatpickr, react-social-media-embed, react-tweet, sharp, qrcode.`


## Using guide

1. Install the dependencies with `npm install`.
2. Make the .env.local file in the root dictionary which containing the following:
```
#Website url:
 URL
#MongoDB:
 MONGODB_URI
#Supabase:
 NEXT_PUBLIC_SUPABASE_ANON_KEY
 NEXT_PUBLIC_SUPABASE_URL
 NEXT_PUBLIC_SUPABASE_SEBASE_ROLE
#Sendgrid:
 SENDGRID_API_KEY
#Email address:
 EMAIL
#Have to generate:
 TwoFA_URI
 TwoFaSingIn_Uri
 Link_Code
 SECRET_CODE
 ```

3. Delete the commented part from api requests and server actions.
4. Make the database and functions in Supabase.
5. Run `npm run build` and `npm run start`.


## Description

### Websocket

The newspaper use websocket server to display tasks in admin dashboard, number of locked article, and the latest news in real time. The server is created in `server.js`.

- `lastMainPage`: server get a title, id and date of the lates news from /api/unlockarticle post request
- `lastMainPageNews`: server send the clients the title, id and date of the lates news
- `authenticate`: check the client is author, editor or admin
- `writeArticle`: server get the number of unlockarticle from writearticle server action (writearticle.ts)
- `unLockArticle`: server get the number of unlockarticle from /api/unlockarticle post request
- `addTask`: server get the tasks from addTask server action (author, editor, admin privileges, addtask.ts)
- `task`: server send the clients the tasks (author, editor, admin privileges)
- `numberOfLockedArticle`: server send the clients the number of unlockarticle (author, editor, admin privileges)
- `deleteTask`: server get the tasks from deleteTask server action (author, editor, admin privileges, deletetask.ts)
- `setNameForTask`: server get the tasks from addNameTask server action (author, editor, admin privileges, addnametask.ts)

In order to avoid creating a new websocket client during api calls and server actions, they are stored in a class (`/service/socketService.ts`).


### MongoDB

The connection to the database is made in /lib/mongo.ts, which must be run in instrumentation.ts.

Models:

- Admin
```
email: string,
name: string,
password: string,
role: string,
image: string,
importance: number,
```

- Audio
```
url: string,
title: string,
date: string,   
```

- Career
```
title: string,
text: string,    
```

- Category
```
name: string
```

- Image
```
url: string,
detail: string,,
```

- Task
```
task: string,
name: string
```

- Token
```
token: string
```

- Video
```
url: string,
title: string,
```

### Supabase

Tables:

- article
```
- id: int8, primary
- date: text,
- text: text, unique,
- title: text,
- first_element: text,
- first_element_url: text,
- author: text,
- category: text,
- important: text,
- paywall: boolean,
- sidebar: boolean,
- time: text,
- cover_img_id: text,
- keyword: text array,
- paywall_text: text,
- detail: text,
- update: boolean,
- locked: boolean,
- audio: text
```

- newsletter
``` 
- id: int8,
- email: text, unique,
- name: text,
- user_id: text
```

- numberclickarticle
```
- id: uuid,
- title: text,
- source: text,
- date: text
```
- saveArticle
```
- id: uuid,
- title: text, 
- user_email: text,
- url: text
```

- share
```
- id: uuid,
- url: text, 
- share: text,
- date: text
```

- themes
```
- id: uuid,
- theme: text, 
- number: int8
```

- title
```
- id: uuid,
- title: text, 
- number: int8
```

Functions:
- select_article_by_text16
```
CREATE OR REPLACE FUNCTION select_article_by_text16(
    search_text TEXT ,
    author_filter TEXT DEFAULT NULL,
    start_date TEXT DEFAULT NULL,
    end_date TEXT DEFAULT NULL,
    page INT DEFAULT 1,
    category_filter TEXT DEFAULT NULL
)
RETURNS TABLE (
    id INT8,
    date TEXT,
    title TEXT,
    detail TEXT,
    cover_img_id TEXT,
    author TEXT,
    category TEXT,
    paywall BOOLEAN
)AS $$
BEGIN
  RETURN QUERY
  SELECT article.id, article.date, article.title, article.detail, article.cover_img_id, article.author, article.category, article.paywall
  FROM article
  WHERE 
    (article.text LIKE '%' || search_text || '%')
    AND (author_filter IS NULL OR article.author = author_filter)
    AND (start_date IS NULL OR article.date >= start_date)
    AND (end_date IS NULL OR article.date <= end_date)
    AND (NOT (search_text = ANY(article.keyword)))
    AND NOT (article.title LIKE '%' || search_text || '%')
    AND (category_filter IS NULL OR category_filter = article.category)
    ORDER BY article.id DESC
    LIMIT 20
    OFFSET (greatest(page, 1)-1) * 20;
END;
$$ LANGUAGE plpgsql;
```

- settitle
```
CREATE OR REPLACE FUNCTION settitle(p_title TEXT)
RETURNS VOID AS $$
BEGIN
  INSERT INTO titles (title, number)
  VALUES (p_title, 1)
  ON CONFLICT (title)
  DO UPDATE SET number = titles.number + 1;
END;
$$ LANGUAGE plpgsql;
```

- settheme
```
CREATE OR REPLACE FUNCTION settheme(p_theme TEXT)
RETURNS VOID AS $$
BEGIN
  INSERT INTO themes (theme, number)
  VALUES (p_theme, 1)
  ON CONFLICT (theme)
  DO UPDATE SET number = themes.number + 1;
END;
$$ LANGUAGE plpgsql;
```

- get_number_daily_readership3
```
CREATE OR REPLACE FUNCTION get_number_daily_readership3(year Text)
RETURNS TABLE (formatted_date DATE,  article_count bigint) AS $$
BEGIN
  RETURN QUERY
  SELECT
    TO_DATE(date, 'YYYY. MM. DD') AS formatted_date,
    COUNT(*) AS article_count
  FROM
    numberClickArticle
    where numberclickarticle.date like year
  GROUP BY
    formatted_date
  ORDER BY
    formatted_date;
END;
$$ LANGUAGE plpgsql;
```

- get_readership_per_month6
```
CREATE OR REPLACE FUNCTION get_readership_per_month6(year text)
RETURNS TABLE (month TEXT,  article_count bigint) AS $$
BEGIN
  RETURN QUERY
  SELECT
    Extract(month FROM TO_DATE(date, 'YYYY. MM. DD.'))::TEXT AS month,
    COUNT(*) AS article_count
  FROM
    numberclickarticle
    where numberclickarticle.date like year
  GROUP BY
    month
  ORDER BY
    month;
END;
$$ LANGUAGE plpgsql;
```

- get_readership_article11
```
CREATE OR REPLACE FUNCTION get_readership_article11(click_date TEXT)
RETURNS TABLE (tit TEXT, dat TEXT, cat TEXT,  article_count bigint) AS $$
BEGIN
  RETURN QUERY
  SELECT
    numberclickarticle.title as tit, article.date as dat, article.category as cat,
    COUNT(*) AS article_count
  FROM
    numberclickarticle
    INNER JOIN
    article
    ON
    article.title = numberclickarticle.title
    where TO_DATE(numberclickarticle.date, 'YYYY. MM. DD.')  >= TO_DATE(click_date, 'YYYY. MM. DD.') 
  GROUP BY
    tit, dat, cat
  ORDER BY
   article_count desc
   limit 20;
END;
$$ LANGUAGE plpgsql;
```

- get_readership_article_source5
```
CREATE OR REPLACE FUNCTION get_readership_article_source5(year Text)
RETURNS TABLE (so TEXT,  article_count bigint) AS $$
BEGIN
  RETURN QUERY
  SELECT
    numberclickarticle.source as so,
    COUNT(*) AS article_count
  FROM
    numberclickarticle
  where (numberclickarticle.source = 'facebook' or numberclickarticle.source = 'x' or numberclickarticle.source = 'newsletter')
  and numberclickarticle.date like year
  GROUP BY
    so
  ORDER BY
   article_count;
END;
$$ LANGUAGE plpgsql;
```

- get_share_article4
```
CREATE OR REPLACE FUNCTION get_share_article4(year Text)
RETURNS TABLE (sh TEXT,  article_count bigint) AS $$
BEGIN
  RETURN QUERY
  SELECT
    share.share as sh,
    COUNT(*) AS article_count
  FROM
    share
  where share.date like year
  GROUP BY
    share
  ORDER BY
   article_count;
END;
$$ LANGUAGE plpgsql;
```

### API requests

Get /api/article: article urls for sitemap

Delete /api/article: delete articles

Get /api/articlesaved/[category]/[year]/[month]/[day]/[title]: checking user saved the article

Get /api/audio: get audio title, url, id, date

Post /api/audio: add audio title, url, date

Put /api/audio: update audio title or url

Delete /api/audio: delete audio

Get /api/category: get category with id 

Post /api/category: add category

Put /api/category: update category

Delete /api/category: delete category

Get /api/img: get image url, id, detail

Post /api/img: add image url, detail

Put /api/img: update image url or detail

Delete /api/img: delete image

Get /api/video: get video url, id, title

Post /api/video: add video url, title

Put /api/video: update video url or title

Delete /api/video: delete video

Get /api/authors: get authors, editors and admins in order of importance and alphabet.

Get /api/career: get careers title 

Delete /api/career: delete careers by ids

Get /api/colleague: get authors, editors and admins

Delete /api/colleague: delete authors, editors or admins by id

Get /api/lockedarticlenumber: get the number of locked article

Get /api/search: get category, authors, editors, admins, themes of articles, and words od titles of articles

Get /api/search/sitemap: get themes of articles

Post /api/unlockarticle: unlock and edit the articles

Get /api/user: get the list of users

Delete /api/user: delete users by id

Get /auth/callback: supabase oauth (e.g.: google, github...),

Get /auth/confirm/resetpassword: redirect /resetpassword or the error page

Get /auth/mongomiddleware: check the admin privileges for protected pages.

Post /auth/provider/twofa: check the token in the url for 2FA page when user sing in with provider.

Post /auth/provider/twofa/twofausercookie: check the cookie in protected page (/about) for user who has 2FA 

Post /auth/provider/twofa/twofasingincookie: check the cookie for 2FA page when user sing in.

### Server actions

The server actions are in the actions directory.