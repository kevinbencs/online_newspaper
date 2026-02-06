### API requests (REST API)

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
403    error: 'Please log in as admin, editor'
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
403    error: 'Please log in as admin, editor or author'
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
201     success: 'Success'
```

Error: 
```
Code   Description
500    error: 'Server error'
401    error: 'Please log in as admin, editor or author'
403    error: 'Please log in as admin, editor, or author'
422    error: 'This url is in the database.'
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
403    error: 'Please log in as admin, editor'
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
401    error: 'Please log in as admin, editor, or author'
403    error: 'Please log in as admin, editor, or author'
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
403    error: 'Please log in as admin or editor'
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
201    success: 'Success'
```


Error: 
```
Code   Description
500    error: 'Server error'
401    error: 'Please log in as admin'
403    error: 'Please log in as admin'
422    error: 'This category is in the database.'
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
403    error: 'Please log in as admin'
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
403    error: 'Please log in as admin'
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
403    error: 'Please log in as admin, editor or author'
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
403    error: 'Please log in as admin'
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
403    error: 'Please log in as admin, editor or author'
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
201    success: 'Success'
```

Error: 
```
Code   Description
500    error: 'Server error'
401    error: 'Please log in as admin, editor or author'
403    error: 'Please log in as admin, editor or author'
422    error: ''This image is in the database.''
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
403    error: 'Please log in as admin or editor'
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
403    error: 'Please log in as admin or editor '
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
403    number: 0
401    number: 0
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
401    error: 'Please log in as admin, editor or author'
403    error: 'Please log in as admin, editor or author'
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
201    success: 'Success'
```

Error: 
```
Code   Description
500    error: 'Server error'
401    error: 'Please log in as admin, editor or author'
403    error: 'Please log in as admin, editor or author'
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
401    error: 'Please log in as admin, editor or author'
403    error: 'Please log in as admin, editor or author'
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
401    error: 'Please log in as admin, editor or author'
403    error: 'Please log in as admin, editor or author'
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
401    error: 'Please log in as admin, editor or author'
403    error: 'Please log in as admin, editor or author'
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
401    error: 'Please log in as admin, editor or author'
403    error: 'Please log in as admin, editor or author'
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
401    error: 'Please log in as admin'
403    error: 'Please log in as admin'
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
401    error: 'Please log in as admin, editor or author'
403    error: 'Please log in as admin, editor or author'
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
201    success: 'Users are deleted'
```

Error: 
```
Code   Description
500    error: 'Server error'
401    error: 'Please log in as admin, editor or author'
403    error: 'Please log in as admin, editor or author'
400    failed: string[]
422    error: 'This video is in the database.'
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
403    error: 'Please log in as admin or editor'
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
403    error: 'Please log in as admin or editor'
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
201    success: 'Success'
```

Error: 
```
Code   Description
500    error: 'Server error'
401    error: 'Please log in as admin or editor'
403    error: 'Please log in as admin or editor'
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