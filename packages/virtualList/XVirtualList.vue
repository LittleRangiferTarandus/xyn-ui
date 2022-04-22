

<script lang="tsx">
import { computed, defineComponent, reactive, ref, Ref, toRef } from 'vue'

export default defineComponent({
  name:'XynVirtualList',
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
    let contentHeight = ref((props as any).showHeight*1.5)

    let getData:Function |undefined = (props as any).getData 
    
    let resource = toRef((props as any),"resource")
    let listLength = computed(()=>{
      return resource.value.length
    })
    let scrollWrapper = ref()
    let scrollContent = ref()
    let pageList = ref(resource.value.slice(0,10))
    let timer:any = null

    
    let itemsHeight :number[]= []
    let updateHeight=()=>{
      let items = scrollContent.value.getElementsByClassName("xyn-virtual-list-item")
      let tempContentHeight = 0
      for(let i = 0;i<items.length;i++){
        if(i!==0){
          itemsHeight[startIndex+i-1] = items[i].offsetHeight
        }
        tempContentHeight+=items[i].offsetHeight
      } 
      contentHeight.value=tempContentHeight
    }
    let startIndex = 0,endIndex=0
    let visible:boolean[]=[]
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
          while(sumHeight<scrollTop+(props as any).showHeight){
            sumHeight+=end<itemsHeight.length?itemsHeight[end]:(props as any).estimateItemHeight
            if(sumHeight<scrollTop){
              visible[end]=false
              start++
            }else{
              visible[end]=true
            }
            end++
          }
          startIndex=start
          endIndex=end
          pageList.value = resource.value.slice(start,end+1)
          timer=null
        },(props as any).updateDelay)
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
  render(h:any){
    let self:any=this
    let headerHeight = 0 
    for(let i=0;i<self.visible.length;i++){
      if(!self.visible[i]){
        headerHeight+=self.itemsHeight[i]
      }else{
        break
      }
    }
    return(
      <div
        ref="scrollWrapper"
        class="xyn-virtual-list-wrapper" 
        style={{height: self.showHeight+"px" }}
        onScroll={self.onScroll}
      >
        <div class="xyn-virtual-list-content"  ref="scrollContent"
        style={{height: self.contentHeight+"px"}}>
          <div class="xyn-virtual-list-item" style={{height: headerHeight+"px" }} ></div>
          {
            self.pageList.map((v:any,indexData:number)=>{
              return (
                <>
                  {
                    self.slot?
                    <div class="xyn-virtual-list-item" key={indexData}>
                    {
                      self.slot(v)
                    }
                    </div>:<div class="xyn-virtual-list-item"  key={indexData} style={{height: self.estimateItemHeight+"px"}}>{v}</div>
                  }
                </>
              )
            })
          }
          {
            (self.isEnd&&!self.isLoading)||(!self.isEnd&&self.isLoading)?//排斥或
            self.endSlot?self.endSlot({isEnd:self.isEnd,isLoading:self.isLoading}):
            <div class="xyn-virtual-list-end" style={{height: self.estimateItemHeight+"px" }} >{self.isEnd?"暂无更多":"请稍等"}</div>:""
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