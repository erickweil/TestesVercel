
const sorteia = (min, max) => {  
	return Math.floor(Math.random() * (max - min) + min);
};

class AleatorioController {
	static gerarNumero = (req,res) => {
		let numero = sorteia(0,100);
		res.status(200).json({ 
			message: "Número aleatório gerado.",
			numero: numero 
		});
	};
}

export default AleatorioController;