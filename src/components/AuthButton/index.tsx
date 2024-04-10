import usePowerListStore from '../stores/permission'

const AuthButton = (props: { children: React.ReactElement; code: string; tableContent?: string }) => {
  const buttonList = usePowerListStore((state) => state.permissionInfo?.buttonList) || []
  const isShow = buttonList?.find((it) => it.code === props.code)
  const isRoot = usePowerListStore((state) => state.permissionInfo?.isRoot)

  if (isRoot || isShow) {
    return props.children
  }
  if (props.tableContent) {
    return <span>{props.tableContent}</span>
  }
  return null
}

export default AuthButton
