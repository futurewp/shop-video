export function loadScript (url: string) {
  return new Promise<void>((resolve: any) => {
    if (document.head.querySelector(`script[src="${url}"]`))
      return resolve()

    const script = document.createElement('script')
    script.src = url
    script.onload = () => resolve()
    document.head.appendChild(script)
  })
}

export function loadImg (url: string, target = 'path') {
  if (!url) return url
  let result
  let path = url
  if (url.substring(0, 4) !== 'http' && url.indexOf('data:image') < 0) {
    path = `static/images${url.substring(0, 1) === '/' ? url : '/' + url }`
  }

  switch (true) {
    case target === 'img':
      result = document.createElement('img')
      result.src = path
      break
    default:
      result = path
      break
  }
  return result
}
