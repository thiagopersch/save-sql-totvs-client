import axios from "axios";

const readRecord = async (
  dataServerName: string,
  primaryKey: string,
  contexto: string,
  username: string,
  password: string,
  tbc: string
) => {
  try {
    const response = await axios.get(
      "http://localhost:3000/totvs/read-record",
      {
        params: {
          dataServerName,
          primaryKey,
          contexto,
          username,
          password,
          tbc,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error reading record:", error);
    throw error;
  }
};

export default readRecord;
