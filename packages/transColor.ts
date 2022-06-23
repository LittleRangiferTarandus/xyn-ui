import { rgbColor } from "./types/component"

const setColor = (rgb:rgbColor)=>{
  let light:rgbColor=[0,0,0]
  let moreLight:rgbColor=[0,0,0]
  let deep:rgbColor=[255,255,255]
  let moreDeep:rgbColor=[255,255,255]
  rgb.forEach((v:number,i:number)=>{
    let lightFactor = 255-v, deepFactor = v
    light[i]=v+lightFactor/3
    moreLight[i]=v+lightFactor/3*2
    deep[i]=v-deepFactor/3
    moreDeep[i]=v-deepFactor/3*2
  })
  
  
  document.documentElement.style.setProperty("--xyn-primary-color",`rgb(${rgb[0]},${rgb[1]},${rgb[2]})`)
  document.documentElement.style.setProperty("--xyn-primary-light-color",`rgb(${light[0]},${light[1]},${light[2]})`)
  document.documentElement.style.setProperty("--xyn-primary-more-light-color",`rgb(${moreLight[0]},${moreLight[1]},${moreLight[2]})`)
  document.documentElement.style.setProperty("--xyn-primary-deep-color",`rgb(${deep[0]},${deep[1]},${deep[2]})`)
  document.documentElement.style.setProperty("--xyn-primary-more-deep-color",`rgb(${moreDeep[0]},${moreDeep[1]},${moreDeep[2]})`)
}

export const transColor = (theme:string)=>{
  if(theme==="warm"){
    let rgb:rgbColor = [221,140,154]
    setColor(rgb)
  }else if(theme==="cold"){
    let rgb:rgbColor = [64,158,255]
    setColor(rgb)
  }
}