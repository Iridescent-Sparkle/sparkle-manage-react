import { Box, Button, Typography } from '@mui/material'
import { Stack } from '@mui/system'
import { message } from 'antd'
import type { ComponentProps } from 'react'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useUserStore } from 'src/store/user'
import CustomTextField from '../../../components/forms/theme-elements/CustomTextField'

function AuthRegister({ subtitle }) {
  const userStore = useUserStore()

  const navigate = useNavigate()

  const [countdown, setCountdown] = useState(0)

  const [phone, setPhone] = useState('')

  const [password, setPassword] = useState('')

  const [confirmPassword, setConfirmPassword] = useState('')

  const [captcha, setCaptcha] = useState('')

  /* 获取验证码 */
  const GetVerificationCode = async () => {
    if (!phone)
      return message.error('请输入手机号')

    const { data } = await $.get({
      phone,
    }, {
      url: '/admin/user/register-smsCode',
    })

    setCountdown(data.countDown)
  }

  useEffect(() => {
    let timer: number
    if (countdown > 0) {
      timer = setTimeout(() => {
        setCountdown(countdown - 1)
      }, 1000)
    }
    return () => clearTimeout(timer) // 清除定时器
  }, [countdown])

  const submit = async () => {
    if (!captcha)
      return message.warning('请输入验证码')

    if (!phone)
      return message.warning('请输入手机号')

    if (!password)
      return message.warning('请输入密码')

    if (!confirmPassword)
      return message.warning('请确认密码')

    if (password !== confirmPassword)
      return message.warning('两次输入的密码不一致')

    await userStore.register({
      username: phone,
      password,
      captcha,
    })

    message.success('注册成功')

    navigate({
      pathname: '/auth/login',
    }, {
      replace: true,
    })
  }

  return (
    <>
      <Typography fontWeight="700" variant="h2" mb={1} align="center">
        注册
      </Typography>
      <Box>
        <Stack mb={3}>
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
            variant="outlined"
            fullWidth
            onChange={(event: Parameters<
              NonNullable<ComponentProps<'input'>['onChange']>
            >[0]) => {
              setPhone(event.target.value)
              return event
            }}
            placeholder="请输入手机号"
          />

          <Typography
            variant="subtitle1"
            fontWeight={600}
            component="label"
            htmlFor="password"
            mb="5px"
            mt="25px"

          >
            密码
          </Typography>
          <CustomTextField
            id="password"
            variant="outlined"
            fullWidth
            onChange={(event: Parameters<
              NonNullable<ComponentProps<'input'>['onChange']>
            >[0]) => {
              setPassword(event.target.value)
              return event
            }}
            placeholder="请输入密码"
          />

          <Typography
            variant="subtitle1"
            fontWeight={600}
            component="label"
            htmlFor="repeatPassword"
            mb="5px"
            mt="25px"
          >
            再次输入密码
          </Typography>
          <CustomTextField
            id="repeatPassword"
            variant="outlined"
            fullWidth
            onChange={(event: Parameters<
              NonNullable<ComponentProps<'input'>['onChange']>
            >[0]) => {
              setConfirmPassword(event.target.value)
              return event
            }}
            placeholder="请再次输入密码"
          />

          <Typography
            variant="subtitle1"
            fontWeight={600}
            component="label"
            htmlFor="captcha"
            mb="5px"
            mt="25px"
          >
            验证码
          </Typography>
          <Box
            sx={{
              display: 'flex',
              direction: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              mt: 3,
            }}
          >
            <CustomTextField
              id="captcha"
              variant="outlined"
              sx={{ flex: 1 }}
              onChange={(event: Parameters<
                NonNullable<ComponentProps<'input'>['onChange']>
              >[0]) => {
                setCaptcha(event.target.value)
                return event
              }}
              placeholder="请输入验证码"
            />
            <Button onClick={GetVerificationCode} disabled={countdown > 0}>
              {countdown > 0 ? `重新发送(${countdown})` : '获取验证码'}
            </Button>
          </Box>
        </Stack>
        <Button
          color="primary"
          variant="contained"
          size="large"
          fullWidth
          type="submit"
          onClick={() => submit()}
        >
          注册
        </Button>
      </Box>
      {subtitle}
    </>
  )
}

export default AuthRegister
