export function formatDate(date: string){
    let split = date.split("/")
    split = split.reverse()
    return split.join("-")
}

export function validURL(str: string) {
    var pattern = new RegExp('^(https?:\\/\\/)?'+ // protocol
      '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|'+ // domain name
      '((\\d{1,3}\\.){3}\\d{1,3}))'+ // OR ip (v4) address
      '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*'+ // port and path
      '(\\?[;&a-z\\d%_.~+=-]*)?'+ // query string
      '(\\#[-a-z\\d_]*)?$','i'); // fragment locator
    return !!pattern.test(str);
}

export async function verifyLink(url: string){
  try{
    let res = await fetch(url)
    let data = res.json()
    return data
  }
  catch(err){
    console.log(err)
  }
}


export const formatNumber = (number: number | string | undefined) => {
  number = number ? typeof number === 'number' ? number : parseFloat(number) : 0.00
  return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

export function ExtractTwoLetters(name: string){
  let name_in_array = name.split(" ")

  let firstChar = ""
  for(let i = 0; i < name_in_array.length; i++){
    if(i === 2){
      break;
    }
    firstChar += name_in_array[i][0]
  }
  return firstChar
}

export function sliceLongString(str: string){
  if(str.length > 15){
    return str.slice(0, 15)
  }
  return str
}

export const material = [
  'Ankara',
  'bamboo',
  'brocade',
  'chiffon',
  'corduroy',
  'cotton',
  'crepe',
  'damask',
  'denim',
  'fur',
  'jacquard',
  'jersey',
  'lace',
  'leather',
  'linen',
  'lycra',
  'mesh',
  "iron",
  "plastic",
  'metallic',
  "rubber",
  "Stainless steel",
  "silicone",
  "copper",
  "Aluminium",
  "glass",
  "Food",
  "Rice"
]

export const warranty = [
  {value: "null", label: "none"},
  {value: "a day", label: "A Day"},
  {value: "3 months", label: "3 Months"},
  {value: "6 months", label: "6 Months"},
  {value: "1 year", label: "1 Year"}
]

export function loopFormValues(formData: any, obj: any, key?: string){
  if(Array.isArray(obj)){
    for(let i = 0; i < obj.length; i++){
      if(obj === undefined || obj === null){
        continue;
      }
      if(typeof obj === 'object'){
        loopFormValues(formData, obj[i], key + `[${i}]`)
      }
      else{
        formData.append(key + "[]", obj[i]);
      }
    }
  }
  else{
    for (const obj_key in obj) {
      if(Array.isArray(obj[obj_key])){
        loopFormValues(formData, obj[obj_key], obj_key)
      }
      else{
        formData.append(key ? key + `[${obj_key}]` : obj_key, obj[obj_key]);
      }
    }
  }
}

export function formatString(str: string){
  return str.replace(/_/g, " ")
}