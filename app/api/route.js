// import * as dotenv from 'dotenv';
// import pdfParse from 'pdf-parse';
// import { OpenAI } from 'openai';
// import { IncomingForm } from 'formidable';
// import fs from 'fs';
// import path from 'path';

// dotenv.config();

// const openai = new OpenAI({ apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY });

// export async function POST(req) {
//   try {
//     const form = new IncomingForm();
//     const uploadDir = path.join(process.cwd(), '/uploads');

//     if (!fs.existsSync(uploadDir)) {
//       fs.mkdirSync(uploadDir);
//     }

//     form.uploadDir = uploadDir;
//     form.keepExtensions = true;

//     const data = await new Promise((resolve, reject) => {
//       form.parse(req, (err, fields, files) => {
//         if (err) {
//           reject(err);
//         } else {
//           resolve({ fields, files });
//         }
//       });
//     });

//     const { files } = data;
//     const file = Array.isArray(files.pdf) ? files.pdf[0] : files.pdf;

//     if (!file || file.mimetype !== 'application/pdf') {
//       return new Response(JSON.stringify({ error: 'Please upload a valid PDF file.' }), {
//         status: 400,
//       });
//     }

//     const pdfData = await pdfParse(fs.readFileSync(file.filepath));
//     const extractedText = pdfData.text;

//     const response = await openai.chat.completions.create({
//       model: 'gpt-4',
//       messages: [
//         {
//           role: 'user',
//           content: `Return a list of job positions that someone could apply for based on the experiences and skill in this resume. 
//           Return the list with the positions separated by a comma. After each comma, start a new line. ${extractedText}`,
//         },
//       ],
//     });

//     const response2 = await openai.chat.completions.create({
//       model: 'gpt-4',
//       messages: [
//         {
//           role: 'user',
//           content: `Return a keyword or phrase representing an industry someone could go into based on the experiences and skills in this resume. 
//           For example, Cloud Computing or Biomedical Devices ${extractedText}`,
//         },
//       ],
//     });

//     return new Response(JSON.stringify({ text: [response.choices[0].message.content, response2.choices[0].message.content] }), {
//       status: 200,
//     });
//   } catch (error) {
//     return new Response(JSON.stringify({ error: 'Failed to process the PDF' }), {
//       status: 500,
//     });
//   }
// }


import {NextRequest, NextResponse} from "next/server";

export async function GET (request){
    const greeting = "Hello World!!"
    const json = {
        greeting
    };

    return Response.json(json);
}
export async function POST (request){
  const greeting = "Hello World!!"
  const json = {
      greeting
  };

  return Response.json(json);
}
