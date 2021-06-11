export const INIT_USUARIO = 'INIT_USUARIO';
export const ADD_USUARIO = 'ADD_USUARIO';
export const inicializar_usuario = (usuario, login) => {
    console.log('Inicializar usuario, usuario que llega ->', usuario);
    return {
        type: INIT_USUARIO,
        user: usuario,
        log: login
    }
}
