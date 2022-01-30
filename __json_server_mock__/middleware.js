/*在写nodejs，我们需要按照Commonjs的一套规范来走*/

module.exports = (req, res, next) =>{
    if(req.method === 'POST' && req.path === '/login') {
        if(req.body.username === 'root' && req.body.password === 'root') {
            return res.status(200).json({
                user: {
                    token: '123'
                }
            })
        }else {
            return res.status(400).json({message:'用户名或者密码错误'})
        }
    }
    next()
}