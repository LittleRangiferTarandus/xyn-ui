

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
  data(){

    return{
      option:[]
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
          <tbody class="xyn-table-body">
            {
              this.dataSource.map((v:any,indexTr:number)=>{
                let td = this.option.map((item:any,indexTd:number)=>{
                  return <td class="xyn-table-td" key={indexTd+item}>{item.render?item.render(v):v[item.prop]}</td>
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
        <div class="xyn-table-column">
          {          
            this.$slots.default?this.$slots.default():""
          }
        </div>
        
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
    background-color: rgba(176, 207, 248, 0.753);
  }
  .xyn-table-tr,.xyn-table-td{
    padding: 5px;
    border: 1px solid rgba(128, 128, 128, 0.192);
  }
  .xyn-table-body{
    .xyn-table-tr{
      &:hover{
        background-color: rgba(158, 157, 157, 0.13);
      }
    }
  }
}
.xyn-table-column{
  display: none;
}
</style>