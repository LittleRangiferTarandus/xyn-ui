

<script lang="tsx">
import { defineComponent } from 'vue'
import TableBodyVue from './TableBody.vue'
import TableHeadVue from './TableHead.vue'
import TableSummaryVue from './TableSummary.vue'

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
    },
    selectType:{
      type:String,
      default:""
    },
    selectBoxShow:{
      type:Boolean,
      default:false
    },
    summary:{
      type:Boolean,
      default:false
    },
    summaryFunction:{
      type:Function,
      default:undefined
    }

  },
  data(){
    let expand:Function|undefined =undefined
    let isExpandRow:Array<boolean>=[]
    let isSelectRow:Array<boolean>=[]
    return{
      option:[],
      expand,
      isExpandRow,
      isSelectRow
    }
  },
  emits:["rowClick"],
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
    },
    selectRow(index:number){

      if(this.selectType==="radio"){
        if(!this.isSelectRow[index]){
          let arr:boolean[] = new Array(this.option.length)
          arr[index]=true
          this.isSelectRow=arr
        }else{
          this.isSelectRow[index]=false
        }

      }else if (this.selectType==="checkbox"){
        this.isSelectRow[index] = !this.isSelectRow[index]
      }
    }
  },
  render:function(h: any){
    return(
      <>
        <table class={["xyn-table",{"xyn-table-border":this.border}]}>
          <TableHeadVue></TableHeadVue>
          <TableBodyVue></TableBodyVue>
          {
            this.summary?
            <TableSummaryVue dataSource={this.dataSource} option={this.option} summaryFunction={this.summaryFunction}></TableSummaryVue>:
            ""
          }
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
@primaryColor:var(--xyn-primary-color);
@primaryBorder:var(--xyn-primary-light-color);
@primaryBackGround:var(--xyn-primary-more-light-color);
.xyn-table{
  
  background-color: white;
  width: 100%;
  box-sizing: border-box;
  border-collapse:collapse;

  .xyn-table-tr{
    border-bottom: 1px solid rgba(128, 128, 128, 0.192);
  }
  .xyn-table-td {
    
    padding: 15px 5px;
  }

}
.xyn-table-stripe{
  .xyn-table-body{
    .xyn-table-tr:nth-of-type(even){
      background-color:@primaryBackGround;
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