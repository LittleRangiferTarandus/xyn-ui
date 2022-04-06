

<script lang="tsx">
import { defineComponent } from 'vue'

export default defineComponent({
  name:"XynTable",
  props:{
    dataSource:{
      type:Array,
      default:[]
    }
  },
  computed:{
    option(){
      let tempOption: any[]=[]
      let tempSlot = this.slot
      if(tempSlot.length){
        tempSlot.forEach((e: any ,i:  number)=>{
          tempOption[i]=JSON.parse(JSON.stringify(e.props))
          if(e.children?.default)
            tempOption[i].renderer=e.children.default
        })
        return tempOption
      }
      return []
    },
    slot(){
      if(this.$slots.default instanceof Function){
        return this.$slots.default()
      }
      return []
    }
  },
  watch:{
    option(){
      this.option
    }
  },
  render:function(h: any){
    return(
      <>
        <table class="xyn-table">
          <thead class="xyn-table-head">
            <tr class="xyn-table-tr">
              {
                this.option.map((item:any,indexTd:number)=>{
                  return <td class="xyn-table-td" key={indexTd+item}>{item.label}</td>
                })
              }
            </tr>
          </thead>
          <tbody>
            {
              this.dataSource.map((v:any,indexTr:number)=>{
                let td = this.option.map((item:any,indexTd:number)=>{
                  return <td class="xyn-table-td" key={indexTd+item}>{item.renderer?item.renderer():v[item.prop]}</td>
                })
                return(
                  <tr class="xyn-table-tr" key={indexTr}>
                    {td}
                  </tr>
                )
              })
            }
          </tbody>
        </table>
      </>
    )
  }
})
</script>


<style lang="less" scoped>
.xyn-table{
  border: 1px solid rgba(128, 128, 128, 0.192);
  background-color: white;
  width: 100%;
  box-sizing: border-box;
  border-collapse:collapse;
  .xyn-table-head{
    font-weight: bold;
  }
  .xyn-table-tr,.xyn-table-td{
    padding: 5px;
    border: 1px solid rgba(128, 128, 128, 0.192);
  }
  .xyn-table-tr{
    &:hover{
      background-color: rgba(158, 157, 157, 0.13);
    }
  }
}
</style>