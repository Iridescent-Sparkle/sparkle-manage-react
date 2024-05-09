import {
  Box,
  Button,
  Stack,
  Typography,
} from '@mui/material'
import { message } from 'antd'
import type { ReactNode } from 'react'
import { Fragment, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useUserStore } from 'src/store/user'
import CustomTextField from '../../../components/Forms/theme-elements/CustomTextField'

function AuthLogin({ subtitle }: { subtitle: ReactNode }) {
  const navigate = useNavigate()

  const userStore = useUserStore()

  const [passWord, setPassword] = useState('')

  const [phone, setPhone] = useState('')

  const submit = async () => {
    try {
      await userStore.login({
        username: phone,
        password: passWord,
      })

      await userStore.getUserInfo()

      message.success('登录成功')

      navigate({
        pathname: '/',
      }, {
        replace: true,
      })
    }
    catch (error: any) {
      error.data && message.error(error.data)
    }
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
    <Fragment>
      <Typography fontWeight="700" variant="h2" mb={1} align="center">
        登录
      </Typography>
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
            placeholder="请输入手机号"
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
            placeholder="请输入密码"
          />
        </Box>
        <Stack
          justifyContent="space-between"
          direction="row"
          alignItems="center"
          my={2}
        >
          {/* <FormGroup>
            <FormControlLabel
              control={<Checkbox defaultChecked />}
              label="记住密码"
            />
          </FormGroup>
          <Typography
            fontWeight="500"
            sx={{
              textDecoration: 'none',
              color: 'primary.main',
            }}
          >
            忘记密码 ?
          </Typography> */}
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
    </Fragment>
  )
}

export default AuthLogin
