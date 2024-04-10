import { IModelRes } from '../type/admin'
import { create } from 'zustand'

interface PowerState {
  permissionInfo: IModelRes<'GET/uaa/v1/permission/current/user'>
  setPower: (info: IModelRes<'GET/uaa/v1/permission/current/user'>) => void
}

const usePowerListStore = create<PowerState>()((set) => ({
  permissionInfo: null,
  setPower: (permissionInfo: IModelRes<'GET/uaa/v1/permission/current/user'>) => set(() => ({ permissionInfo })),
}))

export default usePowerListStore
