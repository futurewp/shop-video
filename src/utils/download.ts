import JSZip from 'jszip'
import FileSaver from 'file-saver'
import { Toast } from 'vant'
const getFile:any = (fileUrl:any) => {
  if (!fileUrl) {
    return
  }
  return new Promise((resolve:any) => {
    const xhr = new XMLHttpRequest()
    xhr.open('GET', fileUrl, true)
    xhr.responseType = 'blob'
    // xhr.responseType = 'arraybuffer'
    xhr.send()
    xhr.onload = e => {
      if (!e) {
        Toast('文件加载失败')
        return
      }
      if (xhr.status === 200) {
        // var urlObject = window.URL.createObjectURL(xhr.response)
        // console.log(urlObject)
        resolve(xhr.response)
      } else {
        Toast('文件加载失败')
      }
    }
    xhr.onerror = () => {
      Toast('文件加载失败')
    }
  })
}
const getFileName:any = (fileUrl:any) => {
  const arrName = fileUrl.split('/')
  const fileName = arrName[arrName.length - 1]
  return fileName
}
const downLoadOne:any = async (fileUrl:any, fileName:any) => {
  const loading =  Toast.loading({
    duration: 0,
    forbidClick: true,
    message: '资源下载中...',
  } )
  try {
    const fileData:any = await getFile( fileUrl )
    let dataName = fileName
    if (!dataName) {
      dataName = getFileName(fileUrl)
    }
    loading.clear()
    FileSaver.saveAs(fileData, dataName)
  } catch (error) {
    loading.clear()
  }
}
const downLoadZip:any = (array:any, zipName:any) => {
  const loading =  Toast.loading({
    duration: 0,
    forbidClick: true,
    message: '资源下载中...',
  })
  const data = array
  const zip = new JSZip()
  const cache:any = {}
  const promises:any = []
  data.forEach((item:any) => {
    const promise = getFile(item).then((data:any) => {
      // 下载文件, 并存成ArrayBuffer对象
      const fileName = getFileName(item)
      zip.file(fileName, data, { binary: true })
      cache[fileName] = data
    })
    promises.push(promise)
  })
  Promise.all(promises).then(() => {
    loading.clear()
    zip.generateAsync({ type: 'blob' }).then((content:any) => { // 生成二进制流
      FileSaver.saveAs(content, zipName)
    })
  }).catch(() => {
    loading.clear()
  })
}
const downLoadFile = (data:any, fileName:any) => {
  if (!data) {
    return
  }
  if (typeof data === 'string') {
    downLoadOne(data, fileName)
  } else {
    downLoadZip(data, fileName)
  }
}
export default downLoadFile
