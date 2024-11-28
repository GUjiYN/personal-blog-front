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

export let logoutDO = {
    baseResponse,
}

export let articleListDO = {
    baseResponse,
    total: 0, // 文章总数
    size: 5, // 每页文章数
    current: 1, // 当前页码
    pages:'',
    data:  // 文章列表
        {
            aid: '', // 文章ID
            authid: '', // 作者ID
            title: '', // 标题
            description: '', // 简介
            tags: '', // 标签（以逗号分隔的字符串）
            image: '', // 图片地址
            createdAt: '', // 创建时间
            updatedAt: '', // 更新时间
        }
};


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

export let getArticleByTagDO = {
    baseResponse,
    data: {
        aid: '', // 文章ID
        authid: '', // 作者ID
        title: '', // 标题
        description: '', // 简介
        tags: '', // 标签（以逗号分隔的字符串）
        image: '', // 图片地址
        createdAt: '', // 创建时间
        updatedAt: '', // 更新时间
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


export let createArticleDO = {
    baseResponse,
    data: {
        title:'',
        description:'',
        tags:'',
        image:'',
    }
}

export let updateArticleDO = {
    baseResponse,
    data: {
        title:'',
        description:'',
        tags:'',
        image:'',
    }
}

export let deleteArticleDO = {
    baseResponse,
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

export let addReplyDO = {
    baseResponse,
    data: {
        aid:'',
        cid:'',
        cname:'',
        email:'',
        cdesc:'',
        createdAt:'',
    }
}

export let deleteCommentDO = {
    baseResponse,
    data: {

    }
}
