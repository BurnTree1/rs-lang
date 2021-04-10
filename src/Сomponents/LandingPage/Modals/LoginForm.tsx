import React, { useEffect, useState } from 'react';
import './LoginForm.scss'
import { Button, TextField } from '@material-ui/core';
import InputAdornment from '@material-ui/core/InputAdornment';
import AlternateEmailIcon from '@material-ui/icons/AlternateEmail';
import VpnKeyIcon from '@material-ui/icons/VpnKey';
import { useDispatch, useSelector } from 'react-redux';
import { signInUser, authIsFailure, resetFailure } from '../../../store/reducers/authorizationSlice';

type Props = {
  open: boolean
  isSignInSuccessfully: boolean
}

const LoginForm: React.FC<Props> = ({ open, isSignInSuccessfully }) => {

  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const [disabled, setDisabled] = useState<boolean>(false);
  const dispatch = useDispatch();

  const isFailure = useSelector(authIsFailure)

 const onChangeInputValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      [e.target.name]: e.target.value
    }))
 }

 const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setDisabled(true);
    dispatch(signInUser(formData))
 }

  useEffect(() => {
    if (!open) {
      setFormData({
        email: '',
        password: ''
      });
      setDisabled(false);
      dispatch(resetFailure())
    }
  }, [open])

  useEffect(() => {
    if (isFailure) {
      setDisabled(false);
    }
  }, [isFailure]);

  return (
    <div className="formContainerLogIn" style={{
      display: open? "flex": "none"
    }}>
      <div>
        <span>Вход</span>
      </div>
      <form onSubmit={onSubmit}>
        <TextField
          name="email"
          required={true}
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
          type="password"
          required={true}
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
        { isFailure ? <p>Неправильный логин или пароль</p> : <p/>}
        <Button type="submit" color="primary" disabled={disabled}>Войти</Button>
      </form>
    </div>
  )
}

export default LoginForm

