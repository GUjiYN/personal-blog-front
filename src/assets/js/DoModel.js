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

export let articleDetailsDO = {
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


export let tagListDO = {
    baseResponse,
    data: {
        tid:'',
        tname:''
    }
}

export let commentListDO = {
    baseResponse,
    data: {
        cid:'' ,
        cname:'',
        cdesc:'',
        createdAt:'',
        reply:''
    }
}

export let addCommentDO = {
    baseResponse,
    data: {
        aid:'',
        cname:'',
        cdesc:'',
        createdAt:'',
    }
}

export let deleteCommentDO = {
    baseResponse,
    data: {

    }
}
