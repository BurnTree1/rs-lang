import React, { useEffect, useState } from 'react';
import './LoginForm.scss'
import { Button, TextField } from '@material-ui/core';
import InputAdornment from '@material-ui/core/InputAdornment';
import AlternateEmailIcon from '@material-ui/icons/AlternateEmail';
import VpnKeyIcon from '@material-ui/icons/VpnKey';
import { useDispatch } from 'react-redux';
import {  signInUser, updateSignInSuccessfullyStatus } from '../../../store/reducers/authorizationSlice';

type Props = {
  open: boolean
  isSignInSuccessfully: boolean
}

const LoginForm: React.FC<Props> = ({ open, isSignInSuccessfully }) => {

  const [formData, setFormData] = useState({
    email: '',
    password: ''
  })
  const dispatch = useDispatch();

 const onChangeInputValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      [e.target.name]: e.target.value
    }))
 }

 const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
   e.preventDefault()
    dispatch(signInUser(formData))
 }

  useEffect(() => {
    if (!open) {
      setFormData({
        email: '',
        password: ''
      })
      dispatch(updateSignInSuccessfullyStatus())
    }
  }, [open, dispatch])

  return (
    <div className="formContainerLogIn" style={{
      display: open? "flex": "none"
    }}>
      <div>
        <span>Sign In</span>
      </div>
      <form onSubmit={onSubmit}>
        <TextField
          name="email"
          value={formData.email}
          onChange={onChangeInputValue}
          style={{
            minWidth: "500px"
          }}
          placeholder="Введите ваш e-mail"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <AlternateEmailIcon />
              </InputAdornment>
            ),
          }}
        />
        <TextField
          name="password"
          value={formData.password}
          onChange={onChangeInputValue}
          style={{
            minWidth: "500px"
          }}
          placeholder="Введите ваш пароль"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <VpnKeyIcon />
              </InputAdornment>
            ),
          }}
        />
        <p>{ isSignInSuccessfully ? '' : "Проверьте правильность введеных данных"}</p>
        <Button type="submit" color="primary" style={{
        }}>Войти</Button>
      </form>
    </div>
  )
}

export default LoginForm

