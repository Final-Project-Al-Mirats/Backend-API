//pagination

const response = (statusCode, data, message, res) => {
    res.json([
        {
            statusCode,
            message,
            data,
        }
    ])
}

module.exports = response