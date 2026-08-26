import mongoose, {Schema} from "mongoose";

const ServicioSchema = new Schema(
    {
        nombreServicio:{
            type: String,
            required: true,
            unique: true,
            minLength: 5,
            maxLength: 100,
            trim: true
        },
        precio:{
            type:Number,
            required: true,
            min: 50
        },
        imagen:{
           type: String,
           required: true,
           validate: {
            validator: (valor)=>{
                return /^https:\/\/.+\.(jpg|jpeg|png|webp|avif|svg)$/.test(valor)
            }
           } 
        },
        categoria:{
            type: Schema.Types.ObjectId,
            ref: 'categoria',
            required:true 
        },
        descripcion:{
            type: String,
            minLength:10,
            maxLength:500,
            required: true
        }
    },
    {
        timestamps: true
    }
);

const Servicio = mongoose.model('servicio', ServicioSchema)

export default Servicio