import OSS from 'ali-oss'
import { Image, Upload } from 'antd'
import ImgCrop from 'antd-img-crop'
import { useUserStore } from 'src/store/user'

interface Props {
  value?: string
  onChange?: (url: string) => void
}

async function initOSSClient() {
  const { data } = await $.get({}, {
    url: '/user/sts',
  })

  const client = new OSS({
    region: 'oss-cn-chengdu',
    accessKeyId: data.accessKeyId,
    accessKeySecret: data.accessKeySecret,
    stsToken: data.securityToken,
    refreshSTSToken: async () => {
      const { data } = await $.get({}, {
        url: '/user/sts',
      })
      return {
        accessKeyId: data.accessKeyId,
        accessKeySecret: data.accessKeySecret,
        stsToken: data.stsToken,
      }
    },
    refreshSTSTokenInterval: 300000,
    bucket: 'sparkle-cdn',
  })
  return client
}

function ChangeAvatar(props: Props) {
  const { value, onChange } = props

  const userStore = useUserStore()

  const beforeUpload = async (file: File) => {
    const client = await initOSSClient()
    const data = await client.put(`sparkle-admin/admin-avatar/${userStore.userInfo.username}/${file.name}`, file)
    onChange?.(data.url)
  }

  return (
    <ImgCrop>
      <Upload showUploadList={false} beforeUpload={beforeUpload} listType="picture-card" maxCount={1} accept=".png, .jpg, .jpeg">
        <Image src={value || userStore.userInfo.avatar} preview={false}></Image>
      </Upload>
    </ImgCrop>
  )
}

export default ChangeAvatar
