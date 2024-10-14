class FieldValidator {
    constructor (txtid,validatorfn){
        this.input=document.querySelector(`#${txtid}`)
        this.validatorfn=validatorfn
        this.p=this.input.nextElementSibling
        this.input.addEventListener('blur',()=>{
            this.validate()
        })
    }
    
  async  validate(){
        const err=await this.validatorfn(this.input.value)
        if(err){
            this.p.innerText=err
            return false
        }else{
            this.p.innerText=''
            return true
        }
        
    }
    static async validateAll(...data){
      
        
        let date=Array.from(data).map(item=>{
            return item.validate()
        })
      let Pro=  await Promise.all(date)
     return Pro.every(item=>item)
     
        
    }
}
