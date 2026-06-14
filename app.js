require("dotenv").config()
const express = require("express")
const madanRouter = require("./routes/madan_route")

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// لاگ همه درخواست‌ها (خیلی مهم برای دیباگ)
app.use((req, res, next) => {
    console.log(`🌐 Incoming ${req.method} ${req.url}`);
    next();
});

app.use('/api/content', madanRouter)

// Route تست برای چک کردن اینکه سرور زنده است
app.get('/', (req, res) => {
    res.json({ message: "Server is running! Use /api/content" });
});

const PORT = process.env.APP_PORT || 3000
app.listen(PORT, () => {
    console.log(`🚀 Listen to ${PORT}`)
})