(async function (){
 const tokenisTrue= await API.profile()
 console.log(tokenisTrue);
 const dataList={
    aside:{
        nickname:document.querySelector("#nickname"),
        loginId:document.querySelector("#loginId"),
    },
    close:document.querySelector(".close"),
 }
if(!tokenisTrue.data){
    alert(`${tokenisTrue.msg}`)
    location.href = "login.html"
}   

function init(){
dataList.aside.nickname.innerText=tokenisTrue.data.nickname
dataList.aside.loginId.innerText=tokenisTrue.data.loginId
history()
}
init()
dataList.close.addEventListener('click',close)
function close(){
    localStorage.removeItem("token")
    location.href = "login.html"
}

function  addfn(options){
    const div=document.createElement('div')
    div.classList.add('chat-item')
    if(options.from){
    div.classList.add('me')
    }
    const img=document.createElement('img')
    img.classList.add('chat-avatar')
    img.src=options.from?'./asset/avatar.png':'./asset/robot-avatar.jpg'
    const div2=document.createElement('div')
    div2.classList.add('chat-content')
    div2.innerText=options.content
   const div3=document.createElement('div')
   div3.classList.add('chat-date')
   div3.innerText=timefn(options.createdAt)

    div.appendChild(img)
    div.appendChild(div2)
    div.appendChild(div3)
    document.querySelector('.chat-container').appendChild(div)
}
function timefn(time){
    const date=new Date(time)
    const year=date.getFullYear()
    const month=(date.getMonth()+1).toString().padStart(2,'0')
    const day=date.getDate().toString().padStart(2,'0')
    const hour=date.getHours().toString().padStart(2,'0')
    const minute=date.getMinutes().toString().padStart(2,'0')
    const second=date.getSeconds().toString().padStart(2,'0')
    return `${year}-${month}-${day} ${hour}:${minute}:${second}`
}

async function history(){
   const res=await API.history()
   if(res.code!==0){
    alert('获取历史记录失败,请刷新界面')
    return
   }
    for(const i of res.data){
    await   addfn(i)   
    }
    document.querySelector('.chat-container').scrollTop=document.querySelector('.chat-container').scrollHeight
}
async function message(){
   const inputValue= document.querySelector('#txtMsg')
   const v=inputValue.value
   console.log(inputValue.value);
   
   addfn({
    from:tokenisTrue.data.loginId,
     content:inputValue.value,
     createdAt:Date.now()
   })
inputValue.value=''
document.querySelector('.chat-container').scrollTop=document.querySelector('.chat-container').scrollHeight
   const res= await API.chat({
    content:v
   })
   console.log(res);
   
  addfn({
    ...res.data,
    from:null
  })
  document.querySelector('.chat-container').scrollTop=document.querySelector('.chat-container').scrollHeight 
}
document.querySelector('.msg-container').addEventListener('submit',e=>{
    e.preventDefault()
    message()
})
})()