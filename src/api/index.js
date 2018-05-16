function fetchItem(id){
  const item = {
    name: '123',
    id
  }
  return Promise.resolve(item)
}

export {
  fetchItem
}