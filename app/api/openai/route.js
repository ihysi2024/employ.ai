import * as dotenv from 'dotenv';
import pdfParse from 'pdf-parse';
import { OpenAI } from 'openai';
import { IncomingForm } from 'formidable';
import fs from 'fs';
import path from 'path';

dotenv.config();

const openai = new OpenAI({ apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY });

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(req, res) {
  if (req.method === 'POST') {
    
    try {
      const form = new IncomingForm();
      const uploadDir = path.join(process.cwd(), '/uploads');

      console.log('Upload directory:', uploadDir);
      // Create the uploads directory if it doesn't exist
      if (!fs.existsSync(uploadDir)) {
        fs.mkdirSync(uploadDir);
      }

      form.uploadDir = uploadDir;
      form.keepExtensions = true;

      // Wrap form.parse in a Promise
      const data = await new Promise((resolve, reject) => {
        form.parse(req, (err, fields, files) => {
          if (err) {
            console.error('*** IN PROMISE *** Error parsing form data:', err);
            reject(err);
          } else {
            resolve({ fields, files });
          }
        });
      });

      console.log('Parsed Data:', data);

      const { files } = data;
      const file = Array.isArray(files.pdf) ? files.pdf[0] : files.pdf;

      // Log the file path to ensure it's correct
      console.log('File path:', file.filepath);
      console.log('Original filename:', file.originalFilename);

      // Check if the file exists and has the correct MIME type
      if (!file || file.mimetype !== 'application/pdf') {
        console.error('Invalid file or MIME type:', file);
        return res.status(400).json({ error: 'Please upload a valid PDF file.' });
      }

      // Read and extract text from the PDF
      const pdfData = await pdfParse(fs.readFileSync(file.filepath));
      const extractedText = pdfData.text;

      // Send text to OpenAI API
      const response = await openai.chat.completions.create({
        model: 'gpt-4',
        messages: [
          {
            role: 'user',
            content: `Return a list of job positions that someone could apply for based on the experiences and skill in this resume. 
            Return the list with the positions separated by a comma. after each comma, start a new line. ${extractedText}`,
          },
        ],
      });
      const response2 = await openai.chat.completions.create({
        model: 'gpt-4',
        messages: [
          {
            role: 'user',
            content: `Return a keyword or phrase representing an industry someone could go into based on the experiences and skills in this reusme.
            For example, Cloud Computing or Biomedical Devices ${extractedText}`,
          },
        ],
      });

      // Send the response back to the frontend
      res.status(200).json({ text: [response.choices[0].message.content, response2.choices[0].message.content]});
      // res.status(200).json({ text: response2.choices[0].message.content });
    } catch (error) {
      console.error('Error processing request:', error);
      res.status(500).json({ error: 'Failed to process the PDF' });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
