'use server'

import axios from "axios"

export async function getScore(text:string) {
  const res = await axios.post("http://13.233.199.152:5000/api/checkToxicText",{text:text});
  return res.data;
}
