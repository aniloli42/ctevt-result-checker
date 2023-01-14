import axios from "axios"
import { NextApiRequest, NextApiResponse } from "next"
import { UserDataType } from "../../types"

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

    const getResultURL = `${process.env.NEXT_PUBLIC_LINK}/${examYear}/${level}/${symbolNo}/${dob}`

    const resultResponse = await axios.get(getResultURL, {
      responseType: "arraybuffer",
    })

    res.statusCode = 200
    res.end(resultResponse.data)
  }
}
