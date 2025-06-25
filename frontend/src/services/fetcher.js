import api from './api'
export default url => api.get(url).then(res => res.data)


