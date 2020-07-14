import express from 'express'
import { RuleEngine } from './engine'
const app = express()

app.get('/', function (req, res) {
  res.send('TP fallas');
});

app.get('/motor', function (req, res) {
	const ruleEngine = new RuleEngine()
	ruleEngine.process(parseInt(req.query.rpm),
  		  req.query.tflp.toUpperCase(),
  		  req.query.mp.toUpperCase(),
  		  parseInt(req.query.ph),
  		  parseInt(req.query.pea),
  		  req.query.vps.toUpperCase()
  		  ).then(message => {
  		  	console.log(message)
			res.send(message)
  		  })
	
});


app.listen(3500, () => {
 console.log("El servidor está inicializado en el puerto 3500");
});
