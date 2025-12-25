# Online newspaper.

Here is the next.js code for an online newspaper.

Page: https://online-newspaper.vercel.app/

Admin Page: https://online-newspaper.vercel.app/admin_login

Technologies used: `next.js, typeScript, tailwindCSS, supabase, mongodb, mongoose, bcrypt, sendgrid, chart.js, jsonwebtoken, react-chartjs-2, socket.io, socket.io-client, speakeasy, srw, zod, cross-env, flatpickr, react-social-media-embed, react-tweet, sharp, qrcode, rss.`


## Using guide with websocket


1. Run `npm run websocket` and `npm run comment`
2. Install the dependencies with `npm install`.
3. Make the .env.local file in the root directory, which contains the following:
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

4. Make the database and functions in Supabase.
5. Run `npm run build` and `npm run start`.

## Using guide without websocket

1. Run `npm run api` and `npm run comment`
2. Install the dependencies with `npm install`.
3. Make the .env.local file in the root directory, which contains the following:
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

4. Make the database and functions in Supabase.
5. Run `npm run build` and `npm run start`.

## Description

### Websocket

The newspaper uses websocket server to display tasks in the admin dashboard, the number of locked articles, and the latest news in real time. The server is created in `server.js`.

- `lastMainPage`: server gets a title, id, and date of the latest news from /api/unlockarticle post request
- `lastMainPageNews`: server sends the clients the title, id, and date of the latest news
- `authenticate`: check the client is an author, editor, or admin
- `writeArticle`: server gets the number of unlockarticle from writearticle server action (writearticle.ts)
- `unLockArticle`: server gets the number of unlockarticle from /api/unlockarticle post request
- `addTask`: server gets the tasks from addTask server action (author, editor, admin privileges, addtask.ts)
- `task`: server sends the clients the tasks (author, editor, admin privileges)
- `numberOfLockedArticle`: server sends the clients the number of unlockarticle (author, editor, admin privileges)
- `deleteTask`: server gets the tasks from deleteTask server action (author, editor, admin privileges, deletetask.ts)
- `setNameForTask`: server gets the tasks from addNameTask server action (author, editor, admin privileges, addnametask.ts)

To avoid creating a new websocket client during api calls and server actions, they are stored in a class (`/service/socketService.ts`).


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
hired: boolean
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
detail: string,
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
- search_art: text
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
-select_article_by_theme
```
CREATE OR REPLACE FUNCTION select_article_by_theme(
  search_text TEXT
)
RETURNS TABLE (
  id INT8,
  date TEXT,
  title TEXT,
  detail TEXT,
  cover_img_id TEXT,
  author TEXT,
  category TEXT,
  paywall BOOLEAN,
  locked BOOLEAN
)AS $$
BEGIN
  RETURN QUERY
  select article.id, article.date, article.title, article.detail, article.cover_img_id, article.author, article.category, article.paywall, article.locked from article
  where exists (
    SELECT 1 FROM unnest(article.keyword) AS elem
    WHERE elem ilike '%' || search_text || '%'
  );
END;
$$ LANGUAGE plpgsql;
```


