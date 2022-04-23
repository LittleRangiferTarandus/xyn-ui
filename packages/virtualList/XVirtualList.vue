

<script lang="tsx">
import { computed, defineComponent, reactive, ref, Ref, toRef } from 'vue'

export default defineComponent({
  name:'XYNVirtualList',
  props:{
    getData:{
      type:Function,
      default:undefined
    },
    estimateItemHeight:{
      type:Number,
      default:50
    },
    resource:{
      type:Array,
      default:[]
    },
    showHeight:{
      default:400,
      type:Number
    },
    updateDelay:{
      type:Number,
      default:250
    },
    isEnd:{
      type:Boolean,
      default:false
    },
    isLoading:{
      type:Boolean,
      default:false
    }
  },
  setup(props,context) {
    let slot = context.slots.default?context.slots.default:undefined
    let endSlot = context.slots.end?context.slots.end:undefined

 
    let contentHeight = ref(props.estimateItemHeight*10)

    let getData:Function |undefined = props.getData 
    
    let resource = toRef(props,"resource")
    let listLength = computed(()=>{
      return resource.value.length
    })
    let scrollWrapper = ref()
    let scrollContent = ref()
    let pageList = ref(resource.value.slice(0,10))
    let timer: NodeJS.Timeout|null = null

    
    let itemsHeight: number[] = []
    let updateHeight=()=>{
      let items = scrollContent.value.getElementsByClassName("xyn-virtual-list-item")
      let tempContentHeight = 0
      for(let i = 0;i<items.length;i++){
        if(i!==0){
          itemsHeight[startIndex+i-1] = items[i].offsetHeight
        }
        tempContentHeight+=items[i].offsetHeight
      } 
      contentHeight.value=Math.max(contentHeight.value,tempContentHeight)
    }
    let startIndex = 0,endIndex=0
    let visible: boolean[]=[]
    let onScroll = ()=>{
      if(!timer){
        timer=setTimeout(()=>{
          if(listLength.value>=endIndex){
            if(getData){
              getData()
            }
          }
          let scrollTop:number = scrollWrapper.value.scrollTop
          updateHeight()
          let sumHeight = 0,end=0,start = 0
          while(sumHeight<scrollTop+props.showHeight){
            sumHeight+=start<itemsHeight.length?itemsHeight[end]:props.estimateItemHeight
            
            if(sumHeight<scrollTop){
              if(end-10>=0){
                visible[end-10]=false
              }
              
              start++
            }else{
              if(end-10>=0){
                visible[end-10]=true
              }
            }
            end++
          }
          startIndex=Math.max(0,start-10)
          endIndex=Math.ceil(end/10)*10+10
          
          pageList.value = resource.value.slice(startIndex,endIndex)
          timer=null
        },props.updateDelay)
      }
    } 
    return{ 
      pageList,
      onScroll,
      scrollWrapper,
      slot,
      scrollContent,
      contentHeight,
      visible,
      itemsHeight,
      endSlot
    }
  },
  render(h: any){
    let headerHeight = 0 
    for(let i=0;i<this.visible.length;i++){
      if(!this.visible[i]){
        headerHeight+=this.itemsHeight[i]
      }else{
        break
      }
    }
    console.log(this.visible);
    return(
      <div
        ref="scrollWrapper"
        class="xyn-virtual-list-wrapper" 
        style={{height: this.showHeight+"px" }}
        onScroll={this.onScroll}
      >
        <div class="xyn-virtual-list-content"  ref="scrollContent"
        style={{height: this.contentHeight+"px"}}>
          <div class="xyn-virtual-list-item" style={{height: headerHeight+"px" }} ></div>
          {
            this.pageList.map((v:any,indexData:number)=>{
              return (
                <>
                  {
                    this.slot?
                    <div class="xyn-virtual-list-item" key={indexData}>
                    {
                      this.slot(v)
                    }
                    </div>:<div class="xyn-virtual-list-item"  key={indexData} style={{height: this.estimateItemHeight+"px"}}>{v}</div>
                  }
                </>
              )
            })
          }
          {
            (this.isEnd&&!this.isLoading)||(!this.isEnd&&this.isLoading)?
            this.endSlot?this.endSlot({isEnd:this.isEnd,isLoading:this.isLoading}):
            <div class="xyn-virtual-list-end" style={{height: this.estimateItemHeight+"px" }} >{this.isEnd?"暂无更多":"请稍等"}</div>:""
          }
        </div>
      </div>
    )
  } 
})
</script>

<style lang="less" scoped>
.xyn-virtual-list-wrapper{
  overflow: auto;
}
</style>