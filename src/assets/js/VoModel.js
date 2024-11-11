import {baseResponse} from "@/assets/js/DoModel.js";

export let registerVO = {
    username: '',
    email: '',
    password: '',
}

export let loginVO = {
    user:'',
    password: '',
}

export let articleListVO = {
    page:'',
    size:'',
}

export let searchArticleVO = {
    keyword: '',
    page: '',
    size: '',
}

export let addArticleVO = {
    title:'',
    description:'',
    tags:'',
    image:'',
}

export let tagListVO = {
    page:'',
    size:'',
}


export let commentListVO = {
    page:'',
    size:'',
}

export let addCommentVO = {
    aid:'',
    cname:'',
    cdesc:'',
}

export let deleteCommentVO = {
    cid:''
}