- select_article_by_text18
```
CREATE OR REPLACE FUNCTION select_article_by_text19(
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
    paywall BOOLEAN,
    locked BOOLEAN
)AS $$
BEGIN
  RETURN QUERY
  SELECT article.id, article.date, article.title, article.detail, article.cover_img_id, article.author, article.category, article.paywall, article.locked
  FROM article
  WHERE 
    (article.search_art ILIKE '%' || search_text || '%')
    AND (author_filter IS NULL OR article.author = author_filter)
    AND (start_date IS NULL OR article.date >= start_date)
    AND (end_date IS NULL OR article.date <= end_date)
    AND (NOT 
      exists (
    SELECT 1 FROM unnest(article.keyword) AS elem
    WHERE elem ilike '%' || search_text || '%'
    )
    )
    AND NOT (article.title ILIKE '%' || search_text || '%')
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

- Get /api/article: article urls for sitemap

Return:
```
Code   Description
200    art: Art[]
```

```
Art: {
  id: number,
  category: string,
  date: string,
  title: string
}
```
Error: 
```
Code   Description
500    error: 'Server error'
```

- Delete /api/article: delete articles

Authorization: `editor, admin`

Body:
```
ids: string[]
```

Return:
```
Code   Description
200    success: 'Articles are deleted'
```

Error: 
```
Code   Description
500    error: 'Server error'
401    error: 'Please log in as admin/editor'
400    failed: string[]
```


- Get /api/article/ispaywall/[category]/[year]/[month]/[day]/[title]: check article has paywall

Return:
```
Code   Description
200    res: boolean
```


Error: 
```
Code   Description
500    error: 'Server error'
```

- Get /api/articlesaved/[category]/[year]/[month]/[day]/[title]: checking user saved the article

Return:
```
Code   Description
200    saved: boolean
```

Error: 
```
Code   Description
500    error: 'Server error'
```

- Get /api/audio: get audio title, url, id, date

Authorization: `editor, admin, author`

Return:
```
Code   Description
200    success: audioUrl[]
```

```
audioUrl {
  _id: string,
  url: string,
  title: string,
  date: string,
}
```

Error: 
```
Code   Description
500    error: 'Server error'
401    error: 'Please log in as admin, editor or author'
```


- Post /api/audio: add audio title, url, date

Authorization: `editor, admin, author`

Body:
```
url:    string
title:  string
```

Return:
```
Code   Description
200     success: 'Success'
```

Error: 
```
Code   Description
500    error: 'Server error'
401    error: 'Please log in as admin, editor or author'
400    error: 'This url is in the database.'
400    failed: string[]
```

- Put /api/audio: update audio title or url

Authorization: `editor, admin`

Body:
```
title: string
id:    string
url:   string
```

Return:
```
Code   Description
200     success: 'Success'
```

Error: 
```
Code   Description
500    error: 'Server error'
401    error: 'Please log in as admin, editor'
400    error: 'Id is not valid'
400    failed: string[]
```

- Delete /api/audio: delete audio

Authorization: `editor, admin`

Body:
```
id: string
```

Return:
```
Code   Description
200     success: 'Success'
```

Error: 
```
Code   Description
500    error: 'Server error'
401    error: 'Please log in as admin, editor or author'
400    failed: string[]
```

- Get /api/authors: get authors, editors, and admins in order of importance and alphabet.


Return:
```
Code   Description
200    success: author[]
```

```
author {
  _id: string,
  name: string,
}
```

Error: 
```
Code   Description
500    error: 'Server error'
```

- Get /api/career: get careers title 

Return:
```
Code   Description
200    Car: Car2[]
```

```
Car2{
  _id: string,
  name: string,
  date: string
}
```

Error: 
```
Code   Description
500    error: 'Server error'
```

- Delete /api/career: delete careers by ids

Authorization: `editor, admin`

Body:
```
ids: string[]
```

Return:
```
Code   Description
200    success: 'Careers are deleted'
```


Error: 
```
Code   Description
500    error: 'Server error'
401    error: 'Please log in as admin or editor'
400    failed: string[]
```

- Get /api/category: get category with id

Return:
```
Code   Description
200    success: Cat[]
```

```
Cat{
  name: string,
  _id: string
}
```

Error: 
```
Code   Description
500    error: 'Server error'
```

- Post /api/category: add category

Authorization: `admin`

Body:
```
name: string
```

Return:
```
Code   Description
200    success: 'Success'
```


Error: 
```
Code   Description
500    error: 'Server error'
401    error: 'Please log in as admin'
400    failed: string[]
```

- Put /api/category: update category

Authorization: `admin`

Body:
```
name: string
id:   string
```

Return:
```
Code   Description
200    success: 'Success'
```


Error: 
```
Code   Description
500    error: 'Server error'
401    error: 'Please log in as admin'
400    failed: string[]
```

- Delete /api/category: delete category

Authorization: `admin`

Body:
```
id: string
```

Return:
```
Code   Description
200    success: 'Success'
```


Error: 
```
Code   Description
500    error: 'Server error'
401    error: 'Please log in as admin'
400    failed: string[]
```

- Get /api/colleague: get authors, editors and admins

Authorization: `admin, editor, author`

Return:
```
Code   Description
200    Col: Colleague[]
```

```
Colleague {
  _id: string,
  name: string,
  email: string,
}
```


Error: 
```
Code   Description
500    error: 'Server error'
401    error: 'Please log in as admin, editor or author'
```

- Delete /api/colleague: delete authors, editors or admins by id

Authorization: `admin`

Body:
```
ids: string[]
```

Return:
```
Code   Description
200    success: 'Colleagues are deleted'
```


Error: 
```
Code   Description
500    error: 'Server error'
401    error: 'Please log in as admin'
400    failed: string[]
```

- Get /api/img: get image url, id, detail

Authorization: `admin, editor, author`

Return:
```
Code   Description
200    success: img[]
```

```
img{
  url: string,
  detail: string,
  _id: string
}
```

Error: 
```
Code   Description
500    error: 'Server error'
401    error: 'Please log in as admin, editor or author'
400    failed: string[]
```

- Post /api/img: add image url, detail

Authorization: `admin, editor, author`

Body:
```
detail: string
url:    string
```

Return:
```
Code   Description
200    success: 'Success'
```

Error: 
```
Code   Description
500    error: 'Server error'
401    error: 'Please log in as admin, editor or author'
400    failed: string[]
```

- Put /api/img: update image url or detail

Authorization: `admin, editor`

Body:
```
detail: string;
id:     string;
url:    string;
```

Return:
```
Code   Description
200    success: 'Success'
```

Error: 
```
Code   Description
500    error: 'Server error'
401    error: 'Please log in as admin or editor'
400    failed: string[]
```

- Delete /api/img: delete image

Authorization: `admin, editor`

Body:
```
id: string
```

Return:
```
Code   Description
200    success: 'Success'
```

Error: 
```
Code   Description
500    error: 'Server error'
401    error: 'Please log in as admin or editor'
400    failed: string[]
```

- Get api/islogged: check the user is logged

Return:
```
Code   Description
200    role: string, name: string, email: string, saveArt: string[], subscribe: boolean
```

Error: 
```
Code   Description
500    role: '', name: '', email: '', saveArt: [], subscribe: false 
```

- Get /api/latestnews: get the latest news

Return:
```
Code   Description
200    data: DataMainPage[]
```

```
DataMainPage {
  id: string,
  title: string,
  date: string,
  time: string,
  category: string,
  paywall: boolean,
}
```

Error: 
```
Code   Description
500    role: '', name: '', email: '', saveArt: [], subscribe: false 
```


- Get /api/lockedarticlenumber: get the number of locked articles

Authorization: `admin, editor`

Return:
```
Code   Description
200    number: number
```

Error: 
```
Code   Description
500    number: 0
```

- Get /api/search: get category, authors, editors, admins, themes of articles, and words of titles of articles

Return:
```
Code   Description
200    res: {author: Author[], title: Title[], theme: Theme[]}
```

```
Author{
  _id: string,
  name: string,
}

