import dotenv from 'dotenv';

dotenv.config()

export default {
    cnxStr:process.env.MONGO_CNX_STR,
    port:process.env.PORT,
    ssnSec:process.env.SESSION_SECRET,
    prodImg:process.env.DEFAULT_IMG_PRODUCT,
    nodeEnv:process.env.NODE_ENV,
    ghAppId:process.env.githubAppId,
    ghClId:process.env.githubClientId,
    ghClSec:process.env.githubClientSecret,
    ghCBUrl:process.env.githubCallbackUrl,
    stripeConfig:allowInsecurePrototypeAccess.env.STRIPE_KEY
}
