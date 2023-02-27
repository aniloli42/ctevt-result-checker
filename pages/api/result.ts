import axios from "axios"
import { NextApiRequest, NextApiResponse } from "next"
import { UserDataType } from "../../types"

const websiteLink = process.env.NEXT_PUBLIC_LINK

export default async function result(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // handle the post request to get the result
  if (req.method === "POST") {
    const data = req.body

    const { examYear, symbolNo, dob, level } = data as UserDataType

    if (
      examYear == undefined ||
      symbolNo == undefined ||
      dob == undefined ||
      level == undefined
    )
      return res.send("All Fields required")

    const getResultURL = `${websiteLink}/download-to-pdf/${examYear}/${level}/${symbolNo}/${dob}`

    const resultResponse = await axios.get(getResultURL, {
      responseType: "arraybuffer",
      headers: {
        "Cache-Control": "no-cache",
        Pragma: "no-cache",
        Expires: "0",
      },
    })

    res.statusCode = 200
    res.end(resultResponse.data)
  }
}