Title{
  id: string,
  title: string,
  number: number
}

Theme{
  id: string,
  theme: string,
  number: number
}
```

Error: 
```
Code   Description
500    error: 'Server error'
```

- Get /api/search/sitemap: get themes of articles

Return:
```
Code   Description
200    res:  Theme[]
```

```
Theme{
  theme: string,
}
```

Error: 
```
Code   Description
500    error: 'Server error'
```
- Get api/task: get tasks

Authorization: `admin, editor, author`

Return:
```
Code   Description
200    res:  TaskType[]
```

```
TaskType {
  _id: string,
  name: string,
  task: string
}
```

Error: 
```
Code   Description
500    error: 'Server error'
401    error: 'Please log in as admin, editor, or author'
```

- Post api/task: write task 

Authorization: `admin, editor, author`

Body:
```
task: string
```

Return:
```
Code   Description
200    success: 'Success'
```

Error: 
```
Code   Description
500    error: 'Server error'
401    error: 'Please log in as admin, editor, or author'
400    failed: string[]
```

- Delete api/task/[id]: delete task

Authorization: `admin, editor, author`

Return:
```
Code   Description
200    success: 'Success'
```
Error: 
```
Code   Description
500    error: 'Server error'
401    error: 'Please log in as admin, editor, or author'
```


- Put api/task/[id]: change the name of the owner of the task

Authorization: `admin, editor, author`

Return:
```
Code   Description
200    success: 'Success'
```

Error: 

```
Code   Description
500    error: 'Server error'
401    error: 'Please log in as admin, editor, or author'
404    error: 'The task does not exist'
```

- Post api/unlockarticle: unlock article

Authorization: `admin, editor`

Body:
```
  text: string;
  title: string;
  first_element: string;
  first_element_url: string;
  category: string;
  important: string;
  paywall: boolean;
  sidebar: boolean;
  cover_img_id: string;
  keyword: string[];
  paywall_text: string;
  detail: string;
