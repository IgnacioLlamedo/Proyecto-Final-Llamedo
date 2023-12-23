import { Schema, model } from "mongoose"
import mongoosePaginate from "mongoose-paginate-v2"

const productSchema = new Schema({
    _id: { type: String, required : true },
    title: { type: String, required: true },
    description: { type: String, required: true },
    code: { type: String, required: true },
    price: { type: Number, required: true },
    status: { type: Boolean, default: true },
    stock: { type: Number, required: true },
    category: { type: String, required: true },
    thumbnail: { type: String, default: 'https://medias.musimundo.com/medias/00597014-146976-146976-01-146976-01.jpg-size300?context=bWFzdGVyfGltYWdlc3w0MjI0N3xpbWFnZS9qcGVnfGhhOC9oMzcvMTA0NDE1NTk5OTg0OTQvMDA1OTcwMTQtMTQ2OTc2LTE0Njk3Nl8wMS0xNDY5NzZfMDEuanBnX3NpemUzMDB8NTkzMjE0NDA3OGVjNDg5MDk5ZjUyNmE2YzBlMmQ0MjI0Y2I3N2YzM2Y3ODNhMTYyZWE4OGE4ZGM2Yzk3NmQwYg' }
}, {
    versionKey: false,
    strict: 'throw',
    /* methods: {} */
})

productSchema.plugin(mongoosePaginate)

export const dbProducts = model('products', productSchema)
