

<script lang="tsx">
import { defineComponent } from 'vue'

export default defineComponent({
  name:"XynTable",
  props:{
    dataSource:{
      type:Array,
      default:[]
    },
    stripe :{
      type:Boolean,
      default:false
    },
    border:{
      type:Boolean,
      default:false
    }
  },
  data(){
    type TableExpand=Function|undefined
    let expand:TableExpand =undefined
    type IsExpandRow=Array<boolean>
    let isExpandRow:IsExpandRow=[]
    return{
      option:[],
      expand,
      isExpandRow
    }
  },
  methods:{
    sortColumn(type:string,prop:string){
      if((this.dataSource[0] as any)[prop] instanceof Number){
        this.dataSource.sort((a:any,b:any)=>{
          return type==="desc"?a[prop]-b[prop]:type==="asc"?b[prop]-a[prop]:0
        })
      }else{
        if(type==="desc"){
          this.dataSource.sort((a:any,b:any)=>{
            return a[prop]<b[prop]?-1:a[prop]>b[prop]?1:0
          })
        }else if(type==="asc"){
          this.dataSource.sort((a:any,b:any)=>{
            return a[prop]<b[prop]?1:a[prop]>b[prop]?-1:0
          })
        }
      }
    },
    expandRow(index:number){
      this.isExpandRow[index] = !this.isExpandRow[index]
    }
  },
  render:function(h: any){
    return(
      <>
        <table class={["xyn-table",{"xyn-table-border":this.border},{".xyn-table-stripe ":this.stripe }]}>
          <thead class="xyn-table-head">
            <tr class="xyn-table-tr">
              {this.expand?<td  class="xyn-table-td-arrow"></td>:""}
              {
                this.option.map((item:any,indexTd:number)=>{
                  return <td class="xyn-table-td" key={indexTd+item}>{
                      item.sortable?<>
                        {item.label}
                        <i class="ri-sort-asc" onClick={()=>this.sortColumn("asc",item.prop)}></i> 
                        <i class="ri-sort-desc" onClick={()=>this.sortColumn("desc",item.prop)}></i> 
                      </>:item.label
                    } </td>
                })
              }
            </tr>
          </thead>
          <tbody class="xyn-table-body">
            {
              this.dataSource.map((v:any,indexTr:number)=>{
                let td = this.option.map((item:any,indexTd:number)=>{
                  return  <td class="xyn-table-td" key={indexTd+item}>{item.render?item.render(v):v[item.prop]}</td>
                })
                return(
                  <>
                    <tr class={['xyn-table-tr']}  key={indexTr}>
                      {this.expand?<td class="xyn-table-td-arrow" onClick={()=>{this.expandRow(indexTr)}}>
                        {this.isExpandRow[indexTr]?<i class="ri-arrow-down-s-line"></i>:<i class="ri-arrow-right-s-line"></i> }
                      </td>:""}
                      {td}
                    </tr>
                    {
                      this.expand?<tr class={['xyn-table-expand',{'xyn-table-expand-active':this.isExpandRow[indexTr]}]}  key={indexTr+"expand"}>
                        <td colspan={this.option.length+1}>
                          <div>
                            {
                              (this.expand  as Function)(v)
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
  
  background-color: white;
  width: 100%;
  box-sizing: border-box;
  border-collapse:collapse;
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
  }
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
}
.xyn-table-stripe{
  .xyn-table-body{
    .xyn-table-tr:nth-of-type(even){
      background-color: rgba(212, 210, 214, 0.219);
    }
  }

}
.xyn-table-border{
  border: 1px solid rgba(128, 128, 128, 0.192);
  .xyn-table-td{
    border: 1px solid rgba(128, 128, 128, 0.192);
  }

}
.xyn-table-column{
  display: none;
}
</style>