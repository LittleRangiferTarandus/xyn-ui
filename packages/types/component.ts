export interface RadioGroup{
  setSelect:Function,
  getSelect:Function
}

export interface CheckboxGroup{
  setSelect:Function,
  getSelect:Function,
  addSelect:Function
}

export interface Rule{
  verify:Function|RegExp,
  error:string
}