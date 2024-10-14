var API= ( function(){
    const BASE_URL = 'https://study.duyiedu.com';
    const TOKEN_KEY=  'token'
    function get(url){
        return fetch(`${BASE_URL}${url}`)
    }
   async function login(options){
   return await fetch(`${BASE_URL}/api/user/login`,{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(options)
        }).then(async res=>{
            console.log(res.headers.get('Authorization'));
            
          const a=  await res.json();
            if(a.code===0){
             localStorage.setItem(TOKEN_KEY,`Bearer ${res.headers.get('Authorization')}`)   
            }
         ;
         return a
        })
    }
async function reg(data){
    return await fetch (`${BASE_URL}/api/user/reg`,{
        method: 'POST',
        headers:{
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    }).then(res=>{
        return res.json();
    })
}
async function exists(data){
    let token=''
    if(localStorage.getItem(TOKEN_KEY)){
        token  = localStorage.getItem(TOKEN_KEY);
   
    }
    const resp = await get('/api/user/exists?loginId=' + data,headers={
        authorization: `${token}`
    });
    return await resp.json();
}
async function profile(){
    let token=''
    if(localStorage.getItem(TOKEN_KEY)){
        token  = localStorage.getItem(TOKEN_KEY);
        console.log(token);
    }
    return await fetch(`${BASE_URL}/api/user/profile`,{
        headers:{
            authorization:`${token}`
       }
    }).then(res=>{
        
        return res.json()
    })
}
async function chat(data){
    let token=''
    console.log(JSON.stringify(data));
    
    if(localStorage.getItem(TOKEN_KEY)){
        token  = localStorage.getItem(TOKEN_KEY);
    }
    return await fetch(`${BASE_URL}/api/chat`,{
        method: 'POST',
        headers:{
            'Content-Type': 'application/json',
            authorization:`${token}`
        },
        body:JSON.stringify(data)
    }).then(res=>{
        return res.json()
    })
}
async function history(){
    let token=''
    if(localStorage.getItem(TOKEN_KEY)){
        token  = localStorage.getItem(TOKEN_KEY);
        console.log(token);
    }
    return await fetch(`${BASE_URL}/api/chat/history`,{
        headers:{
            authorization:`${token}`
        }
    }).then(res=>{
        return res.json()
    })
}
return{
    login,
    reg,
    exists,
    profile,
    chat,
    history
}
})()