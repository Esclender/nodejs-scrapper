const mapping = (obj) => {
  return obj.map((dat) => {
    const mappedObj = {
      ...dat,
      currency: 'S/',
      avaible: {
        days: dat.avaible.split('/')[0].trim(),
        nigths: dat.avaible.split('/')[1].trim()
      }
    }

    return mappedObj
  })
}

const getOfferOBj = async (page, infos, father) => {
  const obj = []

  for (const info of infos) {
    for (let i = 0; i < father.length; i++) {
      let value
      try {
        if (info.array) {
          value = await father[i].locator(info.tag).all()
          value = await Promise.all(value.map(val => {
            return val.textContent()
          }))
        } else if (!info.src) {
          value = await father[i].locator(info.tag).textContent()
        } else {
          value = await info.src(father[i], info.tag)
        }

        obj[i] = {
          ...obj[i],
          [info.attr]: value
        }
      } catch {
        obj[i] = {
          ...obj[i]
        }
      }
    }
  }

  return mapping(obj)
}

module.exports = {
  getOfferOBj
}
