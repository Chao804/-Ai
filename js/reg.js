const  loginIdValidator=new FieldValidator('txtLoginId',async function(val){
    if(!val){
        return '请输入用户名'
    }
    const res=await API.exists(val)
      if(res.data){
        return '用户名已存在'
      }  
})
const nicknameValidator=new FieldValidator('txtNickname', function(val){
    if(!val){
        return '请输入昵称'
    }
    
})
const PassWordValidator=new FieldValidator('txtLoginPwd', function(val){
    if(!val){
        return '请输入密码'
    }
    
})
const PassWordValidator2=new FieldValidator('txtLoginPwdConfirm', function(val){
    if(!val){
        return '请输入密码'
    }
    const pwd=PassWordValidator.input.value
    if(val!==pwd){
        return '两次密码输入不一致'}
})
const form=document.querySelector('.user-form')
form.addEventListener('submit',async (e)=>{
    e.preventDefault()
   const res= await FieldValidator.validateAll(loginIdValidator,nicknameValidator,PassWordValidator,PassWordValidator2)
   if(!res){
    return
   }
   else{
    const from=new FormData(form)
    const data=Object.fromEntries(from.entries())
  const res=  await API.reg(data)
if(res.code===0){
     alert('注册成功')
    location.href='./login.html'
}
   
   
   }
   
})