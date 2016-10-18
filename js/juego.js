var ANCHO_PIEZA = 80;
var ALTO_PIEZA = 80;

var crearPieza = function (nroPieza){
	return {
		_vista: $('<img />')
			.addClass('pieza')
			.attr('src', 'img/' + nroPieza + '.jpg')
			.appendTo('#tablero'),
		inicializar: function(columna, fila) {
			this.setColumna(columna).setFila(fila);
			this._columnaIdeal = columna;
			this._filaIdeal = fila;
		},
		estaEnSuLugar: function() {
			return this.getFila() == this._filaIdeal && 
				this.getColumna() == this._columnaIdeal;
		},
		setColumna: function(columna) {
			this._columna = columna;
			this.actualizarVista();
			return this;
		},
		setFila: function(fila) {
			this._fila = fila;
			this.actualizarVista();
			return this;
		},
		getColumna: function() {
			return this._columna;
		},
		getFila: function() {
			return this._fila;
		},
		moverAbajo: function() {
			this.setFila(this.getFila() + 1);
		},
		moverArriba: function() {
			this.setFila(this.getFila() - 1);
		},
		moverIzquierda: function() {
			this.setColumna(this.getColumna() - 1);
		},
		moverDerecha: function() {
			this.setColumna(this.getColumna() + 1);
		},
		actualizarVista: function() {
			this._vista
				.css('left', this.getColumna() * ANCHO_PIEZA)
				.css('top', this.getFila() * ALTO_PIEZA);
		}
	};
};

var espacioVacio = {
	_columna: 2,
	_fila: 2,
	getFila: function() {
		return this._fila;
	},
	getColumna: function() {
		return this._columna;
	},
	setFila: function(fila) {
		this._fila = fila;
		return this;
	},
	setColumna: function(columna) {
		this._columna = columna
		return this;
	},
	moverArriba: function() {
		if(this.getFila() > 0) {
			piezas.getPiezaDeArriba(this).moverAbajo();
			this.setFila(this.getFila() - 1);
		}
	},
	moverAbajo: function() {
		if(this.getFila() < 2) {
			piezas.getPiezaDeAbajo(this).moverArriba();
			this.setFila(this.getFila() + 1);
		}
	},
	moverIzquierda: function() {
		if(this.getColumna() > 0) {
			piezas.getPiezaDeLaIzquierda(this).moverDerecha();
			this.setColumna(this.getColumna() - 1);
		}
	},
	moverDerecha: function() {
		if(this.getColumna() < 2) {
	 		piezas.getPiezaDeLaDerecha(this).moverIzquierda();
			this.setColumna(this.getColumna() + 1);
		}
	}
};

var piezas = {
	crear: function() {
		this._piezas = [1, 2, 3, 4, 5, 6, 7, 8].map(crearPieza);
		this._piezas[0].inicializar(0, 0);
		this._piezas[1].inicializar(1, 0);
		this._piezas[2].inicializar(2, 0);
		this._piezas[3].inicializar(0, 1);
		this._piezas[4].inicializar(1, 1);
		this._piezas[5].inicializar(2, 1);
		this._piezas[6].inicializar(0, 2);
		this._piezas[7].inicializar(1, 2);
	},
	get: function(fila, columna) {
		return this._piezas.find(function(unaPieza) {
			return unaPieza.getFila() == fila 
				&& unaPieza.getColumna() == columna;
		});
	},
	getPiezaDeArriba: function(pieza) {
		return this.get(pieza.getFila() - 1, pieza.getColumna());
	},
	getPiezaDeAbajo: function(pieza) {
		return this.get(pieza.getFila() + 1, pieza.getColumna());
	},
	getPiezaDeLaIzquierda: function(pieza) {
		return this.get(pieza.getFila(), pieza.getColumna() - 1);
	},
	getPiezaDeLaDerecha: function(pieza) {
		return this.get(pieza.getFila(), pieza.getColumna() + 1);
	},
	estanTodasEnSuLugar: function() {
		return this._piezas.every(function(unaPieza) {
			return unaPieza.estaEnSuLugar();
		});
	}
};

var chequearSiGano = function() {
	if(piezas.estanTodasEnSuLugar()) {
		alert('Ganaste! Sos un/una cap@!');
		$('#tablero').addClass('ganador');
	}
};

$('body').keydown(function(e) {
	console.log(e.which);
	if(e.which == 37) {
		// izquierda
		espacioVacio.moverDerecha();
		chequearSiGano();
	}
	if(e.which == 38) {
		// arriba
		espacioVacio.moverAbajo();
		chequearSiGano();
	}
	if(e.which == 39) {
		// derecha
		espacioVacio.moverIzquierda();
		chequearSiGano();
	}
	if(e.which == 40) {
		// abajo
		espacioVacio.moverArriba();
		chequearSiGano();
	}
});

piezas.crear();

for(var movimientos = 0; movimientos < 2; movimientos++) {
	var numeroAleatorio = Math.random();
	if(numeroAleatorio < 0.25) {
		espacioVacio.moverArriba();
	}
	if(numeroAleatorio >= 0.25 && numeroAleatorio < 0.5) {
		espacioVacio.moverAbajo();
	}
	if(numeroAleatorio >= 0.5 && numeroAleatorio < 0.75) {
		espacioVacio.moverIzquierda();
	}
	if(numeroAleatorio >= 0.75) {
		espacioVacio.moverDerecha();
	}
}