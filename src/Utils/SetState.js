export default async function setState(that, newState) {
  return new Promise((resolve, _) => {
    that.setState(newState, resolve())
  })
}
