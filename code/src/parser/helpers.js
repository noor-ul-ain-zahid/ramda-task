import {
    indexOf,
    update,
    remove,
    filter,
    propEq,
    reject,
    compose
} from "ramda";

export const edit = (dataSet, oldData, newData) => {
    const index = indexOf(oldData, dataSet)
    const newDataSet = update(index, newData, dataSet)
    return newDataSet
}

export const del = (oldData, data) => {
    const index = indexOf(data, oldData)
    const newData = remove(index, 1, oldData)
    return newData
}

export const notExisting = (data, newData,id) => {
    //console.log(newData.name)
    const existing = filter(propEq('name', newData.name))
    const differentIndex = reject(propEq('id', id))
    const check = compose(differentIndex,existing)(data).length === 0
    return check;
}

export const deleteBooks = (data, type, name) => {
    const newData = reject(propEq(type, name))(data)
    return newData;
}