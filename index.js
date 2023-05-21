const { Client,   GatewayIntentBits } = require('discord.js');
const axios = require('axios');

const client = new Client({ 
  intents: [  GatewayIntentBits.Guilds,   GatewayIntentBits.GuildMessages]
});

// Event triggered when the bot is ready and connected to Discord
client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}`);
  
});

// Event triggered when a message is sent in a channel the bot has access to
client.on('messageCreate', async (message) => {
  // Ignore messages sent by the bot
  if (message.author.bot) return;

  // Process user input and generate a response
  const userInput = message.content;
  console.log(userInput);
  const response = await generateGptResponse(userInput);
  console.log(response);

  // Send the response back to the same channel
  message.channel.send(response);
});

// Function to generate a response from GPT-3
async function generateGptResponse(message) {
  try {
    // Make a POST request to the GPT-3 API
    const response = await axios.post('https://api.openai.com/v1/engines/davinci-codex/completions', {
      prompt:message,
      max_tokens: 50,
      temperature: 0.7 
    }, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer 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'
      }
    });
    console.log(response.data.choices[0].text.trim())
    // Return the generated response from GPT-3
    return response.data.choices[0].text.trim();
  } catch (error) {
    console.error('Error:', error);
    return 'Oops! Something went wrong.';
  }
}

// Log in to Discord with your bot token
client.login('MTEwOTkwNTc4MTcyNzQ0NTA1Mw.G4k5En.yPx7JeR8CVqY7rXYrWTYxK3CB07YYnpSkBBzFE');



//discord bot token  MTEwOTkwNTc4MTcyNzQ0NTA1Mw.G4k5En.yPx7JeR8CVqY7rXYrWTYxK3CB07YYnpSkBBzFE
// chat gpt token  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