
export const getDimension:(arr:Array<any>,d?:number)=>number
  =(arr:Array<any>,d=1)=>{
  if(Array.isArray(arr[0])){
    return getDimension(arr[0],d+1)
  }else{
    return d
  }
}
export const descriptionStatistic:(x:number[])=>DescriptionStatistic=(x:number[])=>{
  let max =-Infinity, min=Infinity,
    mean=0,
    std=0,
    sampleSize=x.length
  x.forEach(v=>{
    if(max<v){
      max=v
    }
    if(min>v){
      min=v
    }
    mean+=v
  })
  mean/=sampleSize

  x.forEach(v=>{
    std+=(mean-v)**2
  })

  std=sampleSize<1?0:(std/(sampleSize-1))**0.5
  let sem = sampleSize<1?0:(std/(sampleSize))
  return{
    max,min,mean,std,sampleSize,sem
  }
}
export type DescriptionStatistic={
  max:number,
  min:number,
  mean:number,
  std:number,
  sampleSize:number,
  sem:number
}
export const descriptionStatisticOfMultiDimensionMatrix=(x:any)=>{
  const dimension = getDimension(x)
  const dataDecriptions:DescriptionStatistic[] = []
  const dfs = (data:any,deep=1)=>{
    if(Array.isArray(data)&&Array.isArray(data[0])){
      data.forEach((value,index)=>{
        dfs(value,deep+1)
      })
    }else{
      dataDecriptions.push(descriptionStatistic(data))
    }
  }
  dfs(x)
  let min=Infinity,max=-Infinity,sampleSize=0,maxStd=-Infinity,maxSem=-Infinity,mean=0
  dataDecriptions.forEach((value,index)=>{
    if(max<value.max){
      max=value.max
    }
    if(min>value.min){
      min=value.min
    }
    if(maxStd<value.std){
      maxStd=value.std
    }
    if(maxSem<value.sem){
      maxSem=value.sem
    }
    mean+=value.mean
    sampleSize+=value.sampleSize
  })
  mean/=sampleSize
  return{
    mean,
    dimension,
    max,
    min,
    sampleSize,
    maxSem,
    maxStd,
    dataDecriptions
  }
}
export type DescriptionStatisticOfMultiDimensionMatrix={
  dimension:number,
  max:number,
  min:number,
  sampleSize:number,
  maxSem:number,
  maxStd:number,
  mean:number,
  dataDecriptions:DescriptionStatistic[]
}
export const  linearRegression=(x:number[],y:number[])=>{
      
  let meanX=0
  let n = x.length
  for(let i=0;i<n;i++){
    meanX+=x[i]
  }
  meanX/=n
  let up=0,down=0
  for(let i=0;i<n;i++){
    up+=y[i]*(x[i]-meanX)
    down+=x[i]**2
  }
  let beta1=up/(down-n*meanX**2)
  let beta0=0
  for(let i=0;i<n;i++){
    beta0+=y[i]-beta1*x[i]
  }
  beta0/=n
  const linear=(x:number)=>{
    return beta0+x*beta1
  }
  linear.inv=(y:number)=>{
    return(y-beta0)/beta1
  }
  
  return linear
}

export const formatNumber=(n:number)=>{
  let nStr =( n+"").split("")
  let toZero = false
  for(let i =0;i<nStr.length;i++){
    if(!toZero&&nStr[i]!=="0"&&nStr[i]!=="."){
      toZero=true
      i+=2
    }
    if(i>=nStr.length){
      break
    }
    if(toZero&&nStr[i]!=="0"&&nStr[i]!=="."){
      nStr[i]="0"
    }
  }
  
  
  return JSON.parse(nStr.join(""))
}