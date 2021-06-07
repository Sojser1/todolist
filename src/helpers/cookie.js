export const getCookie = (name) => {
  let matches = window.document.cookie.match(
    new RegExp(
      '(?:^|; )' +
        name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') +
        '=([^;]*)'
    )
  )
  return matches ? decodeURIComponent(matches[1]) : undefined
}

export const deleteCookie = (name) => {
  window.document.cookie = `${name}=`
}
