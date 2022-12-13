import { Autocomplete, FormControl, InputLabel, MenuItem, Select, TextField } from "@mui/material";
import React, { useState } from "react";
import { CloseEyesIcon, EyesIcon } from "../icons";
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import{ IDateInput, IInputProps, ISelectInput, IAutoComplete, IInputPropsNoFormik } from '../../interface'
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";

export function FormInput({ Icon, type, name, label, formik, info, mb }: IInputProps): JSX.Element {
  let [focus, setFocus] = useState<boolean>(false)
  return (
    <div className={`relative w-full ${!mb && "mb-4"}`}>
        <div 
          onFocus={() => setFocus(true)}
          onBlur={() => setFocus(false)}
          className={`flex justify-between bg-white items-center rounded-xl border border-solid ${focus ? 'border-primary-blue' : formik.touched[name] && formik.errors[name] ? 'border-crimson' : 'border-grey-1000'} py-3 px-5`}>
            <input 
            type={type} 
            name={name} 
            placeholder={label}
            className="w-full" 
            {...formik.getFieldProps(name)}
            /> 
        </div>
        {
          formik.touched[name] && formik.errors[name] ?
          <p className={`absolute text-crimson text-xs px-2 py-0 bg-white -translate-y-3 translate-x-4`}>
            {formik.errors[name]}
          </p>:
          (info ? <span className="text-xs text-black/50"><i className="fa-solid fa-circle-info" /> {info}</span> : null)
        }
    </div>
  );
}

export function FormInput2({ Icon, type, name, label, formik, className }: IInputProps): JSX.Element {
  let [focus, setFocus] = useState<boolean>(false)

  let [password, setPassword] = useState('password')
  let [seePassword, setSeePassword] = useState<boolean>(false)
  return (
    <div className={`relative w-full ${className}`}>
        <div 
          onFocus={() => setFocus(true)}
          onBlur={() => setFocus(false)}
          className={`flex justify-between bg-white items-center rounded-lg border border-solid ${focus ? 'border-primary-blue' : formik.touched[name] && formik.errors[name] ? 'border-crimson' : 'border-grey-1000'} py-3 px-5  text-sm`}>
            <input 
            type={type === 'password' ? password : type} 
            name={name} 
            placeholder={label}
            className="w-full" 
            {...formik.getFieldProps(name)}
            /> 
            {
              type === 'password' ?
              <div onClick={() => {
                  setPassword(state => {
                    if(state === 'password'){
                      return 'text'
                    }
                    else{
                      return 'password'
                    }
                  })
                  setSeePassword(state => !state)
                }}>
                {
                  seePassword ?
                  <EyesIcon size="17" color={focus ? '#1900FE' : formik.touched[name] && formik.errors[name] ? '#FF5000': '#C4C4C4'}/>:
                  <CloseEyesIcon size="17" color={focus ? '#1900FE' : formik.touched[name] && formik.errors[name] ? '#FF5000': '#C4C4C4'}/>
                }
              </div>:
              <>
                {
                  Icon &&
                  <Icon  size='14' color={focus ? '#1900FE' : formik.errors[name] ? '#FF5000': '#C4C4C4'}/>
                }
              </>
            }
        </div>
        {
          formik.touched[name] && formik.errors[name] ?
          <p className={`absolute text-crimson text-xs px-2 py-0 bg-white -translate-y-2 translate-x-3`}>
            {formik.errors[name]}
          </p>:
          null
        }
    </div>
  );
}

export function FormInputNoFormik({ Icon, type, name, label, value, onChange }: IInputPropsNoFormik): JSX.Element {
  let [focus, setFocus] = useState<boolean>(false)
  return (
    <div className="relative w-full">
        <div 
          onFocus={() => setFocus(true)}
          onBlur={() => setFocus(false)}
          className={`flex justify-between bg-white items-center rounded-lg border border-solid ${focus ? 'border-primary-blue' : 'border-grey-1000'} py-3 px-5 mb-4`}>
            <input 
            type={type} 
            name={name} 
            placeholder={label}
            className="w-full" 
            value={value}
            onChange={onChange}
            /> 
        </div>
    </div>
  );
}

