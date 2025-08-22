import mongoose from "mongoose";
import * as os from "os";

const sorteia = (min, max) => {  
	return Math.floor(Math.random() * (max - min) + min);
};

const aguarde = (ms) => new Promise(resolve => setTimeout(resolve, ms));

class TesteController {
	static info = (req, res) => {
		res.status(200).json({
			date: new Date(),
			banco: {
				status: mongoose.connection.readyState === 1 ? "Conectado" : "Desconectado",
				name: mongoose.connection.name
			},
			req: {
				method: req.method,
				url: req.url,
				query: req.query,
				params: req.params,
				body: req.body || null,
				originalUrl: req.originalUrl,
				httpVersion: req.httpVersion,
				hostname: req.hostname,
				protocol: req.protocol,
				socket: {
					remoteAddress: req.socket.remoteAddress,
					remotePort: req.socket.remotePort,
					localAddress: req.socket.localAddress,
					localPort: req.socket.localPort					
				},
				headers: req.headers,
			},
			process: {
				version: process.version,
				versions: process.versions,
				platform: process.platform,
				arch: process.arch,
				uptime: process.uptime(),
				memoryUsage: process.memoryUsage(),
				cwd: process.cwd(),
				pid: process.pid,
				execPath: process.execPath,
				argv: process.argv,
				env: process.env
			},
			os: {
				hostname: os.hostname(),
				type: os.type(),
				platform: os.platform(),
				arch: os.arch(),
				version: os.version(),
				release: os.release(),
				uptime: os.uptime(),
				userInfo: os.userInfo(),
				loadavg: os.loadavg(),
				totalmem: os.totalmem(),
				freemem: os.freemem(),
				cpus: os.cpus(),
				networkInterfaces: os.networkInterfaces()
			},
		});
	};

	static gerarNumero = (req,res) => {
		let numero = sorteia(0,100);
		res.status(200).json({ 
			message: "Número aleatório gerado.",
			numero: numero 
		});
	};

	static mensagemCount = 0;
	static mensagem = (req,res) => {
		res.status(200).json({ 
			count: TesteController.mensagemCount++,
			mensagem: req.query.teste
		});
	};

	static dormir = async (req,res) => {
		const ms = req.query.ms ? parseInt(req.query.ms) : 1;

		const inicio = new Date();

		await aguarde(ms);

		const fim = new Date();

		res.status(200).json({ 
			message: `Dormiu por ${ms} Milissegundos!`,
			inicio: inicio,
			fim: fim
		});
	};
}

export default TesteController;