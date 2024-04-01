import { Box, Button, Typography } from '@mui/material'
import { Link } from 'react-router-dom'

import { Stack } from '@mui/system'
import CustomTextField from '../../../components/forms/theme-elements/CustomTextField'
import { useEffect, useRef, useState } from 'react';

function AuthRegister({ title, subtitle, subtext }) {
	const [countdown, setCountdown] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  /* 获取验证码 */
  const LoginLgnore =(value)=>{
    console.log(121);
    
  }
  const GetVerificationCode = () => {
		const RealNumber = inputRef.current?.value;
			LoginLgnore(RealNumber);
			if (countdown === 0) {
				// 开始倒计时
				setCountdown(60);
				// 这里添加发送验证码的代码
			}
	};
	// 每秒检查倒计时是否应该结束
	useEffect(() => {
		let timer: any;
		if (countdown > 0) {
			timer = setTimeout(() => {
				setCountdown(countdown - 1);
			}, 1000);
		}
		return () => clearTimeout(timer); // 清除定时器
	}, [countdown]);
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
          <CustomTextField id="phone" variant="outlined" fullWidth />

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
          <CustomTextField id="password" variant="outlined" fullWidth />

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
          <CustomTextField id="repeatPassword" variant="outlined" fullWidth />

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
            <CustomTextField id="captcha" variant="outlined" fullWidth />
            <Button onClick={GetVerificationCode} disabled={countdown > 0}>
									{countdown > 0 ? `重新发送(${countdown})` : '获取验证码'}
						</Button>
          </Box>
        </Stack>
        <Button color="primary" variant="contained" size="large" fullWidth component={Link} to="/auth/login">
          注册
        </Button>
      </Box>
      {subtitle}
    </>
  )
}

export default AuthRegister
