import { IModelRes } from '../../type'
import axios from 'axios'

export const ossPut = async (data: { blobFile: Blob; info: IModelRes<'POST/upload/batch/auth'>['list'][0] }) => {
  const defaultHeaders = {
    ...(data?.info?.oss?.extraInfo?.uploadUrlInfo?.headers || {}),
    ...{ 'Content-Disposition': `attachment; filename=${encodeURIComponent(data?.info?.file_info.file_name)}` },
  }
  return await axios({
    method: 'put',
    url: data?.info?.oss?.extraInfo?.uploadUrlInfo?.uploadUrl,
    data: data.blobFile,
    headers: defaultHeaders,
    timeout: 60 * 1000,
  })
}
