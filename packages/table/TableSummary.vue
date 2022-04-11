

<script lang="tsx">
import { defineComponent } from 'vue'

export default defineComponent({
  name:"TableSummary",
  props:{
    dataSource:{
      type:Array,
      default:[]
    },
    option:{
      type:Array,
      default:[]
    },
    summaryFunction:{
      type:Function,
      default:undefined
    }
  },
  computed:{
    isSelectable(){
      const parent = this.$parent
      return (parent?.$props as any ).selectBoxShow&&((parent?.$props as any).selectType==="checkbox"||(parent?.$props as any).selectType==="radio")
    },
    isExpandable(){
      const parent = this.$parent
      return (parent?.$data as any).expand instanceof Function
    }
  },
  data(){
    let summaryData:any={}
    return{
      summaryData
    }
  },
  methods:{
    updateData(){
      
      let tempData:any={}
      this.dataSource?.forEach((row:any,rowIndex:number)=>{
        this.option?.forEach((column:any,columnIndex:number)=>{
          if(tempData[column.label]===undefined){
            tempData[column.label]=[]
          }
          tempData[column.label].push(row[column.label])
        })
      })
      this.summaryData=tempData
    }
  },
  mounted(){
    this.updateData()
  },
  watch:{
    dataSource:{
      
      handler(){
        this.updateData()
      },
      deep:true
    },
    option:{
      
      handler(){
        this.updateData()
      },
      deep:true
    }
  },
  render:function(h: any){
    return(
      <>
        <tfoot class="xyn-table-summary">
            <tr class="xyn-table-tr">
            
            {
              this.isSelectable?<td class="xyn-table-td-checkbox"></td>:""
            }
            {
              this.isExpandable?<td class="xyn-table-td-arrow"></td>:""
            }
            {
              Object.keys(this.summaryData).map((item:string,indexTd:number)=>{
                if(this.summaryFunction!==undefined){
                  return <td class="xyn-table-td" key={indexTd+item}>{this.summaryFunction(item,this.summaryData[item])}</td>
                }

                if(indexTd===0){
                  return <td class="xyn-table-td" key={indexTd+item}>合计</td>
                }
                return <td class="xyn-table-td" key={indexTd+item}>
                {
                  this.summaryData[item]
                }
                </td>
              })
              }
            </tr>
          </tfoot>
      </>
    )
  }
})
 
</script>


<style lang="less" scoped>
.xyn-table-summary{
  background-color: rgba(37, 66, 96, 0.122);
  .xyn-table-td *{
    vertical-align :middle;
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
  .xyn-table-td{
    border: 1px solid rgba(128, 128, 128, 0.192);
  }

}
</style>