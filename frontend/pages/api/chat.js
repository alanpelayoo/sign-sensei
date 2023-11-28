import { state1, state2 } from '../../utils/stateFunctions';

export default async function handler(req, res) {
  // Check if the request method is POST
  if (req.method === 'POST') {
    // Destructure the state and input values from the request body
    const { state, input,letter } = req.body;
    try {
      let result;

      // Call state1 or function2 based on the state value
      if (state === 0) {
        result = await state1(input);
      }else if(state ===2){
        result = await state2(input, letter);
      }
      // Respond with a status of 200 and a JSON object that includes the result
      res.status(200).json({ message: result});
    } catch (error) {
      // If an error occurs, return a 500 Internal Server Error
      res.status(500).json({ error: error.message });
    }
  } else {
    // If the request method is not POST, return a 405 Method Not Allowed error
    res.setHeader('Allow', 'POST');
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}