```

Return:
```
Code   Description
200    success: 'Success', date: string
```

Error: 
```
Code   Description
500    error: 'Server error'
401    error: 'Please log in as admin, editor, or author'
404    error: string
400    error: string
```

- Get /api/user: get the list of users

Authorization: `admin, editor, author`

Return:

```
Code   Description
200    users: User[] (supabase user)
```

Error: 
```
Code   Description
500    error: 'Server error'
401    error: 'Please log in as admin, editor, or author'
```

- Delete /api/user: delete users by id

Authorization: `admin`

Body:
```
ids: string[]
```

```
Code   Description
200    success: 'Users are deleted'
```

Error: 
```
Code   Description
500    error: 'Server error'
401    error: 'Please log in as admin, editor, or author'
400    failed: string[]
```

- Get /api/video: get video url, id, title

Authorization: `admin, editor, author`

```
Code   Description
200    success: videoUrl[]
```

```
videoUrl {
  _id: string,
  url: string,
  title: string
}
```

Error: 
```
Code   Description
500    error: 'Server error'
401    error: 'Please log in as admin, editor, or author'
```

- Post /api/video: add video url, title

Authorization: `admin, editor, author`

Body:
```
url:   string
title: string
```

```
Code   Description
200    success: 'Users are deleted'
```

Error: 
```
Code   Description
500    error: 'Server error'
401    error: 'Please log in as admin, editor, or author'
400    failed: string[]
400    error: 'This video is in the database.'
```

- Put /api/video: update video url or title

Authorization: `admin, editor`

Body:
```
url:   string
title: string
id:    string
```

```
Code   Description
200    success: 'Success'
```

Error: 
```
Code   Description
500    error: 'Server error'
401    error: 'Please log in as admin or editor'
400    failed: string[]
404    error: 'Video does not exist.'
```

- Delete /api/video: delete video

Authorization: `admin, editor`

Body:
```
id:    string
```

```
Code   Description
200    success: 'Success'
```

Error: 
```
Code   Description
500    error: 'Server error'
401    error: 'Please log in as admin or editor'
400    failed: string[]
```

- Post /api/writearticle: write article

Authorization: `admin, editor, author`

Body:
```
  text: string;
  title: string;
  first_element: string;
  first_element_url: string;
  category: string;
  important: string;
  paywall: boolean;
  sidebar: boolean;
  cover_img_id: string;
  keyword: string[];
  paywall_text: string;
  detail: string;
```

```
Code   Description
200    success: 'Success'
```

Error: 
```
Code   Description
500    error: 'Server error'
401    error: 'Please log in as admin or editor'
400    failed: string[]
400    error: string
404    error: string
```

- Get /auth/callback: supabase oauth (e.g.: google, github...),

Return
```
Code   Description
307    redirect /signin/twofa?linkToken=${linkToken}
307    redirect /
```

Error: 
```
Code   Description
307    redirect /auth/auth-code-error
```

- Get /auth/confirm/resetpassword: redirect /resetpassword or the error page

Return:
```
Code   Description
307    redirect /resetpassword
```

Error: 
```
Code   Description
307    redirect /auth/auth-code-error
```

- Post /auth/mongomiddleware/paywall: check the admin privileges for protected pages.

Body:
```
cookie: string
```

Return:
```
Code   Description
200    role: string, email: string, name: string, id: string
```

- Post /auth/provider/twofa: check the token in the url for the 2FA page when the user signs in with the provider.

Body:
```
token: string
id:    string
```

Return:
```
Code   Description
200    res: true
```

Error: 
```
Code   Description
500    res: false
401    res: false
400    res: false
404    res: false
```

- Post /auth/provider/twofa/twofausercookie: check the cookie in the protected page for the user who has 2FA 

Body:
```
token: string
id:    string
```

Return:
```
Code   Description
200    res: true
```

Error: 
```
Code   Description
500    res: false
401    res: false
400    res: false
404    res: false
```

- Post /auth/provider/twofa/twofasingincookie: check the cookie for the 2FA page when the user signs in.

Body:
```
token: string
```

Return:
```
Code   Description
200    res: 'true'
```

Error: 
```
Code   Description
500    res: 'false'
400    res: 'false'
```

- Get /rss: get the rss

Return:
```
Code   Description
200    xml
```
