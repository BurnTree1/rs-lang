import React, { useEffect, useState } from 'react';
import "./RegistrationForm.scss"
import { useDispatch, useSelector } from 'react-redux';
import { TextField, Button } from '@material-ui/core';
import InputAdornment from '@material-ui/core/InputAdornment';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import AlternateEmailIcon from '@material-ui/icons/AlternateEmail';
import VpnKeyIcon from '@material-ui/icons/VpnKey';
import AssignmentIndIcon from '@material-ui/icons/AssignmentInd';
import { authIsFailure, createNewUser, updateAuthImage } from '../../../store/reducers/authorizationSlice';

type Props = {
  open: boolean
}

type FormData = {
  email: string,
  name: string,
  password: string,
  image: Blob,
  base64Image: ArrayBuffer | null
}

type ValidationFields = {
  [index: string]: boolean,
  email: boolean,
  name: boolean,
  password: boolean,
  image: boolean
}

const isImageFileInputEmpty = (target: HTMLInputElement) => target.files && target.files.length === 0 && target.files[0] === undefined
const validateInputValue = (value: string, name: string, blob: HTMLInputElement) => {
  switch (name) {
    case "email":
    return !/^\S+@\S+\.\S+$/.test(value);
    case "name":
    return !(value.length > 3)
    case "password":
      return !/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/.test(value)
    case "image":
      return blob!.files![0] && blob!.files![0].size > 512000
    default: return false
  }
}

const RegistrationForm: React.FC<Props> = ({ open }) => {
  const [formData, setFormData] = useState<FormData>({
    email: '',
    name: '',
    password: '',
    image: new Blob(),
    base64Image: null,
  })

  const [validationFields, setValidationFields] = useState<ValidationFields>({
    email: false,
    name: false,
    password: false,
    image: false
  })

  const dispatch = useDispatch()
  const [disabled, setDisabled] = useState<boolean>(false);
  const isFailure = useSelector(authIsFailure);

  useEffect(() => {
    if (!open) {
      setDisabled(false);
      setFormData({
        email: '',
        password: '',
        name: '',
        image: new Blob(),
        base64Image: null
      })
    }
    setValidationFields({
      email: false,
      name: false,
      password: false,
      image: false
    })
  }, [open]);

  useEffect(() => {
    if (isFailure) {
      setDisabled(false);
    }
  }, [isFailure]);

  const onChangeInputValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, name } = e.target;
    const target = e.target as HTMLInputElement

    setValidationFields((prevValidationsFields) => ({
      ...prevValidationsFields,
      [name]: validateInputValue(value, name, target)
    }))

    if (name !== "image") {
      setFormData((prevFormData) => ({
        ...prevFormData,
        [name]: value
      }))
      return
    }
    if (isImageFileInputEmpty(target)) return;

    const imageReader = new FileReader();
    imageReader.readAsDataURL(target!.files![0])
    imageReader.onloadend = () => {
      const base64Image = imageReader.result as ArrayBuffer
      setFormData((prevFormData) => ({
        ...prevFormData,
        image: target!.files![0],
        base64Image
      }))
    }
  }

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (Object.keys(validationFields).every((field) => !validationFields[field])) {
      setDisabled(true);
      const reader = new FileReader();
      reader.readAsDataURL(formData.image);
      reader.onloadend = () => {
        const res: ArrayBuffer = reader.result as ArrayBuffer
        dispatch(updateAuthImage(res))
        dispatch(createNewUser({
          password: formData.password,
          email: formData.email,
          name: formData.name,
          image: formData.image
        }))
      }
    }
  }

  return (
    <div className="formContainer" style ={{
      display: open? "flex": "none"
    }} >
       <div>
        <span>Sign Up</span>
       </div>
      <form onSubmit={onSubmit}>
        <TextField
          name="email"
          required={true}
          error={validationFields.email}
          helperText={validationFields.email ? "Введите корректный e-mail адрес.": ' '}
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
          required={true}
          type="password"
          error={validationFields.password}
          helperText={validationFields.password ? "Пароль должен состоять из латицины. Как минимум 1 заглавная и 1 цифра. ": ' '}
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
        <TextField
          name="name"
          required={true}
          error={validationFields.name}
          helperText={validationFields.name ? "Имя должно состоять как минимум из 3 символов": ' '}
          value={formData.name}
          onChange={onChangeInputValue}
          style={{
            minWidth: "500px"
          }}
          placeholder="Введите ваш username"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <AssignmentIndIcon />
              </InputAdornment>
            ),
          }}
        />
          <TextField
            name="image"
            required={true}
            placeholder="Загрузить аватарку"
            type="file" id="icon-button-file"
            onChange={onChangeInputValue}
            style={{
              opacity: 0,
              position: 'absolute',
              left: '35%'
            }}
          />
          <label htmlFor="icon-button-file">
            <Button
              aria-label="upload picture"
              variant="contained"
              color="primary"
              component="span"
              startIcon={formData.base64Image
                ? (
                  <div className="registrationAvatar">
                    <img  src={(formData.base64Image) as unknown as string} alt="avatar"/>
                  </div>
                )
                : <AccountCircleIcon style={{ fontSize: 80 }}/>} />
          </label>
          <p>{validationFields.image ? "Размер не должен превышать 500Kb": ' '}</p>
        <Button type="submit" color="primary" disabled={disabled} style={{
        }}>Зарегистрироваться</Button>
      </form>
    </div>
  )
}

export default RegistrationForm;

