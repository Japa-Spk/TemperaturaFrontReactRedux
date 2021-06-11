export const INIT_CIUDAD = 'INIT_CIUDAD';
export const INIT_PAIS = 'INIT_PAIS';
export const ADD_CIUDAD = 'ADD_CIUDAD';
export const inicializar_ciudad = (ciudades) => {
    console.log('Inicializar ciudad, ciudades que llegan ->', ciudades);
    return {
        type:INIT_CIUDAD,
        payload:ciudades
    }
}

export const inicializar_pais = (paises) => {
    console.log('Inicializar pais, paises que llegan ->', paises);
    return {
        type:INIT_PAIS,
        payload:paises
    }
}



