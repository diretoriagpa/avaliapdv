/* Guapi A&B — servidor de banco compartilhado (v2.0)
   Serve o app + sincroniza o estado (todos os aparelhos veem a mesma base).
   Deploy: HF Space (Docker) / Railway / Render — "node server.js", porta $PORT.
   Uso local: PORT=3000 node server.js */
const http=require('http'),fs=require('fs'),path=require('path');
const PORT=process.env.PORT||3000;
const APP=path.resolve(__dirname,'./app.html');
const DB=path.resolve(__dirname,'data.json');
let state=null;
try{state=JSON.parse(fs.readFileSync(DB,'utf8'))}catch(e){state=null}
http.createServer((req,res)=>{
 const cors={'Access-Control-Allow-Origin':'*','Access-Control-Allow-Methods':'GET,POST,OPTIONS','Access-Control-Allow-Headers':'Content-Type'};
 if(req.method==='OPTIONS'){res.writeHead(204,cors);return res.end()}
 if(req.url==='/data'&&req.method==='GET'){
  res.writeHead(200,{...cors,'Content-Type':'application/json; charset=utf-8'});return res.end(JSON.stringify(state))
 }
 if(req.url==='/data'&&req.method==='POST'){
  let b='';req.on('data',c=>{b+=c;if(b.length>60e6)req.destroy()});
  req.on('end',()=>{try{const d=JSON.parse(b);if(!d||!d.pdvs)throw new Error('payload inválido');state=d;fs.writeFileSync(DB,JSON.stringify(d));
   res.writeHead(200,{...cors,'Content-Type':'application/json'});res.end('{"ok":true}')}catch(e){
   res.writeHead(400,{...cors,'Content-Type':'application/json'});res.end('{"ok":false}')}});return
 }
 if(req.url==='/'||req.url.startsWith('/index')){
  res.writeHead(200,{'Content-Type':'text/html; charset=utf-8'});
  return fs.createReadStream(APP).pipe(res)
 }
 if(req.url==='/healthz'){res.writeHead(200,{...cors,'Content-Type':'text/plain'});return res.end('ok')}
 res.writeHead(404);res.end('not found');
}).listen(PORT,()=>console.log('Guapi A&B sync rodando na porta',PORT));
