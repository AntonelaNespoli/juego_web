/* juega la maquina, despues de precionar el botón enviar */
let juego = {
    // Valores posibles
    valores: {piedra:1, papel:2, tijeras:3, largarto: 4, spock: 5},
    partidas: 0,
    partidasGanadas: 0,
    creditos: 100,
    // Jugar juego
    jugar: function(valor){
        
        let maquina = this.jugarMaquina();
        let resultado = this.comparar(valor, maquina);
        let mensaje;
        this.partidas++;
        this.creditos -= 5;
        
        if (resultado === -1) {
            mensaje = traductor.traducir('Empate!');
        } else if (resultado === 0){
            mensaje = traductor.traducir('Perdiste!') + '\n' + this.obtenerMensaje(maquina, valor);
        } else {
            mensaje = traductor.traducir('Ganaste!') + '\n' + this.obtenerMensaje(valor, maquina);
            this.partidasGanadas++;
            if (valor == this.valores.spock)
                this.creditos += 20;
            else
                this.creditos += 10;
        }
        
        $('.total-juego').html(this.partidas);
        $('.total-usuario').html(this.partidasGanadas);
        $('.creditos').html(this.creditos);
        
        alert(mensaje);
    },
    // Juega la maquina
    jugarMaquina: function(){
        return Math.floor(Math.random() * 5 + 1);
    },
    // Comparar resultados
    comparar: function(entrada, valorMaquina) {
        if (entrada == valorMaquina) {
            return -1;
        } else if (entrada == this.valores.piedra){
            if (valorMaquina == this.valores.tijeras || valorMaquina == this.valores.largarto) {
                return 1;
            } else {
                return 0;
            }
        } else if (entrada == this.valores.papel){
            if (valorMaquina == this.valores.piedra || valorMaquina == this.valores.spock) {
                return 1;
            }else {
                return 0;
            }
        } else if (entrada == this.valores.tijeras){
            if (valorMaquina == this.valores.papel || valorMaquina == this.valores.largarto) {
                return 1;
            }else {
                return 0;
            }
        } else if (entrada == this.valores.largarto){
            if (valorMaquina == this.valores.papel || valorMaquina == this.valores.spock) {
                return 1;
            }else {
                return 0;
            }
        } else if (entrada == this.valores.spock){
            if (valorMaquina == this.valores.piedra || valorMaquina == this.valores.tijeras) {
                return 1;
            }else {
                return 0;
            }
        }
    },
    obtenerMensaje: function(a, b){
        let mensaje;
        switch(a) {
            case this.valores.piedra:
                if(b == this.valores.largarto)
                    mensaje = traductor.traducir('La Piedra aplasta al Lagarto');
                else
                    mensaje = traductor.traducir('La Piedra aplasta las Tijeras');
                break;
            case this.valores.papel:
                if(b == this.valores.piedra)
                    mensaje = traductor.traducir('El Papel cubre la Piedra');
                else
                    mensaje = traductor.traducir('El Papel refuta a Spock');
                break;
            case this.valores.tijeras:
                if(b == this.valores.papel)
                    mensaje = traductor.traducir('Las Tijeras cortan al Papel');
                else
                    mensaje = traductor.traducir('Las Tijeras decapitan al lagarto');
                break;
            case this.valores.spock:
                if(b == this.valores.tijeras)
                    mensaje = traductor.traducir('Spock destroza las Tijeras');
                else
                    mensaje = traductor.traducir('Spock vaporiza a la Piedra');
                break;
            case this.valores.largarto:
                if(b == this.valores.spock)
                    mensaje = traductor.traducir('El Lagarto envenena a Spock');
                else
                    mensaje = traductor.traducir('El Lagarto se come al Papel');
                break;
        }
        
        return mensaje;
    }
}

$('.contenedor-btn button').click(function(event){
    juego.jugar(parseInt(event.currentTarget.id));
});

let traductor = {
    lenguaje: 'en_US',
    traducciones: {},
    traducirPagina: function(){
        let traducciones = this.traducciones;
        let lenguaje = this.lenguaje;
        $('[data-translate]').each(function(){
            if (traducciones[lenguaje]  !== undefined) {
                let traduccion = traducciones[lenguaje][$(this).html()];
                $(this).html(traduccion ? traduccion : $(this).html());
            }
        });
    },
    traducir: function(texto){
        if (this.traducciones[this.lenguaje]  !== undefined) {
            let traduccion = this.traducciones[this.lenguaje][texto];
            if (traduccion)
                return traduccion;
        }
        
        return texto;
    }
}

traductor.traducciones['en_US'] = {
    'Deslice para ver más': 'Slide for see more',
    'Perdiste!': 'Lost!',
    'Ganaste!': 'Win!',
    'Empate!': 'Tie!',
    'La Piedra aplasta al Lagarto': 'The Rock crushes the Lizard',
    'La Piedra aplasta las Tijeras': 'The Rock crushes the Scissors',
    'El Papel cubre la Piedra': 'The Paper cover the Rock',
    'El Papel refuta a Spock': 'The paper refute to Spock',
    'Las Tijeras cortan al Papel': 'The Scissors cut to Paper',
    'Las Tijeras decapitan al lagarto': 'The Sissors behead to Lizard',
    'Spock destroza las Tijeras': 'Spock destroys the Scissors',
    'Spock vaporiza a la Piedra': 'Spock vaporize to the Rock',
    'El Lagarto envenena a Spock': 'The Lizard poisons to Spock',
    'El Lagarto se come al Papel': 'The Lizard eats the paper',
    'Piedra': 'Rock',
    'Papel': 'Paper',
    'Tijeras': 'Scissors',
    'Lagarto': 'Lizard',
    'Spock': 'Spock',
    'N° de Juego': 'Game Number',
    'Partidas ganadas': 'Games Won',
    'Totales': 'Total'
};

traductor.traducciones['zh_CN'] = {
    'Deslice para ver más': '',
    'Perdiste!': '',
    'Ganaste!': '',
    'Empate!': '',
    'La Piedra aplasta al Lagarto': '',
    'La Piedra aplasta las Tijeras': '',
    'El Papel cubre la Piedra': '',
    'El Papel refuta a Spock': '',
    'Las Tijeras cortan al Papel': '',
    'Las Tijeras decapitan al lagarto': '',
    'Spock destroza las Tijeras': '',
    'Spock vaporiza a la Piedra': '',
    'El Lagarto envenena a Spock': '',
    'El Lagarto se come al Papel': '',
    'Piedra': '',
    'Papel': '',
    'Tijeras': '',
    'Lagarto': '',
    'Spock': '',
    'N° de Juego': '',
    'Partidas ganadas': '',
    'Totales': ''
};

$(document).ready(function(){
    traductor.traducirPagina();
});
