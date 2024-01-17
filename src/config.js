import dotenv from 'dotenv';

dotenv.config()

export default {
    cnxStr:process.env.MONGO_CNX_STR,
    port:process.env.PORT,
    ssnSec:process.env.SESSION_SECRET,
    prodImg:process.env.DEFAULT_IMG_PRODUCT,
    ghAppId:process.env.githubAppId,
    ghClId:process.env.githubClientId,
    ghClSec:process.env.githubClientSecret,
    ghCBUrl:process.env.githubCallbackUrl
}
