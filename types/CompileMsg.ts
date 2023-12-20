export type CompileMsg = {
    Status: number,
    msg: string | null,
    result: {
      statusCode: string,
      errorMsg: string,
      evalPercentage: string,
      statusArray: {
        msg: string,
        color: "green" | "red"
      }[],
      complexityData: number[],
      exeTime: number
    }
  }