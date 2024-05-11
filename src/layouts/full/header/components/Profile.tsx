import {
  Avatar,
  Box,
  Button,
  IconButton,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
} from '@mui/material'
import { IconLock, IconUser } from '@tabler/icons'
import { Input, message } from 'antd'
import type { ComponentProps } from 'react'
import { useEffect, useState } from 'react'
import { Router } from 'src/routes/Router'
import { useUserStore } from 'src/store/user'
import AddAndEditModal from '../../../../components/AddAndEditModal/index'
import ChangeAvatar from './ChangeAvatar'

function Profile() {
  const [anchorEl2, setAnchorEl2] = useState(null)

  const [countdown, setCountdown] = useState(0)

  const userStore = useUserStore()

  const handlePopoverOpen = (event: Parameters<NonNullable<ComponentProps<'button'>['onClick']>>) => {
    setAnchorEl2(event.currentTarget)
  }

  const handlePopoverClose = () => {
    setAnchorEl2(null)
  }

  const profileFormItems = [
    {
      label: '昵称',
      name: 'nickname',
      rules: [
        { required: true, message: '请输入昵称' },
      ],
      render: () => <Input allowClear placeholder="请输入昵称" />,
    },
    {
      label: '头像',
      name: 'avatar',
      render: () => <ChangeAvatar />,
    },
  ]

  const resetPasswordFormItems = [
    {
      label: '新密码',
      name: 'password',
      rules: [
        { required: true, message: '请输入新密码' },
      ],
      render: () => <Input allowClear placeholder="请输入新密码" />,
    },
    {
      label: '确认密码',
      name: 'confirmPassword',
      rules: [
        { required: true, message: '请确认密码' },
      ],
      render: () => <Input allowClear placeholder="请确认密码" />,
    },
    {
      label: '验证码',
      name: 'code',
      rules: [
        { required: true, message: '请输入验证码' },
      ],
      render: () => (
        <Input
          allowClear
          placeholder="请输入验证码"
          suffix={(
            <Button onClick={getVerificationCode} disabled={countdown > 0}>
              {countdown > 0 ? `重新发送(${countdown})` : '获取验证码'}
            </Button>
          )}
        />
      ),
    },
  ]

  const getVerificationCode = async () => {
    if (countdown > 0) {
      message.error('请勿重复发送验证码')
      return
    }

    const { data } = await $.get({
      phone: userStore.userInfo.username,
    }, {
      url: 'admin/user/register-smsCode',
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

  const onResetPassword = async (params: any) => {
    try {
      if (params.password !== params.confirmPassword) {
        message.error('两次输入的密码不一致')
        return
      }

      await $.post({
        phone: userStore.userInfo.username,
        code: params.code,
      }, {
        url: '/admin/user/validateSmsCode',
      })

      await $.post({
        username: userStore.userInfo.username,
        password: params.password,
      }, {
        url: '/admin/user/resetPassword',
      })

      Router.replace('/auth/login')

      window.location.reload()
    }
    catch (error: any) {
      error.data && message.error(error.data)
    }
  }

  const onEditProfile = async (params: any) => {
    await $.post(params, {
      url: '/admin/user/update',
    })
    userStore.getUserInfo()
  }

  return (
    <Box>
      <IconButton
        size="large"
        aria-label="show 11 new notifications"
        color="inherit"
        aria-controls="msgs-menu"
        aria-haspopup="true"
        sx={{
          ...(typeof anchorEl2 === 'object' && {
            color: 'primary.main',
          }),
        }}
        onClick={handlePopoverOpen}
      >
        <Avatar
          src={userStore.userInfo.avatar}
          sx={{
            width: 35,
            height: 35,
          }}
        />
      </IconButton>
      <Menu
        id="msgs-menu"
        anchorEl={anchorEl2}
        keepMounted
        open={Boolean(anchorEl2)}
        onClose={handlePopoverClose}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        sx={{
          '& .MuiMenu-paper': {
            width: '200px',
          },
        }}
      >
        <AddAndEditModal title="信息" data={userStore.userInfo} formItems={profileFormItems} onEdit={onEditProfile} onClick={handlePopoverClose}>
          <MenuItem>
            <ListItemIcon>
              <IconUser width={20} />
            </ListItemIcon>
            <ListItemText>修改信息</ListItemText>
          </MenuItem>
        </AddAndEditModal>
        <AddAndEditModal title="密码" formItems={resetPasswordFormItems} onAdd={onResetPassword}>
          <MenuItem>
            <ListItemIcon>
              <IconLock width={20} />
            </ListItemIcon>
            <ListItemText>修改密码</ListItemText>
          </MenuItem>
        </AddAndEditModal>
        <Box mt={1} py={1} px={2}>
          <Button variant="outlined" color="primary" fullWidth onClick={userStore.logout}>
            退出登录
          </Button>
        </Box>
      </Menu>
    </Box>
  )
}

export default Profile