export function SelectInput ({ label, data, name, onChange, formik, mb, info }: ISelectInput){
  return(
      <div className={`${!mb && "mb-4"} w-full`}>
          <FormControl fullWidth size="medium">
          <InputLabel id={name}>{label}</InputLabel>
              <Select
                  id={name}
                  displayEmpty
                  name={name}
                  sx={{
                    borderRadius: 3,
                    padding: 0
                  }}
                  {...formik.getFieldProps(name)}
                  label={label}
                  onChange={e => {
                    formik.handleChange(e)
                    if(onChange){
                      onChange(`${e.target.value}`)
                    }
                  }}
                  placeholder={label}
              >
                  {
                    data?.map((d, idx) => <MenuItem value={d.value} key={idx}>{d.label}</MenuItem>)
                  }
              </Select>
          </FormControl>
          {
            formik.touched[name] && formik.errors[name] ?
            <p className={`absolute text-crimson text-xs px-2 py-0 bg-white -translate-y-3 translate-x-4`}>
              {formik.errors[name]}
            </p>:
            (info ? <span className="text-xs text-black/50"><i className="fa-solid fa-circle-info" /> {info}</span> : null)
          }
      </div>
  )
}


export function NativeSelectInput({ name, label, formik, data }:  ISelectInput): JSX.Element {
  let [focus, setFocus] = useState<boolean>(false)
  return (
    <div className="relative w-full">
        <div 
          onFocus={() => setFocus(true)}
          onBlur={() => setFocus(false)}
          className={`flex justify-between bg-white items-center rounded-md border border-solid ${focus ? 'border-primary-blue' : formik?.touched[name] && formik?.errors[name] ? 'border-crimson' : 'border-grey-1000'} py-3 px-2 mb-3`}>
            <select 
              className="w-full"
              name={name}
              {...formik.getFieldProps(name)}>
              <option value="" >{label }</option>
              {
                data?.map((data, idx) => (
                  <option value={data.value} key={idx}>{data.label}</option>
                ))
              }
            </select>
        </div>
        {
          formik.touched[name] && formik.errors[name] ?
          <p className={`absolute text-crimson text-xs px-2 py-0 bg-white -translate-y-7 translate-x-4`}>
            {formik.errors[name]}
          </p>:
          null
        }
    </div>
  );
}

export function AutoComplete ({ label, data, name, onChange, formik, size="large", loading = false, getOptions, defaultValue }: IAutoComplete){
  return(
    <div className="relative mb-4 w-full">
          <FormControl fullWidth size="medium">
            <Autocomplete
              disablePortal
              id={name}
              name={name}
              options={data}
              loading={loading}
              autoSelect
              defaultValue={defaultValue}
              {...formik.getFieldProps(name)}
              onChange={(e, v: any) => {
                formik.handleChange(e)
                if(onChange){
                  onChange(v)
                }
              }}              
              sx={{
                '& fieldset': {
                  borderRadius: 2,
                  borderWidth: 1,
                  borderColor: formik.touched[name] && formik.errors[name] ? '#FF5000' : '#C4C4C4'
                }, 
              }}
              size={size}
              getOptionLabel={getOptions}
              renderInput={(params) => <TextField {...params} placeholder={ label }/>}
            />
          </FormControl>
          {
            formik.touched[name] && formik.errors[name] ?
            <p className={`absolute text-crimson text-xs px-2 py-0 bg-white -translate-y-2 translate-x-3`}>
              {formik.errors[name]}
            </p>:
            null
          }
      </div>
  )
}

export function AutoComplete2 ({ label, data, name, onChange, size="large", loading = false, getOptions, defaultValue }: Omit<IAutoComplete, 'formik'>){
  return(
    <div className="relative mb-4 w-full">
          <FormControl fullWidth size="medium">
            <Autocomplete
              disablePortal
              id={name}
              options={data}
              loading={loading}
              defaultValue={defaultValue}
              onChange={(e, v: any) => {
                if(onChange){
                  onChange(v)
                }
              }}              
              sx={{
                '& fieldset': {
                  borderRadius: 2,
                  borderWidth: 1,
                  borderColor: '#C4C4C4'
                }, 
              }}
              getOptionLabel={getOptions}
              renderInput={(params) => <TextField {...params} placeholder={ label } name={name}/>}
            />
          </FormControl>
      </div>
  )
}

export function DateInput({label, name, formik}: IDateInput){
  const [value, setValue] = React.useState<Date | null>(null);
  return(
    <div className="mb-4 w-full">
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <DatePicker
          label={label}
          value={value}
          onChange={(newValue) => {
            setValue(newValue);
          }}
          disableFuture
          inputFormat="yyyy-MM-dd"
          
          renderInput={(params: any) => <TextField 
            {...params} 
            sx={{borderRadius: 3, width: '100%'}}
            name={name}
            {...formik.getFieldProps(name)}/>}
        />
      </LocalizationProvider>
    </div>
  )
}

export default FormInput;