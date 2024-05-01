import { useRef } from 'react'
import { message } from 'antd'
import http from '../request'

const mime: Record<string, string> = {
  '.aac': 'audio/aac',
  '.abw': 'application/x-abiword',
  '.arc': 'application/x-freearc',
  '.avi': 'video/x-msvideo',
  '.azw': 'application/vnd.amazon.ebook',
  '.bin': 'application/octet-stream',
  '.bmp': 'image/bmp',
  '.bz': 'application/x-bzip',
  '.bz2': 'application/x-bzip2',
  '.csh': 'application/x-csh',
  '.css': 'text/css',
  '.csv': 'text/csv',
  '.doc': 'application/msword',
  '.docx': 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  '.eot': 'application/vnd.ms-fontobject',
  '.epub': 'application/epub+zip',
  '.gif': 'image/gif',
  '.htm': 'text/html',
  '.html': 'text/html',
  '.ico': 'image/vnd.microsoft.icon',
  '.ics': 'text/calendar',
  '.jar': 'application/java-archive',
  '.jpeg': 'image/jpeg',
  '.jpg': 'image/jpeg',
  '.js': 'text/javascript',
  '.json': 'application/json',
  '.jsonld': 'application/ld+json',
  '.mp3': 'audio/mpeg',
  '.mpeg': 'video/mpeg',
  '.mpkg': 'application/vnd.apple.installer+xml',
  '.odp': 'application/vnd.oasis.opendocument.presentation',
  '.ods': 'application/vnd.oasis.opendocument.spreadsheet',
  '.odt': 'application/vnd.oasis.opendocument.text',
  '.oga': 'audio/ogg',
  '.ogv': 'video/ogg',
  '.ogx': 'application/ogg',
  '.otf': 'font/otf',
  '.png': 'image/png',
  '.pdf': 'application/pdf',
  '.ppt': 'application/vnd.ms-powerpoint',
  '.pptx': 'application/vnd.openxmlformats-officedocument.presentationml.presentation',
  '.rar': 'application/x-rar-compressed',
  '.rtf': 'application/rtf',
  '.sh': 'application/x-sh',
  '.svg': 'image/svg+xml',
  '.swf': 'application/x-shockwave-flash',
  '.tar': 'application/x-tar',
  '.tif': 'image/tiff',
  '.tiff': 'image/tiff',
  '.ts': 'video/mp2t',
  '.ttf': 'font/ttf',
  '.txt': 'text/plain',
  '.vsd': 'application/vnd.visio',
  '.wav': 'audio/wav',
  '.weba': 'audio/webm',
  '.webm': 'video/webm',
  '.webp': 'image/webp',
  '.woff': 'font/woff',
  '.woff2': 'font/woff2',
  '.xhtml': 'application/xhtml+xml',
  '.xls': 'application/vnd.ms-excel',
  '.xlsx': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
  '.xul': 'application/vnd.mozilla.xul+xml',
  '.zip': 'application/zip',
  '.3gp': 'video/3gpp',
  '.3g2': 'video/3gpp2',
  '.mp4': 'video/mp4',
  '.mov': 'video/quicktime',
  '.MOV': 'video/quicktime',
}

const useOss = (options: any, success?: any) => {
  const ossData = useRef<any>({})
  const readFile = async (files: Blob) => {
    return new Promise((resolve) => {
      const uploadData = new FileReader()
      uploadData.readAsArrayBuffer(files)
      uploadData.onloadend = () => {
        resolve(uploadData.result)
      }
    })
  }

  const UploadToOss = async (file: any) => {
    const format = file.type.split('/')[1]

    const { data } = (await http.post('/media/v1/common/applyUpload', {
      format,
      type: 0,
      appId: options?.appId,
      entryId: options?.entryId,
    })) as any
    const formatFile = (await readFile(file)) as any
    const res = await fetch(data.uploadUrl, {
      headers: data.headers,
      method: 'PUT',
      body: formatFile,
    }).then((res) => res.json())

    if (res.code === 0) {
      return data.accessUrl
    }
    message.error(res.message)
  }

  const handleChange = (info: any) => {
    if (info.file.status === 'uploading') {
      return
    }
    if (info.file.status === 'done') {
      const list = ossData.current.file.split('/')
      info.file.name = list[list.length - 1]
      info.file.thumbUrl = `${ossData.current.oss_url}/${ossData.current.file}`
    }
  }

  const beforeUpload = async (file: any) => {
    const { maxSize = Infinity, accept = [] } = options || {}
    // 支持的图片格式
    const imageTypes = ['jpg', 'jpeg', 'png', 'gif', 'bmp', 'PBG', 'GIF', 'JPG', 'JPEG']
    const _accept: any = []
    accept?.forEach((type: string) => {
      if (Object.keys(mime).includes(type)) {
        _accept.push(mime[type])
      }
      if (Object.values(mime).includes(type)) {
        _accept.push(type)
      }
    })
    // if (file.type.indexOf("image") == -1) {
    //   message.error("只能上传图片");
    //   return Promise.reject();
    // }
    if (_accept?.length && !_accept.includes(file.type)) {
      message.error('不支持此资源格式上传，请重新选择')
      return Promise.reject()
    }
    const isLt2M = file.size / 1024 / 1024 < maxSize
    if (!isLt2M && imageTypes.includes(file.type)) {
      message.error(`图片尺寸不能大于 ${maxSize}MB!`)
      return Promise.reject()
    }
    success && success(false)
  }

  const customRequest = async (file: any) => {
    return UploadToOss(file)
  }

  return {
    beforeUpload,
    onChange: handleChange,
    customRequest,
    url: ossData.current.oss_url,
  }
}

export default useOss
