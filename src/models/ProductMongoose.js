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
    thumbnail: { type: String, default: 'https://medias.musimundo.com/medias/00382024-143035-143035-01-143035-01.jpg-size300?context=bWFzdGVyfGltYWdlc3wxMzI0OXxpbWFnZS9qcGVnfGg2YS9oZDIvMTAzODA1MTk2MzcwMjIvMDAzODIwMjQtMTQzMDM1LTE0MzAzNV8wMS0xNDMwMzVfMDEuanBnX3NpemUzMDB8ZjcwOWRjYWJlZWM5MzBjOWUyNzZlOWQ2ZWRjY2NhNmE3Zjk3ZmMxNDA0ZDcxMmNhMTIxNzlhMTI2MDI0MDliZQ' }
}, {
    versionKey: false,
    strict: 'throw',
    /* methods: {} */
})

productSchema.plugin(mongoosePaginate)

export const dbProducts = model('products', productSchema)
