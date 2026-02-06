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