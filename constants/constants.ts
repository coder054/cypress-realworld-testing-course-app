export default {
  ABC: "yes",
}

var twoSum = function (nums, target) {
  const obj = {}
  nums.forEach((item, index) => {
    obj[item] = index
  })

  for (let i = 0; i < nums.length; i++) {
    const item = nums[i]
    const b = target - item
    console.log({ item, b, findd: obj[b] })

    if (obj[b] !== undefined && obj[b] !== i) {
      return [i, obj[b]]
    }
  }

  return [0, 0]
}
twoSum([3, 2, 4], 6)
