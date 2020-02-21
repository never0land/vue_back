import { isNumber } from "util";

export default{
  filters:{
    numToString(value){
      return value.toString();
    },
    getcol(value){
      return `col-${24/value}`;
      //应对一般的栅格系统
    },
    getcol_element(value){
      console.log(value.typeOf)
      return `${24/num}.`;
      //应对一般的栅格系统
    },
  },
}