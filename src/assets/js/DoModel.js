export let baseResponse = {
    output: '',
    code: 0,
    message: ''
}

export let registerDO = {
    baseResponse,
    data: {
        username: '',
        email: '',
        password: '',
    }
}

export let loginDO = {
    baseResponse,
    data: {
        uuid: '',
        username: '',
        email: '',
        password: '',
    },
    token: '',
}
