module.exports = {
    success: (res, data) => {
        res.status(200).send({
            code: 1,
            data: data,
            msg: 'success'
        })
    },
    error: (res, error) => {
        res.status(200).send({
            code: 0,
            data: null,
            msg: error
        })
    }
}