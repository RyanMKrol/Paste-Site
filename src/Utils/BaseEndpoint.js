export default function baseEndpoint() {
  if (process.env.REACT_APP_LOCAL_API !== undefined) {
    return 'http://localhost:8006/api'
  } else {
    return '/api'
  }
}
