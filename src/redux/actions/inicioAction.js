export const INIT_CIUDAD = 'INIT_CIUDAD';
export const ADD_CIUDAD = 'ADD_CIUDAD';
export const inicializar_ciudad = (ciudades) => {
    console.log('Inicializar ciudad, ciudades que llegan ->', ciudades);
    return {
        type:INIT_CIUDAD,
        payload:ciudades
    }
}

