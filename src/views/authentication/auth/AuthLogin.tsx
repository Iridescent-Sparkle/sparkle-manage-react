import {
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  FormGroup,
  Stack,
  Typography,
} from '@mui/material'
import { Link } from 'react-router-dom'

import { useState } from 'react'
import CustomTextField from '../../../components/forms/theme-elements/CustomTextField'

function AuthLogin({ title, subtitle, subtext }) {
  const [passWord, setPassword] = useState('')
  const [phone, setPhone] = useState('')
  const submit = async () => {
    console.log(passWord, phone)
    const a = await $.post({
      username: phone,
      password: passWord,
    }, {
      url: '/admin/user/admin/login',
    })
    console.log(a, '121')
  }
  /* 密码 */
  const ChangePassWord = (value: any) => {
    setPassword(value.target.value)
  }
  /* 账号 */
  const ChangePhone = (value: any) => {
    setPhone(value.target.value)
  }
  return (
    <>
      {title
        ? (
          <Typography fontWeight="700" variant="h2" mb={1}>
            {title}
          </Typography>
          )
        : null}

      {subtext}

      <Stack>
        <Box>
          <Typography
            variant="subtitle1"
            fontWeight={600}
            component="label"
            htmlFor="phone"
            mb="5px"
          >
            手机号
          </Typography>
          <CustomTextField
            id="phone"
            onChange={(value: any) => ChangePhone(value)}
            variant="outlined"
            fullWidth
          />
        </Box>
        <Box mt="25px">
          <Typography
            variant="subtitle1"
            fontWeight={600}
            component="label"
            htmlFor="password"
            mb="5px"
          >
            密码
          </Typography>
          <CustomTextField
            id="password"
            onChange={(value: any) => ChangePassWord(value)}
            type="password"
            variant="outlined"
            fullWidth
          />
        </Box>
        <Stack
          justifyContent="space-between"
          direction="row"
          alignItems="center"
          my={2}
        >
          <FormGroup>
            <FormControlLabel
              control={<Checkbox defaultChecked />}
              label="记住密码"
            />
          </FormGroup>
          <Typography
            component={Link}
            to="/"
            fontWeight="500"
            sx={{
              textDecoration: 'none',
              color: 'primary.main',
            }}
          >
            忘记密码 ?
          </Typography>
        </Stack>
      </Stack>
      <Box>
        <Button
          color="primary"
          variant="contained"
          size="large"
          fullWidth
          type="submit"
          onClick={() => submit()}
        >
          登录
        </Button>
      </Box>
      {subtitle}
    </>
  )
}

export default AuthLogin
