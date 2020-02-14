/*****

Template básico de aplicativo Node.JS com o módulo 'express'.
Autor: @bwb0de
email: danielc@unb.br  

*****/

//Importando módulos do a serem usados
const express = require('express');
const handlebars = require('express-handlebars').create({defaultLayout:'main'}); 
const body_parser = require('body-parser'); 
const fs = require("fs");
const app = express();

app.disable('x-powered-by'); 
app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');
app.use(body_parser.urlencoded({extended: true}));
app.use(body_parser.json());
app.set('port', process.env.PORT || 3000); 
app.use(express.static(`${__dirname}/public`)); 

files = fs.readdirSync('./nfo/personagens/');
files_name_list = []
for (i in files) {
  files_name_list.push(files[i].replace('.json',''))
}

function read_json_file(target_json_file) {
	let rawdata = fs.readFileSync(target_json_file);
	let jsondata = JSON.parse(rawdata);
	return jsondata;
}

function write_json_file(target_json_file, data) {
	let data2 = JSON.stringify(data, null, 4);
	fs.writeFile(target_json_file, data2, finished);
	function finished(err) {
		console.log('Arquivo salvo…');
	}
} 



/*****
Definindo rotas
*****/ 

app.get('/', function(req, res){
  res.render('home', { subtitulo: "Lista de personagens", lista_personagens: files_name_list}); // Carrega template view home.handlebars
});
 
app.use(function(req, res, next){
  console.log('Looking for URL : ' + req.url);
  next();
});
  
app.use(function(err, req, res, next){
  console.log('Error : ' + err.message);
  next();
});
 

app.get('/ler/:tipo_lista/:file_ref', function(req, res){
  pcfile_str = req.params.file_ref;
  pcfile_ob = read_json_file(`./nfo/personagens/${pcfile_str}.json`);
  if (req.params.tipo_lista === 'notas') { res.json(pcfile_ob.notas); }
  else if (req.params.tipo_lista === 'itens') { res.json(pcfile_ob.itens); }

});


app.get('/ler_notas/:file_ref', function(req, res){
  pcfile_str = req.params.file_ref;
  pcfile_ob = read_json_file(`./nfo/personagens/${pcfile_str}.json`);
  res.json(pcfile_ob.notas);
});

app.get('/ler_itens/:file_ref', function(req, res){
  pcfile_str = req.params.file_ref;
  pcfile_ob = read_json_file(`./nfo/personagens/${pcfile_str}.json`);
  res.json(pcfile_ob.itens);
});

app.post('/adicionar_nota', function(req, res){ 
  pcfile_str = req.headers.referer.replace(res.req.headers.origin+'/','');
  pcfile_ob = read_json_file(`./nfo/personagens/${pcfile_str}.json`);
  pcfile_ob.notas.push(req.body.nota);
  write_json_file(`./nfo/personagens/${pcfile_str}.json`, pcfile_ob);
  res.send('Nota inserida!');
});


app.post('/adicionar_item', function(req, res){ 
  pcfile_str = req.headers.referer.replace(req.headers.origin+'/','');
  pcfile_ob = read_json_file(`./nfo/personagens/${pcfile_str}.json`);
  pcfile_ob.itens.push(req.body.item);
  write_json_file(`./nfo/personagens/${pcfile_str}.json`, pcfile_ob);
  res.send('Item inserido!');
});


app.post('/remover_nota', function(req, res){ 
  pcfile_str = req.headers.referer.replace(req.headers.origin+'/','')
  pcfile_ob = read_json_file(`./nfo/personagens/${pcfile_str}.json`)
  notaIdx = pcfile_ob.notas.indexOf(req.body.nota);
  pcfile_ob.notas.splice(notaIdx, 1);
  write_json_file(`./nfo/personagens/${pcfile_str}.json`, pcfile_ob)
  res.send('Nota removida!')
});


app.post('/remover_item', function(req, res){ 
  pcfile_str = req.headers.referer.replace(req.headers.origin+'/','')
  pcfile_ob = read_json_file(`./nfo/personagens/${pcfile_str}.json`)
  itemIdx = pcfile_ob.itens.indexOf(req.body.item);
  pcfile_ob.itens.splice(itemIdx, 1);
  write_json_file(`./nfo/personagens/${pcfile_str}.json`, pcfile_ob)
  res.send('Item removido!')
});


app.get('/:pc_json_file', function(req, res){
  pcfile = read_json_file(`./nfo/personagens/${req.params.pc_json_file}.json`);
  pcfile.isPlayerPage = true;
  res.render('personagem', { pcfileinfo: pcfile, page_ref: req.params.pc_json_file })
});


let port = app.get('port')

app.listen(port, function(){
  console.log(`Node.JS App iniciado em http://localhost:${port}/ aperte Ctrl-C para fechar.`);
});
