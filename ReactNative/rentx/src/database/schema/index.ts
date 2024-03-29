import {appSchema} from '@nozbe/watermelondb'

import { carSchema } from './carSchema'
import {userSchema} from './userSchema'


const schemas = appSchema({
    version:6,
    tables:[
        userSchema,
        carSchema
    ]
})

export {schemas}