function myMiddleware(req, res, next) {
    let date = new Date().toLocaleDateString()
    console.log(`[${date}] ${req.method} ${req.path}`)
    next()   // ← โอเค ไปต่อได้
}

module.exports = myMiddleware