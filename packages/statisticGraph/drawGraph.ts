import { coordinate,  rgbColor ,font} from "../../types/statisticGraph"

export const drawLine=(ctx,start:coordinate,end:coordinate,randomColor:boolean=false,color:rgbColor=[0,0,0])=>{
  if(randomColor){
    color=[Math.round(Math.random()*255),Math.round(Math.random()*255),Math.round(Math.random()*255)]
  }
  ctx.fillStyle = `rgb(${color[0]},${color[1]},${color[2]})`
  ctx.moveTo(...start)
  ctx.lineTo(...end)
  ctx.stroke()
}

export const drawArrowLine=(ctx,start:coordinate,end:coordinate,randomColor:boolean=false,color:rgbColor=[0,0,0])=>{
  if(randomColor){
    color=[Math.round(Math.random()*255),Math.round(Math.random()*255),Math.round(Math.random()*255)]
  }
  ctx.fillStyle = `rgb(${color[0]},${color[1]},${color[2]})`

  ctx.moveTo(...start)
  ctx.lineTo(...end)
  let arrowAngle=Math.PI/9,arrowLength = 10;
  let angle = Math.atan((end[0]-start[0])/(end[1]-start[1])) 
  
  
  let angle2 = angle+arrowAngle
  let arrowEnd1:coordinate = [end[0]-arrowLength *Math.sin(angle2),end[1]+arrowLength *Math.cos(angle2)]
  let angle3 = -arrowAngle+ angle
  let arrowEnd2:coordinate = [end[0]-arrowLength *Math.sin(angle3),end[1]+arrowLength *Math.cos(angle3)]
  ctx.moveTo(...arrowEnd1)
  ctx.lineTo(...end)
  ctx.moveTo(...arrowEnd2)
  ctx.lineTo(...end)
  ctx.stroke()
}

export const drawBar=(ctx,start:coordinate,width:number,height:number,randomColor:boolean=false,color:rgbColor=[0,0,0])=>{
  if(randomColor){
    color=[Math.round(Math.random()*255),Math.round(Math.random()*255),Math.round(Math.random()*255)]
  }
  ctx.fillStyle = `rgb(${color[0]},${color[1]},${color[2]})`
  ctx.moveTo(...start)
  ctx.fillRect(...start,width,height)
  ctx.stroke()
}

export const drawText=(ctx,start:coordinate,text:string,font:font,correct:[number,number]=[0,0],randomColor:boolean=false,color:rgbColor=[0,0,0])=>{
  //console.log(start);
  
  if(randomColor){
    color=[Math.round(Math.random()*255),Math.round(Math.random()*255),Math.round(Math.random()*255)]
  }
  ctx.fillStyle = `rgb(${color[0]},${color[1]},${color[2]})`
  ctx.font=(font.size?font.size+"px":"20px")+" "+(font.family?font.family:"Times New Roman")
  
  
  ctx.moveTo(...start)
 
  
  ctx.fillText(text,start[0]-ctx.measureText(text).width/2+correct[0],start[1]+correct[1])
  ctx.stroke()
}