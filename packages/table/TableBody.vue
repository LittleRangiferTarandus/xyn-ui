

<script lang="tsx">
import { defineComponent } from 'vue'
import TableCheckboxVue from './TableCheckbox.vue'

export default defineComponent({
  name:"TableBody",
  render:function(h: any){
    const parent:any = this.$parent
    const $data:any = parent.$data
    const $props:any = parent.$props
    return(
      <>
          <tbody class={["xyn-table-body",{'xyn-table-body-stripe':$props.stripe}]}>
            {
              $props.dataSource.map((v:any,indexTr:number)=>{
                let td = $data.option.map((item:any,indexTd:number)=>{
                  return  <td class="xyn-table-td" key={indexTd+item} onClick={()=>parent.selectRow(indexTr)}>
                    {item.render?item.render(v):v[item.prop]}
                  </td>
                })
                return(
                  <>
                    <tr class={['xyn-table-tr',{'xyn-table-select-active':$data.isSelectRow[indexTr]},{'xyn-table-tr-stripe':indexTr&1}]}  
                    key={indexTr}>
                      {
                        $props.selectBoxShow&&
                        ($props.selectType==="checkbox"||
                        $props.selectType==="radio")?
                        <td  class={["xyn-table-td-checkbox" ,"xyn-table-td"]}  onClick={()=>parent.selectRow(indexTr)}>
                          <TableCheckboxVue isCheck={parent.isSelectRow[indexTr]}></TableCheckboxVue>
                        </td>:""
                      }
                      {
                        $data.expand?
                        <td class="xyn-table-td-arrow" onClick={()=>{parent.expandRow(indexTr)}}>
                          {$data.isExpandRow[indexTr]?<i class="ri-arrow-down-s-line"></i>:<i class="ri-arrow-right-s-line"></i> }
                        </td>:""
                      }
                      {td}
                    </tr>
                    {
                      $data.expand?<tr class={['xyn-table-expand',{'xyn-table-expand-active':$data.isExpandRow[indexTr]}]}  key={indexTr+"expand"}>
                        <td colspan={$data.option.length+2}>
                          <div>
                            {
                              ($data.expand  as Function)(v)
                            }
                          </div>
                        </td>
                      </tr>:""
                    }
                  </>
                )
              })
            }
          </tbody>
      </>
    )
  }
})
</script>


<style lang="less" scoped>

  .xyn-table-tr{
    border-bottom: 1px solid rgba(128, 128, 128, 0.192);
  }
  .xyn-table-td {
    
    padding: 15px 5px;
  }
  .xyn-table-body{
    .xyn-table-tr{
      &:hover{
        background-color: rgba(78, 78, 78, 0.13);
      }
    }
    .xyn-table-select-active.xyn-table-tr{
      background-color: rgba(224, 181, 86, 0.13);
    }
    .xyn-table-expand{ 
      td{
        div{
          max-height: 0 ;
          overflow: hidden;
          width: 100%;
          transition:  .5s;
        }
        height: 0 ;
        padding: 0;
      }
    }
    .xyn-table-expand-active.xyn-table-expand{
      td{
        div{
          max-height:200vh;
          transition:  5s;
        }
      }
    }
  }

  .xyn-table-td-arrow{
    width: 40px;
    text-align: center;
  }
  .xyn-table-td-checkbox{
    width: 40px;
    text-align: center;
  }

.xyn-table-body-stripe.xyn-table-body{
  .xyn-table-tr-stripe{
    background-color: rgba(212, 210, 214, 0.219);
  }
}

.xyn-table-border{
  border: 1px solid rgba(128, 128, 128, 0.192);
  .xyn-table-td{
    border: 1px solid rgba(128, 128, 128, 0.192);
  }

}

</style>