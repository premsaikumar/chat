const axios = require('axios');

router.post('/status', async (req, res) => {
   const { status } = req.body;
   const userId = req.user.id;  // Assume req.user is populated by authentication middleware
   try {
     await User.findByIdAndUpdate(userId, { status });
     res.send({ message: 'Status updated' });
   } catch (error) {
     res.status(500).send(error);
   }
 });
 


async function getLLMResponse(prompt) {
  try {
    const response = await axios.post('YOUR_LLM_API_ENDPOINT', { prompt });
    return response.data;
  } catch (error) {
    console.error(error);
    return 'This is a mock response from the LLM based on user input';
  }
}


socket.on('sendMessage', async (messageData) => {
   const receiver = await User.findById(messageData.receiver);
   if (receiver.status === 'BUSY') {
     const response = await getLLMResponse(messageData.content);
     messageData.content = response;
   }
   const message = new Message(messageData);
   await message.save();
   io.emit('message', message);
 });
 