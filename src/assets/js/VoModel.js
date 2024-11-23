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

export let articleDetailsVO = {
    aid:'',
}

export let getArticleByTagVO = {
    tname:'',
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
    aid:''
}

export let addCommentVO = {
    aid:'',
    cname:'',
    cdesc:'',
}

export let addReplyVO = {
    aid:'',
    cname:'',
    email:'',
    cdesc:'',
    replyid:''
}

export let deleteCommentVO = {
    cid:''
}
