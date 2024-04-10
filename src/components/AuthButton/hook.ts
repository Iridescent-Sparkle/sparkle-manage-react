import usePowerListStore from '../../stores/permission'

export function useVerifyAuthority(code: string) {
  const buttonList = usePowerListStore((state) => state.permissionInfo?.buttonList) || []
  const isShow = buttonList?.find((it) => it.code === code)
  const isRoot = usePowerListStore((state) => state.permissionInfo?.isRoot)
  return isRoot || isShow
}
