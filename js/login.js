const  loginIdValidator=new FieldValidator('txtLoginId',function(val){
    if(!val){
        return '请输入用户名'
    }
    
})
const PassWordValidator=new FieldValidator('txtLoginPwd', function(val){
    if(!val){
        return '请输入密码'
    }
    
})
const form=document.querySelector('.user-form')
form.addEventListener('submit',async (e)=>{
    e.preventDefault()
   const res= await FieldValidator.validateAll(loginIdValidator,PassWordValidator)
   if(!res){
    return
   }
   else{
    const from=new FormData(form)
    const data=Object.fromEntries(from.entries())
    const res=  await API.login(data)
    console.log(res);
    
    if(res.code===0){
         alert('登录成功')
        location.href='./index.html'
   
   }
}
})