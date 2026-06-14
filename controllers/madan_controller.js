const MadanModel = require("../models/madan_model")
const Joi = require("joi")


const registerschema = Joi.object({
    name:Joi.string().min(3).max(30).required(),
    factoryname:Joi.string().required(),
    email:Joi.string().email().required(),
    phone:Joi.string().max(12).required(),
    message:Joi.string().max(110).required()
})


const validate = (schema, data) => schema.validate(data)

const getAll = async(req,res)=>{
    try {
        const madan = await MadanModel.getAll()
        res.json(madan)
    } catch (error) {
        console.error("Error: ",error)
        return res.status(500).send("Err in server")
    }
}

const addInfo = async (req, res) => {
    console.log("📥 داده دریافتی از Elementor:", JSON.stringify(req.body, null, 2));

    const fields = req.body.fields || {};

    // استخراج مقادیر از ساختار Elementor
    const dataForValidation = {
        name: fields['field_d0330e9']?.value || fields.name?.value || '',           // نام و نام خانوادگی
        factoryname: fields.name?.value || '',                                     // نام شرکت
        email: fields.email?.value || '',
        phone: fields['field_e46f1dd']?.value || '',                               // شماره تماس
        message: fields.message?.value || ''
    };

    console.log("📋 داده استخراج شده:", dataForValidation);

    const { error } = validate(registerschema, dataForValidation);

    if (error) {
        console.log("❌ Validation Error:", error.details[0].message);
        return res.status(200).json({ success: false, message: error.details[0].message });
    }

    const { name, factoryname, email, phone, message } = dataForValidation;

    try {
        const result = await MadanModel.addInfo(name, factoryname, email, phone, message);

        if (!result) {
            return res.status(200).json({ success: false, message: "خطا در ذخیره اطلاعات" });
        }

        return res.status(200).json({ 
            success: true, 
            message: "اطلاعات شما با موفقیت ثبت شد" 
        });

    } catch (error) {
        console.error("Server Error: ", error);
        return res.status(200).json({ success: false, message: "خطای سرور" });
    }
};

module.exports = {
    getAll,addInfo
}