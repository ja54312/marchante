export interface initialformProps {
    tipoCliente: string
    mercadoTianguis?: string
    zonaRegistro?: string
    mercado?: string
    local?: number | string
    nameLocal?: string
    email: string
    password: string
    checkTyC: boolean
}

export interface initialErrorProps {
    local?: number | string
    nameLocal?: string
    email?: string
    password?: string
}