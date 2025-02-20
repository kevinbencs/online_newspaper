const { createServer } = require('http');
const { parse } = require('url');
const next = require('next');
const { Server } = require("socket.io");

const Admin = require('./modelforserver/Admin')
const Token = require('./modelforserver/Token')
const jwt = require("jsonwebtoken")


const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

const clients = [];

function parseCookies(cookieString) {
  const cookies = {};
  if (!cookieString) return cookies;

  cookieString.split(';').forEach(cookie => {
    const parts = cookie.split('=');
    const name = parts[0].trim();
    const value = parts[1] ? parts[1].trim() : '';
    cookies[name] = decodeURIComponent(value);
  });
  return cookies;
}

async function validate(token) {
  try {
    const token2 = await Token.findOne({ token: token })
    if (!token2) {

      return "PLease log in";
    }

    const decoded = jwt.verify(token, process.env.SECRET_CODE);
    if (!decoded) {

      return "PLease log in";
    }

    const account = await Admin.findById(decoded.id);
    if (!account) {

      return "PLease log in";
    }

    return 'success';
  }
  catch (err) {
    console.log(err)
    return 'Server error';
  }
}



app.prepare().then(() => {
  const server = createServer((req, res) => {
    const parsedUrl = parse(req.url, true);
    handle(req, res, parsedUrl);
  });

  const io = new Server(server);

  io.on('connection', (socket) => {
    console.log('A client connected');

    socket.on('lastMainPage', (data) => {
      io.emit('lastMainPageNews', data)
    })

    socket.on('authenticate', async () => {
      const index = clients[socket.id]
      if (index > -1) {
        clients.splice(index, 1)
      }
      else {
        const cookie = parseCookies(socket.handshake.headers.cookie);
        if (cookie) {
          const res = await validate(cookie['admin-log'])
          if (res === 'success') {
            clients.push(socket.id)
          }
        }
      }
    })

    socket.on('writeArticle', (data) => {
      for (let id of clients) {
        io.to(id).emit('numberOfLockedArticle', data)
      }
    })

    socket.on('unLockArticle', (data) => {
      for (let id of clients) {
        io.to(id).emit('numberOfLockedArticle', data)
      }
    })

    socket.on('addTask', (data) => {
      for (let id of clients) {
        io.to(id).emit('task', data)
      }
    })

    socket.on('deleteTask', (data) => {
      for (let id of clients) {
        io.to(id).emit('task', data)
      }
    })

    socket.on('setNameForTask', (data) => {
      for (let id of clients) {
        io.to(id).emit('task', data)
      }
    })



    socket.on('disconnect', () => {
      console.log('A client disconnected');
      const index = clients[socket.id]
      if (index > -1) {
        clients.splice(index, 1)
      }

    });
  });

  server.listen(3000, (err) => {
    if (err) throw err;
    console.log('> Ready on http://localhost:3000');
  });
});


