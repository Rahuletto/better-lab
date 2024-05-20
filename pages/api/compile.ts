import type { NextApiRequest, NextApiResponse } from 'next';
import { fromString, getCompilers } from 'wandbox-api-updated/lib';
import { LanguagesArray } from '@/types/Languages';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const body = req.body;
  const data = JSON.parse(body);

  const language = LanguagesArray.find((a) => a.language == data.language);
  console.log(language)
  if (language) {
    getCompilers(language.key).then((c) => {
      fromString({
        code: data.code,
        compiler: c[0].name,
        save: false,
        stdin: data.input,
      })
        .then((out) => {
          if (out.program_error || out.compiler_error)
            res
              .status(200)
              .json({
                code: data.code,
                compiler: c[0].name,
                input: data.input,
                output: out.program_error
                  ? out.program_error
                  : out.compiler_error,
                error: true,
              });
          if (out.program_output)
            res
              .status(200)
              .json({
                code: data.code,
                compiler: c[0].name,
                input: data.input,
                output: out.program_output,
              });
        })
        .catch((err) => {
          res.status(500).json({ error: err });
        });
    });
  }
}
