const express = require("express")
const madanController = require("../controllers/madan_controller")
const router = express.Router()

// ←←← این بخش خیلی مهم برای دیباگ ←←←
router.use((req, res, next) => {
    console.log(`📨 ${req.method} ${req.originalUrl}`);
    console.log("Headers:", req.headers);
    console.log("Body:", JSON.stringify(req.body, null, 2));
    next();
});

router.get('/', madanController.getAll)
router.post('/', madanController.addInfo)

module.exports = router