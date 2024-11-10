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

export let articleListDO = {
    baseResponse,
    data: {
        aid:'',
        authid:'',
        title:'',
        description:'',
        tags: '',
        image:'',
        createdAt:'',
        updatedAt:'',
    }
}


export let searchArticleDO = {
    baseResponse,
    data: {
        aid:'',
        authid:'',
        title:'',
        description:'',
        tags: '',
        image:'',
        createdAt:'',
        updatedAt:'',
    }
}


export let addArticleDO = {
    baseResponse,
    data: {
        title:'',
        description:'',
        tags:'',
        image:'',
    }
}
