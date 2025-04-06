'use server'

import axios from "axios"

export async function getScore(text:string) {
  const res = await axios.post("http://127.0.0.1:5000/api/checkToxicText",{text:text});
  return res.data;
}
