

<script lang="tsx">
import { defineComponent } from 'vue'

export default defineComponent({
  name:"TableHead",
  render:function(h: any){
    const parent = this.$parent
    return(
      <>
        <thead class="xyn-table-head">
            <tr class="xyn-table-tr">
              {
                (parent?.$props as any ).selectBoxShow&&
                ((parent?.$props as any).selectType==="checkbox"||
                (parent?.$props as any).selectType==="radio")?
                <td  class={["xyn-table-td-checkbox" ,"xyn-table-td"]}></td>:""
              }
              {(parent?.$data as any).expand?<td  class="xyn-table-td-arrow"></td>:""}
              {
                (parent?.$data as any).option.map((item:any,indexTd:number)=>{
                  return <td class="xyn-table-td" key={indexTd+item}>{
                      item.sortable?<>
                        {item.label}
                        <i class="ri-sort-asc" onClick={()=>(parent as any).sortColumn("asc",item.prop)}></i> 
                        <i class="ri-sort-desc" onClick={()=>(parent as any).sortColumn("desc",item.prop)}></i> 
                      </>:item.label
                    } </td>
                })
              }
            </tr>
          </thead>
      </>
    )
  }
})
</script>


<style lang="less" scoped>
.xyn-table-head{
  font-weight: bold;
  .xyn-table-td *{
    vertical-align :middle;
  }
  i{
    margin: 5px ;
    box-sizing: border-box;
    border: #40a0ff00 solid 1px;
    &:hover{
      border-color: #409eff ;
    }
  }
  .xyn-table-tr{
    border-bottom: 1px solid rgba(128, 128, 128, 0.192);
  }
  .xyn-table-td {
    
    padding: 15px 5px;
  }
  .xyn-table-td-arrow{
    width: 40px;
    text-align: center;
  }
  .xyn-table-td-checkbox{
    width: 40px;
    text-align: center;
  }
}
.xyn-table-border{
  border: 1px solid rgba(128, 128, 128, 0.192);
  .xyn-table-td{
    border: 1px solid rgba(128, 128, 128, 0.192);
  }

}
</style>