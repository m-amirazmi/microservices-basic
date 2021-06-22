const fs = require('fs')
const { v4: uuidV4 } = require('uuid')
const { arrangeRetails } = require('../utils/retails')

exports.readAllRetails = (req, res) => {
    const fetchRawRetails = fs.readFileSync('retail_list.json')
    const parsedRetails = JSON.parse(fetchRawRetails)

    const retails = arrangeRetails(parsedRetails)
    const totalRetails = retails.length

    const data = {
        total: totalRetails,
        lists: retails
    }

    return res.status(200).json({ message: 'OK', data })
}

exports.readOneRetail = (req, res) => {
    const id = req.params.id
    const fetchRawRetails = fs.readFileSync('retail_list.json')
    const parsedRetails = JSON.parse(fetchRawRetails)

    const retails = arrangeRetails(parsedRetails)
    const selected = retails.find((retail) => retail.id === id)

    const data = {
        retail: selected
    }

    return res.status(200).json({ message: 'OK', data })
}

exports.createNewRetail = async (req, res) => {
    const { name, phone } = req.body

    const fetchRawRetails = fs.readFileSync('retail_list.json')
    const parsedRetails = JSON.parse(fetchRawRetails)

    const retails = await arrangeRetails(parsedRetails)

    const newRetail = {
        name,
        phone,
        id: uuidV4()
    }
    retails.push(newRetail)

    fs.writeFileSync('retail_list.json', JSON.stringify(retails))
    res.status(201).json({ message: '201 Created' })
}

exports.editRetail = async (req, res) => {
    const { id } = req.params
    const { name, phone } = req.body

    const fetchRawRetails = fs.readFileSync('retail_list.json')
    const parsedRetails = JSON.parse(fetchRawRetails)

    const retails = await arrangeRetails(parsedRetails)
    const selected = retails.find((retail) => retail.id === id)

    if (!!name) selected.name = name
    if (!!phone) selected.phone = phone

    const filteredOutRetail = retails.filter((retail) => retail.id !== id)
    filteredOutRetail.push(selected)

    fs.writeFileSync('retail_list.json', JSON.stringify(filteredOutRetail))
    res.status(204).json({ message: '204 Updated' })
}

exports.deleteRetail = async (req, res) => {
    const { id } = req.params

    const fetchRawRetails = fs.readFileSync('retail_list.json')
    const parsedRetails = JSON.parse(fetchRawRetails)

    const retails = await arrangeRetails(parsedRetails)
    const selected = retails.find((retail) => retail.id === id)

    const filteredOutRetail = retails.filter((retail) => retail.id !== id)
    fs.writeFileSync('retail_list.json', JSON.stringify(filteredOutRetail))
    res.status(200).json({ message: '200 Deleted' })
}