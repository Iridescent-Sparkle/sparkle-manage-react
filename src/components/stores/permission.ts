import { create } from 'zustand'
import type { IModelRes } from '../type/admin'

interface PowerState {
  permissionInfo: IModelRes<'GET/uaa/v1/permission/current/user'>
  setPower: (info: IModelRes<'GET/uaa/v1/permission/current/user'>) => void
}

const usePowerListStore = create<PowerState>()(set => ({
  permissionInfo: null,
  setPower: (permissionInfo: IModelRes<'GET/uaa/v1/permission/current/user'>) => set(() => ({ permissionInfo })),
}))

export default usePowerListStore
