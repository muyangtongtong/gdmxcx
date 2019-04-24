import wxRequest from '../utils/wxRequest'
import appConfig from '../utils/appConfig'

wxRequest.baseUrl = `${appConfig.HTTP_BAST_URL}`

const intoShowCart = params => {
  return wxRequest('8002/cart/intoShowCart',
    {
      data: {'fixationParameter':
      {
        'memberid': '521',
        'memtype': 0,
        'channeltype': 'A',
        'malorgid': '597',
        'outorgid': '854'
      }
      },
      method: 'POST'
    }).then(res => res.data)
}

export default {
  intoShowCart
}
