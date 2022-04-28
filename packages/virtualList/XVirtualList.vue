

<script lang="tsx">
 
import { computed, defineComponent, watch, ref, Ref, toRef } from 'vue'

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

 


    let getData:Function |undefined = props.getData 
    
    let resource = toRef(props,"resource")
    let listLength = computed(()=>{
      return resource.value.length
    })
    let scrollWrapper = ref()
    let scrollContent = ref()
    const contentItem:Ref<any[]>=ref([])
    const contentItemCollection = (el:any) => {
      if(el){
        contentItem.value.push(el)
      }
    }
    let pageList = ref(resource.value.slice(0,Math.ceil(props.showHeight/props.estimateItemHeight)+10))
    let timer: any = null

    
    let itemsHeight: number[] = []
    let updateHeight=()=>{
      let items = contentItem.value
      for(let i = 0;i<items.length;i++){
        itemsHeight[startIndex+i] = items[i].offsetHeight
      }
      
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
          while(sumHeight<=scrollTop+props.showHeight){
            sumHeight+=end<itemsHeight.length?itemsHeight[end]:props.estimateItemHeight
            
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
          endIndex=end+10
          
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
      visible,
      itemsHeight,
      endSlot, 
      contentItemCollection
    }
  },
  render(h: any){
    let headerHeight = 0 
    for(let i=0;i<this.visible.length;i++){
      if(this.visible[i]===false){
        headerHeight+=this.itemsHeight[i]
      }else{
        break
      }
    }
    
    return(
      <div
        ref="scrollWrapper"
        class="xyn-virtual-list-wrapper" 
        style={{height: this.showHeight+"px" }}
        onScroll={this.onScroll}
      >
        <div class="xyn-virtual-list-content"  ref="scrollContent"
        style={{minHeight: this.showHeight*2+"px",paddingTop: headerHeight+"px"}}> 
          {
            this.pageList.map((v:any,indexData:number)=>{
              return (
                <>
                  {
                    this.slot?
                    <div class="xyn-virtual-list-item" key={indexData} ref={this.contentItemCollection}>
                    {
                      this.slot(v)
                    }
                    </div>:
                    <div class="xyn-virtual-list-item"  key={indexData} style={{height: this.estimateItemHeight+"px"}} ref={this.contentItemCollection}>
                      {v}
                    </div>
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