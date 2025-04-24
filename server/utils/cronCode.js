import cron from "node-cron"
import confirmationCode from "../schema/confirmationCode.js"

cron.schedule("*/2 * * * *", async () => {
      const allcodes = await confirmationCode.find()

      try {
            if (allcodes.length) {
                  for (let code of allcodes) {
                        if (new Date(code.expires_at).getTime() - new Date().getTime() < 0) {
                              await confirmationCode.findOneAndDelete({ email: code.email })
                        }
                  }
            }
      } catch (error) {
            console.log("crone error:" + "   " + error);

      }
})