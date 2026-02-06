### Websocket

The news portal uses websocket server to display tasks in the admin dashboard, the number of locked articles, and the latest news in real time. The server is created in `server.js`.

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